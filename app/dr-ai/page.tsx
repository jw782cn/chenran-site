"use client";

import { useMemo, useState } from "react";
import styles from "./dr-ai.module.css";

type ServiceId = "a" | "b" | "c" | "d" | "e";
type PlanId = "starter" | "growth" | "system" | "custom";

type Service = {
  id: ServiceId;
  code: string;
  title: string;
  channel: "线下" | "线上";
  unit: string;
  price: number;
  max: number;
  summary: string;
  detail: string;
  bestFor: string;
};

type Plan = {
  id: PlanId;
  title: string;
  subtitle: string;
  price: number;
  listPrice: number;
  bestFor: string;
  onsite: string[];
  online: string[];
  included: Partial<Record<ServiceId, number>>;
};

const yuan = new Intl.NumberFormat("zh-CN");

const services: Service[] = [
  {
    id: "a",
    code: "A",
    title: "首周现场 AI 启动营",
    channel: "线下",
    unit: "5 天",
    price: 42000,
    max: 1,
    summary: "5 月 24 日当周，连续 5 天，每天上午 2.5 小时",
    detail:
      "覆盖综述、图片、视频、进阶应用与多团队案例化实操，帮助视觉、社媒、产品、电商团队建立共同的 AI 工作语言",
    bestFor: "全员起步、统一认知、建立第一轮可上手的方法",
  },
  {
    id: "b",
    code: "B",
    title: "追加线下专题辅导日",
    channel: "线下",
    unit: "天",
    price: 12000,
    max: 8,
    summary: "按整天计价，建议单次集中 3 天或以上",
    detail:
      "上午集中授课或专题辅导，下午用于团队案例拆解、结果点评、下一轮任务布置与现场沟通。不建议拆半天，半天仍按单日资源占用核算",
    bestFor: "需要再到现场推动真实业务应用，但不需要重新开完整启动营",
  },
  {
    id: "c",
    code: "C",
    title: "追加线下 AI 启动营",
    channel: "线下",
    unit: "期",
    price: 38000,
    max: 3,
    summary: "3 天紧凑版，适合新团队或第二阶段重启",
    detail:
      "面向新的团队范围重新组织课程、案例与现场节奏。如果需要 5 天完整版本，可按首周启动营标准重新组合",
    bestFor: "后续再给产品中心、电商或更多团队单独开一轮",
  },
  {
    id: "d",
    code: "D",
    title: "线上课后答疑",
    channel: "线上",
    unit: "次",
    price: 2000,
    max: 12,
    summary: "主要在微信群进行，固定时间集中处理",
    detail:
      "建议每周 2 次，每次约 1 小时。用于解决课程后的工具使用、提示词、生成失败、作业推进等轻量问题，避免变成全天候即时咨询",
    bestFor: "帮助学员在课后继续动手，降低卡住后的放弃率",
  },
  {
    id: "e",
    code: "E",
    title: "线上应用辅导课",
    channel: "线上",
    unit: "次",
    price: 5000,
    max: 12,
    summary: "每次 1.5 小时，可按团队或主题开课",
    detail:
      "DR 带真实业务 brief、素材和生成结果进入课堂，晨然负责拆解需求、判断 AI 介入点、诊断结果问题，并给出下一轮改法",
    bestFor: "让真实业务场景跑起来，而不只是停留在听课和零散答疑",
  },
];

const serviceMap = Object.fromEntries(services.map((service) => [service.id, service])) as Record<ServiceId, Service>;

