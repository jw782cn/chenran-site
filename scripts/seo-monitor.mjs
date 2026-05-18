const DEFAULT_BASE_URL = "https://chenranning.com";
const CHECK_PATHS = [
  "/",
  "/zh",
  "/work/seedance-stranger-things-ai-finale",
  "/work/ai-will",
  "/robots.txt",
  "/sitemap.xml",
];
const HTML_PATHS = CHECK_PATHS.filter((path) => !path.endsWith(".txt") && !path.endsWith(".xml"));
const REQUEST_TIMEOUT_MS = 12_000;
const EXTERNAL_LINK_LIMIT = 80;
const FALLBACK_STATUSES = new Set([403, 405, 429, 999]);
const LIMITED_STATUSES = new Set([401, 403, 429, 999]);
const USER_AGENT = "chenran-site-seo-monitor/1.0";
const CURL_META_MARKER = "__CHENRAN_SEO_MONITOR_CURL_META__";
const FORCE_FALLBACK = process.env.SEO_MONITOR_FORCE_FALLBACK === "1";
const MAX_BODY_BYTES = 8 * 1024 * 1024;
const MAX_REDIRECTS = 8;

async function main() {
  const baseUrl = normalizeBaseUrl(process.argv.slice(2).find((arg) => arg !== "--") ?? DEFAULT_BASE_URL);
  const checkedAt = new Date().toISOString();
  const resourceEntries = await Promise.all(
    CHECK_PATHS.map(async (path) => [path, await fetchText(new URL(path, baseUrl).href)]),
  );
  const resources = Object.fromEntries(resourceEntries);
  const pathStatus = Object.fromEntries(
    resourceEntries.map(([path, result]) => [
      path,
      {
        url: result.url,
        status: result.status,
        ok: result.ok,
        finalUrl: result.finalUrl,
        error: result.error,
      },
    ]),
  );

  const pageDrafts = Object.fromEntries(
    HTML_PATHS.map((path) => [path, parseHtmlPage(path, resources[path], baseUrl)]),
  );
  const externalUrls = unique(
    Object.values(pageDrafts).flatMap((page) => page.externalLinkUrls),
  ).slice(0, EXTERNAL_LINK_LIMIT);
  const externalResults = Object.fromEntries(
    await Promise.all(externalUrls.map(async (url) => [url, await checkExternalLink(url)])),
  );

  const pages = Object.fromEntries(
    Object.entries(pageDrafts).map(([path, page]) => {
      const linkResults = page.externalLinkUrls.map((url) => externalResults[url]).filter(Boolean);
      const { externalLinkUrls, ...pageWithoutRawLinks } = page;

      return [
        path,
        {
          ...pageWithoutRawLinks,
          externalLinks: {
            ...summarizeExternalLinks(linkResults, page.externalLinkUrls.length),
            links: linkResults,
          },
        },
      ];
    }),
  );

  const sitemapResource = resources["/sitemap.xml"];
  const robotsResource = resources["/robots.txt"];
  const report = {
    checkedAt,
    baseUrl,
    checkedPaths: CHECK_PATHS,
    pathStatus,
    pages,
    sitemap: {
      url: sitemapResource.url,
      status: sitemapResource.status,
      ok: sitemapResource.ok,
      finalUrl: sitemapResource.finalUrl,
      urls: sitemapResource.body ? parseSitemapUrls(sitemapResource.body) : [],
      error: sitemapResource.error,
    },
    robots: {
      url: robotsResource.url,
      status: robotsResource.status,
      ok: robotsResource.ok,
      finalUrl: robotsResource.finalUrl,
      ...parseRobots(robotsResource.body ?? ""),
      error: robotsResource.error,
    },
    externalLinksSummary: summarizeExternalLinks(Object.values(externalResults), externalUrls.length),
  };

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

function normalizeBaseUrl(input) {
  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(input) ? input : `https://${input}`;
  const url = new URL(withProtocol);
  return url.origin;
}

async function fetchText(url) {
  try {
    if (FORCE_FALLBACK) {
      const fallback = await fetchTextWithFallback(url, null);
      if (fallback) {
        return fallback;
      }
    }

    const response = await fetchWithTimeout(url, { method: "GET" });
    const body = await response.text();

    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      finalUrl: response.url,
      contentType: response.headers.get("content-type"),
      body,
    };
  } catch (error) {
    const fallback = await fetchTextWithFallback(url, error);
    if (fallback) return fallback;

    return {
      url,
      status: null,
      ok: false,
      statusText: null,
      finalUrl: null,
      contentType: null,
      body: "",
      error: toErrorMessage(error),
    };
  }
}

async function fetchWithTimeout(url, init) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      redirect: "follow",
      ...init,
      headers: {
        "user-agent": USER_AGENT,
        accept: "*/*",
        ...init.headers,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchTextWithFallback(url, fetchError) {
  const curl = await tryCurlText(url);
  if (curl) {
    return {
      ...curl,
      error: fetchError ? `fetch failed; curl fallback used: ${toErrorMessage(fetchError)}` : "curl fallback used",
    };
  }

  const nodeFallback = await tryNodeRequestText(url);
  if (nodeFallback) {
    return {
      ...nodeFallback,
      error: fetchError ? `fetch failed; node http fallback used: ${toErrorMessage(fetchError)}` : "node http fallback used",
    };
  }

  return null;
}

async function tryCurlText(url) {
  const result = await tryCurlRequest(url, { method: "GET", includeBody: true });
  if (!result) {
    return null;
  }

  return {
    url,
    status: result.status,
    ok: result.status !== null && result.status >= 200 && result.status < 300,
    statusText: null,
    finalUrl: result.finalUrl,
    contentType: result.contentType,
    body: result.body ?? "",
  };
}

async function tryCurlRequest(url, options) {
  const { method, includeBody } = options;
  const timeoutSeconds = Math.max(1, Math.ceil(REQUEST_TIMEOUT_MS / 1000));
  const args = [
    "-sS",
    "-L",
    "-4",
    "--max-time",
    String(timeoutSeconds),
    "--retry",
    "2",
    "--retry-delay",
    "0",
    "--retry-max-time",
    String(timeoutSeconds),
    "-A",
    USER_AGENT,
    "-H",
    "Accept: */*",
  ];

  if (method === "HEAD") {
    args.push("-I");
  } else if (method !== "GET") {
    args.push("-X", method);
  }

  if (!includeBody || method === "HEAD") {
    args.push("-o", "/dev/null");
  }

  args.push(
    "-w",
    `\n${CURL_META_MARKER}%{http_code}|%{url_effective}|%{content_type}\n`,
    url,
  );

  try {
    const output = await execFileText("curl", args, REQUEST_TIMEOUT_MS + 2_000);
    const markerIndex = output.lastIndexOf(`${CURL_META_MARKER}`);
    if (markerIndex === -1) {
      return null;
    }

    const metaLine = output.slice(markerIndex).trim();
    const [_, codeRaw, effectiveRaw, contentTypeRaw] = metaLine.match(
      new RegExp(`^${CURL_META_MARKER}(\\d+)\\|(.*)\\|(.*)$`),
    ) ?? [null, null, null, null];

    if (!codeRaw) {
      return null;
    }

    const status = Number(codeRaw);
    const body = includeBody ? output.slice(0, markerIndex).replace(/\n$/, "") : null;

    return {
      status: Number.isFinite(status) ? status : null,
      finalUrl: effectiveRaw ? effectiveRaw.trim() : null,
      contentType: contentTypeRaw ? contentTypeRaw.trim() : null,
      body,
    };
  } catch {
    return null;
  }
}

async function execFileText(command, args, timeoutMs) {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const execFileAsync = promisify(execFile);
  const { stdout } = await execFileAsync(command, args, {
    timeout: timeoutMs,
    maxBuffer: 8 * 1024 * 1024,
  });
  return String(stdout ?? "");
}

async function tryNodeRequestText(url) {
  const result = await tryNodeRequest(url, { method: "GET", includeBody: true });
  if (!result) {
    return null;
  }

  return {
    url,
    status: result.status,
    ok: result.status !== null && result.status >= 200 && result.status < 300,
    statusText: null,
    finalUrl: result.finalUrl,
    contentType: result.contentType,
    body: result.body ?? "",
  };
}

async function tryNodeRequest(url, options) {
  const { method, includeBody } = options;
  const { request: httpRequest } = await import("node:http");
  const { request: httpsRequest } = await import("node:https");

  let currentUrl = url;
  let body = null;
  let contentType = null;
  let status = null;
  let redirects = 0;

  while (redirects <= MAX_REDIRECTS) {
    const parsed = new URL(currentUrl);
    const isHttps = parsed.protocol === "https:";
    const requester = isHttps ? httpsRequest : httpRequest;

    const response = await new Promise((resolve, reject) => {
      const req = requester(
        {
          protocol: parsed.protocol,
          hostname: parsed.hostname,
          port: parsed.port || undefined,
          path: `${parsed.pathname}${parsed.search}`,
          method,
          headers: {
            "user-agent": USER_AGENT,
            accept: "*/*",
          },
        },
        (res) => resolve(res),
      );

      req.on("error", reject);
      req.setTimeout(REQUEST_TIMEOUT_MS, () => {
        req.destroy(new Error("Request timeout"));
      });
      req.end();
    });

    status = typeof response.statusCode === "number" ? response.statusCode : null;
    contentType = response.headers?.["content-type"] ? String(response.headers["content-type"]) : null;
    const location = response.headers?.location ? String(response.headers.location) : null;

    if (status !== null && status >= 300 && status < 400 && location) {
      redirects += 1;
      currentUrl = new URL(location, currentUrl).href;
      response.resume();
      continue;
    }

    if (!includeBody || method === "HEAD") {
      response.resume();
      body = null;
      break;
    }

    const chunks = [];
    let total = 0;

    await new Promise((resolve, reject) => {
      response.on("data", (chunk) => {
        const bytes = Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(String(chunk));
        total += bytes;
        if (total > MAX_BODY_BYTES) {
          response.destroy(new Error("Response body too large"));
          return;
        }
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      });
      response.on("end", resolve);
      response.on("error", reject);
    });

    body = Buffer.concat(chunks).toString("utf8");
    break;
  }

  if (redirects > MAX_REDIRECTS) {
    return null;
  }

  return {
    status,
    finalUrl: currentUrl,
    contentType,
    body,
  };
}

function parseHtmlPage(path, resource, baseUrl) {
  const pageUrl = new URL(path, baseUrl).href;
  const html = resource.body ?? "";
  const jsonLd = parseJsonLdTypes(html);

  return {
    path,
    url: resource.url,
    status: resource.status,
    ok: resource.ok,
    finalUrl: resource.finalUrl,
    contentType: resource.contentType,
    title: findTitle(html),
    description: findMetaContent(html, "description"),
    canonical: findCanonical(html, pageUrl),
    ogImage: findMetaContent(html, "og:image", pageUrl),
    twitterCard: findMetaContent(html, "twitter:card"),
    jsonLdTypes: jsonLd.types,
    jsonLdParseErrors: jsonLd.errors,
    externalLinkUrls: extractExternalLinks(html, pageUrl),
    error: resource.error,
  };
}

function findTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1].trim()) : null;
}