const plans: Plan[] = [
  {
    id: "starter",
    title: "方案一：现场启动包",
    subtitle: "先把全员 AI 应用能力拉到同一条线",
    price: 42000,
    listPrice: 50000,
    bestFor: "适合先完成 5 天密集培训，再观察各团队吸收情况",
    onsite: ["A 首周现场 AI 启动营 × 1"],
    online: ["D 线上课后答疑 × 4，作为本次合作赠送"],
    included: { a: 1, d: 4 },
  },
  {
    id: "growth",
    title: "方案二：1 个月应用辅导包",
    subtitle: "把 1 到 2 类真实业务场景跑一轮",
    price: 58000,
    listPrice: 70000,
    bestFor: "适合希望培训后继续有固定节奏，把方法迁移到真实工作里",
    onsite: ["A 首周现场 AI 启动营 × 1"],
    online: ["D 线上课后答疑 × 4", "E 线上应用辅导课 × 4"],
    included: { a: 1, d: 4, e: 4 },
  },
  {
    id: "system",
    title: "方案三：2 个月转型推进包",
    subtitle: "更适合总包合作，把线下和线上节奏都放进去",
    price: 88000,
    listPrice: 116000,
    bestFor: "适合 DR 希望管理层看到持续推进，而不是一周培训后自然结束",
    onsite: ["A 首周现场 AI 启动营 × 1", "B 追加线下专题辅导日 × 3"],
    online: ["D 线上课后答疑 × 4", "E 线上应用辅导课 × 6"],
    included: { a: 1, b: 3, d: 4, e: 6 },
  },
  {
    id: "custom",
    title: "自由组合",
    subtitle: "按 DR 实际预算和团队范围自行加购",
    price: 0,
    listPrice: 0,
    bestFor: "适合先确认预算，再从标准单项服务里组合",
    onsite: ["可从 A / B / C 中选择线下服务"],
    online: ["可从 D / E 中选择线上服务"],
    included: {},
  },
];

const audiences = [
  ["视觉部", "平面、视频、空间陈列", "图片生成、视频辅助、陈列概念、视觉风格探索"],
  ["社媒团队", "社媒故事片、传播内容", "选题拆解、故事脚本、视频分镜、内容变体"],
  ["产品团队", "创意 demo、产品概念", "产品概念表达、demo 生成、卖点验证"],
  ["电商团队", "电商头图、详情页、视频素材", "主图创意、套图生成、短视频物料、电商转化表达"],
];

const coursePlan = [
  ["Day 1", "AI 企业应用综述", "统一认知，理解 AI 能做什么、不能做什么、如何进入业务流程"],
  ["Day 2", "图片生成与视觉表达", "围绕平面、电商头图、空间陈列和社媒素材做案例化实操"],
  ["Day 3", "视频生成与故事表达", "从 brief、脚本、分镜到生成结果判断，服务社媒与电商视频需求"],
  ["Day 4", "进阶提示词与多工具协作", "把单点工具使用升级为可复用的创作方法和判断标准"],
  ["Day 5", "团队场景演练与复盘", "用 DR 自己的真实任务做拆解、生成、点评和下一步建议"],
];

const principles = [
  "目标不是替 DR 定制一套固定工作流，而是让成员具备把 AI 应用到自己岗位里的能力",
  "课程安排为拟定版本，最终可根据 DR 团队优先级和素材准备情况调整",
  "课堂演示和培训中必要的 AI 工具订阅、生成算力与素材测试成本由晨然承担",
  "DR 自行大规模生产、内部账号订阅、商用素材授权及上线投放成本由 DR 承担",
  "线上答疑需要固定时间集中处理，不提供全天候即时响应",
  "如需定制工作流、内部工具模板、部门 SOP 或长期陪跑交付，需单独重新评估报价",
];

function formatPrice(value: number) {
  return `¥${yuan.format(value)}`;
}

function getLineDayPrice(quantity: number) {
  if (quantity <= 0) return 0;
  if (quantity === 1) return 12000;
  if (quantity === 2) return 22000;
  return 30000 + Math.max(0, quantity - 3) * 10000;
}

function getServicePrice(service: Service, quantity: number) {
  if (service.id === "b") {
    return getLineDayPrice(quantity);
  }
  return service.price * quantity;
}

function getPlanDiscount(plan: Plan) {
  if (!plan.listPrice) return "自由组合";
  return `${Math.round((plan.price / plan.listPrice) * 100) / 10} 折`;
}