function findMetaContent(html, key, pageUrl) {
  const normalizedKey = key.toLowerCase();

  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(tag[0]);
    const name = attrs.name?.toLowerCase();
    const property = attrs.property?.toLowerCase();
    const content = attrs.content ? decodeHtml(attrs.content) : null;

    if ((name === normalizedKey || property === normalizedKey) && content) {
      return pageUrl && isHttpLike(content) ? new URL(content, pageUrl).href : content;
    }
  }

  return null;
}

function findCanonical(html, pageUrl) {
  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(tag[0]);
    const rel = attrs.rel?.toLowerCase().split(/\s+/) ?? [];
    const href = attrs.href ? decodeHtml(attrs.href) : null;

    if (rel.includes("canonical") && href) {
      return new URL(href, pageUrl).href;
    }
  }

  return null;
}

function parseAttributes(tag) {
  const attrs = {};

  for (const match of tag.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attrs;
}

function parseJsonLdTypes(html) {
  const types = new Set();
  const errors = [];

  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    const attrs = parseAttributes(match[0]);

    if (attrs.type?.toLowerCase() !== "application/ld+json") {
      continue;
    }

    const rawJson = match[1].trim();
    const parsed = parseJson(rawJson) ?? parseJson(decodeHtml(rawJson));

    if (!parsed) {
      errors.push("Unable to parse application/ld+json script");
      continue;
    }

    collectJsonLdTypes(parsed, types);
  }

  return {
    types: [...types].sort(),
    errors,
  };
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function collectJsonLdTypes(value, types) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectJsonLdTypes(item, types);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  const type = value["@type"];
  if (Array.isArray(type)) {
    for (const item of type) {
      if (typeof item === "string") {
        types.add(item);
      }
    }
  } else if (typeof type === "string") {
    types.add(type);
  }

  for (const item of Object.values(value)) {
    collectJsonLdTypes(item, types);
  }
}

function extractExternalLinks(html, pageUrl) {
  const origin = new URL(pageUrl).origin;
  const urls = [];

  for (const tag of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = parseAttributes(tag[0]).href;
    const normalized = normalizeHref(href, pageUrl);

    if (normalized && new URL(normalized).origin !== origin) {
      urls.push(normalized);
    }
  }

  return unique(urls);
}

function normalizeHref(href, pageUrl) {
  if (!href) {
    return null;
  }

  try {
    const url = new URL(decodeHtml(href), pageUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

async function checkExternalLink(url) {
  const head = await tryExternalFetch(url, "HEAD");

  if (head.status !== null && !FALLBACK_STATUSES.has(head.status)) {
    return classifyExternalResult(head);
  }

  const get = await tryExternalFetch(url, "GET");
  return classifyExternalResult(get.status === null && head.status !== null ? head : get);
}

async function tryExternalFetch(url, method) {
  try {
    if (FORCE_FALLBACK) {
      const forced = await tryExternalFetchWithFallback(url, method, null);
      if (forced) return forced;
    }

    const response = await fetchWithTimeout(url, { method });
    await response.body?.cancel().catch(() => undefined);

    return {
      url,
      method,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      finalUrl: response.url,
    };
  } catch (error) {
    const fallback = await tryExternalFetchWithFallback(url, method, error);
    if (fallback) return fallback;

    return {
      url,
      method,
      status: null,
      ok: false,
      statusText: null,
      finalUrl: null,
      error: toErrorMessage(error),
    };
  }
}

async function tryExternalFetchWithFallback(url, method, fetchError) {
  const curl = await tryCurlRequest(url, { method, includeBody: false });
  if (curl) {
    const statusOk = curl.status !== null && curl.status >= 200 && curl.status < 400;
    return {
      url,
      method,
      status: curl.status,
      ok: statusOk,
      statusText: null,
      finalUrl: curl.finalUrl,
      error: fetchError ? `fetch failed; curl fallback used: ${toErrorMessage(fetchError)}` : "curl fallback used",
    };
  }

  const node = await tryNodeRequest(url, { method, includeBody: false });
  if (node) {
    const statusOk = node.status !== null && node.status >= 200 && node.status < 400;
    return {
      url,
      method,
      status: node.status,
      ok: statusOk,
      statusText: null,
      finalUrl: node.finalUrl,
      error: fetchError ? `fetch failed; node http fallback used: ${toErrorMessage(fetchError)}` : "node http fallback used",
    };
  }

  return null;
}

function classifyExternalResult(result) {
  if (result.status === null) {
    return {
      ...result,
      category: "error",
    };
  }

  if (result.status >= 200 && result.status < 400) {
    return {
      ...result,
      category: isLimitedFinalUrl(result.finalUrl) ? "limited" : "ok",
    };
  }

  if (LIMITED_STATUSES.has(result.status)) {
    return {
      ...result,
      category: "limited",
    };
  }

  return {
    ...result,
    category: "failed",
  };
}

function isLimitedFinalUrl(finalUrl) {
  if (!finalUrl) {
    return false;
  }

  const normalized = finalUrl.toLowerCase();
  return normalized.includes("captcha") || normalized.includes("checkpoint");
}

function summarizeExternalLinks(results, totalSeen) {
  const summary = {
    total: totalSeen,
    checked: results.length,
    ok: 0,
    limited: 0,
    failed: 0,
    error: 0,
    skipped: Math.max(totalSeen - results.length, 0),
    statusCodes: {},
    problemLinks: [],
  };

  for (const result of results) {
    summary[result.category] += 1;
    const key = result.status === null ? "error" : String(result.status);
    summary.statusCodes[key] = (summary.statusCodes[key] ?? 0) + 1;

    if (result.category !== "ok") {
      summary.problemLinks.push({
        url: result.url,
        category: result.category,
        status: result.status,
        finalUrl: result.finalUrl,
        error: result.error,
      });
    }
  }

  return summary;
}

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
}

function parseRobots(text) {
  const parsed = {
    raw: text,
    userAgents: [],
    allow: [],
    disallow: [],
    sitemaps: [],
    host: null,
  };

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.replace(/#.*/, "").trim();

    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const field = trimmed.slice(0, separatorIndex).trim().toLowerCase();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (field === "user-agent") {
      parsed.userAgents.push(value);
    } else if (field === "allow") {
      parsed.allow.push(value);
    } else if (field === "disallow") {
      parsed.disallow.push(value);
    } else if (field === "sitemap") {
      parsed.sitemaps.push(value);
    } else if (field === "host") {
      parsed.host = value;
    }
  }

  return parsed;
}

function isHttpLike(value) {
  try {
    const url = new URL(value, DEFAULT_BASE_URL);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function unique(values) {
  return [...new Set(values)];
}

function toErrorMessage(error) {
  if (!(error instanceof Error)) {
    return String(error);
  }

  const parts = [];
  parts.push(error.name === "Error" ? error.message : `${error.name}: ${error.message}`);
  const anyError = error;

  if (typeof anyError.code === "string") {
    parts.push(`code=${anyError.code}`);
  }
  if (typeof anyError.errno === "number") {
    parts.push(`errno=${anyError.errno}`);
  }
  if (anyError.cause instanceof Error) {
    parts.push(`cause=${anyError.cause.name}: ${anyError.cause.message}`);
  }

  return parts.filter(Boolean).join(" | ");
}

main().catch((error) => {
  process.stderr.write(`${toErrorMessage(error)}\n`);
  process.exitCode = 1;
});