function App() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("growth");
  const [addons, setAddons] = useState<Partial<Record<ServiceId, number>>>({});
  const [copied, setCopied] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];

  const totals = useMemo(() => {
    const addonRows = services
      .map((service) => {
        const quantity = addons[service.id] ?? 0;
        const listPrice = service.price * quantity;
        const price = getServicePrice(service, quantity);
        return {
          service,
          quantity,
          listPrice,
          price,
        };
      })
      .filter((row) => row.quantity > 0);

    const addonListPrice = addonRows.reduce((sum, row) => sum + row.listPrice, 0);
    const addonPrice = addonRows.reduce((sum, row) => sum + row.price, 0);
    const listPrice = selectedPlan.listPrice + addonListPrice;
    const price = selectedPlan.price + addonPrice;
    const savings = Math.max(0, listPrice - price);
    const discount = listPrice > 0 ? `${Math.round((price / listPrice) * 100) / 10} 折` : "待组合";

    return {
      addonRows,
      listPrice,
      price,
      savings,
      discount,
    };
  }, [addons, selectedPlan]);

  const updateAddon = (serviceId: ServiceId, nextQuantity: number) => {
    const service = serviceMap[serviceId];
    const included = selectedPlan.included[serviceId] ?? 0;
    const maxAdditional = Math.max(0, service.max - included);
    const quantity = Math.max(0, Math.min(maxAdditional, nextQuantity));
    setAddons((current) => ({
      ...current,
      [serviceId]: quantity || undefined,
    }));
  };

  const choosePlan = (planId: PlanId) => {
    setSelectedPlanId(planId);
    setAddons({});
    setCopied(false);
  };

  const checkoutText = [
    `DR AI 企业转型合作方案：${selectedPlan.title}`,
    `组合报价：${formatPrice(totals.price)}`,
    totals.listPrice ? `标准合计：${formatPrice(totals.listPrice)}，折扣后约 ${totals.discount}` : "标准合计：待组合",
    "线下内容：",
    ...selectedPlan.onsite.map((item) => `- ${item}`),
    "线上内容：",
    ...selectedPlan.online.map((item) => `- ${item}`),
    totals.addonRows.length ? "追加服务：" : "追加服务：暂不追加",
    ...totals.addonRows.map((row) => `- ${row.service.code} ${row.service.title} × ${row.quantity}，${formatPrice(row.price)}`),
    "差旅说明：线下服务差旅另计",
  ].join("\n");

  const copyCheckout = async () => {
    try {
      await navigator.clipboard.writeText(checkoutText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="返回晨然主页">
          CHENRAN NING
        </a>
        <nav aria-label="DR AI 方案导航">
          <a href="#audience">受众</a>
          <a href="#course">课程</a>
          <a href="#services">服务</a>
          <a href="#quote">报价计算</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>DR AI ENABLEMENT PACKAGE</p>
          <h1>DR AI 企业转型合作方案</h1>
          <p className={styles.lede}>
            以 5 天现场启动营为核心，叠加固定线上答疑、线上应用辅导课和可追加的线下专题辅导，帮助 DR 多团队真正把 AI 用进日常业务
          </p>
          <div className={styles.heroActions}>
            <a href="#quote" className={styles.primaryButton}>
              进入报价计算
            </a>
            <a href="#services" className={styles.secondaryButton}>
              查看服务清单
            </a>
          </div>
        </div>
        <figure className={styles.heroVisual}>
          <img src="/assets/dr-ai-quote-system.svg" alt="DR AI 企业应用系统图" />
          <figcaption>Training, application, follow-up and expansion</figcaption>
        </figure>
      </section>

      <section className={styles.metrics} aria-label="合作基础信息">
        <div>
          <span>5 天</span>
          <p>5 月 24 日当周现场培训</p>
        </div>
        <div>
          <span>12.5 小时</span>
          <p>每天上午 2.5 小时，理论加实操</p>
        </div>
        <div>
          <span>4 个团队</span>
          <p>视觉、社媒、产品、电商共同覆盖</p>
        </div>
        <div>
          <span>¥42,000 起</span>
          <p>延续上次 5 小时 2 万的合作标准，并做总包折扣</p>
        </div>
      </section>

      <section className={styles.section} id="audience">
        <div className={styles.sectionLabel}>
          <span>01</span>
          <p>服务对象</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>不是单一培训，而是面向多团队的 AI 应用启动</h2>
          <div className={styles.audienceGrid}>
            {audiences.map(([team, scope, value]) => (
              <article className={styles.audienceCard} key={team}>
                <p>{scope}</p>
                <h3>{team}</h3>
                <span>{value}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="course">
        <div className={styles.sectionLabel}>
          <span>02</span>
          <p>拟定课程</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>5 天现场内容先把共同能力建起来，后续再按真实场景推进</h2>
          <div className={styles.timeline}>
            {coursePlan.map(([day, title, detail]) => (
              <article key={day}>
                <span>{day}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="services">
        <div className={styles.sectionLabel}>
          <span>03</span>
          <p>单项服务</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>所有方案都由标准服务组合而成，后续可按预算自由加减</h2>
          <div className={styles.serviceTable}>
            {services.map((service) => (
              <article className={styles.serviceRow} key={service.id}>
                <div className={styles.serviceCode}>{service.code}</div>
                <div>
                  <div className={styles.rowHeading}>
                    <h3>{service.title}</h3>
                    <span>{service.channel}</span>
                  </div>
                  <p>{service.summary}</p>
                  <small>{service.detail}</small>
                </div>
                <div className={styles.priceBlock}>
                  <strong>{formatPrice(service.price)}</strong>
                  <span>/ {service.unit}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quoteSection} id="quote">
        <div className={styles.quoteIntro}>
          <p className={styles.eyebrow}>INTERACTIVE QUOTE</p>
          <h2>选择组合包，或继续加购服务</h2>
          <p>
            组合越完整，折扣越高。方案三之后也可以继续自由组合，尤其是追加线下服务时，建议尽量按 3 天或 5 天集中安排
          </p>
        </div>

        <div className={styles.quoteGrid}>
          <div className={styles.plansPanel}>
            {plans.map((plan) => (
              <button
                className={`${styles.planCard} ${selectedPlan.id === plan.id ? styles.activePlan : ""}`}
                key={plan.id}
                type="button"
                onClick={() => choosePlan(plan.id)}
              >
                <div>
                  <span>{getPlanDiscount(plan)}</span>
                  <h3>{plan.title}</h3>
                  <p>{plan.subtitle}</p>
                </div>
                <strong>{plan.price ? formatPrice(plan.price) : "按组合计算"}</strong>
              </button>
            ))}
          </div>

          <div className={styles.addonPanel}>
            <div className={styles.panelHeader}>
              <h3>加购服务</h3>
              <p>可在当前方案上继续追加，或选择自由组合后从 0 开始搭配</p>
            </div>
            <div className={styles.addonList}>
              {services.map((service) => {
                const quantity = addons[service.id] ?? 0;
                const included = selectedPlan.included[service.id] ?? 0;
                const maxAdditional = Math.max(0, service.max - included);
                const disabled = maxAdditional === 0;
                return (
                  <article className={styles.addonRow} key={service.id}>
                    <div>
                      <span>
                        {service.code} · {service.channel}
                      </span>
                      <h4>{service.title}</h4>
                      <p>{service.bestFor}</p>
                      {included > 0 ? <small>当前方案已包含 × {included}</small> : null}
                    </div>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        onClick={() => updateAddon(service.id, quantity - 1)}
                        aria-label={`减少 ${service.title}`}
                        disabled={quantity === 0}
                      >
                        -
                      </button>
                      <output>{quantity}</output>
                      <button
                        type="button"
                        onClick={() => updateAddon(service.id, quantity + 1)}
                        aria-label={`增加 ${service.title}`}
                        disabled={disabled || quantity >= maxAdditional}
                      >
                        +
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className={styles.cartPanel}>
            <div className={styles.cartSticky}>
              <div className={styles.panelHeader}>
                <h3>结算预览</h3>
                <p>差旅费用另计，最终以双方确认版本为准</p>
              </div>

              <div className={styles.selectedPlan}>
                <span>已选方案</span>
                <h4>{selectedPlan.title}</h4>
                <p>{selectedPlan.bestFor}</p>
              </div>

              <div className={styles.composition}>
                <div>
                  <span>线下</span>
                  {selectedPlan.onsite.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <div>
                  <span>线上</span>
                  {selectedPlan.online.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              {totals.addonRows.length ? (
                <div className={styles.cartLines}>
                  {totals.addonRows.map((row) => (
                    <p key={row.service.id}>
                      <span>
                        {row.service.code} × {row.quantity}
                      </span>
                      <strong>{formatPrice(row.price)}</strong>
                    </p>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyCart}>暂未追加服务</p>
              )}

              <div className={styles.totalBox}>
                <p>
                  <span>标准合计</span>
                  <strong>{totals.listPrice ? formatPrice(totals.listPrice) : "待组合"}</strong>
                </p>
                <p>
                  <span>折扣节省</span>
                  <strong>{totals.savings ? formatPrice(totals.savings) : "-"}</strong>
                </p>
                <p>
                  <span>折后报价</span>
                  <strong>{totals.price ? formatPrice(totals.price) : "待组合"}</strong>
                </p>
                <p>
                  <span>折扣</span>
                  <strong>{totals.discount}</strong>
                </p>
              </div>

              <button type="button" className={styles.copyButton} onClick={copyCheckout}>
                {copied ? "已复制方案摘要" : "复制方案摘要"}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>04</span>
          <p>合作边界</p>
        </div>
        <div className={styles.boundaryGrid}>
          {principles.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
