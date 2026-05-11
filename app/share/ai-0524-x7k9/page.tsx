"use client";

import { useMemo, useState } from "react";
import styles from "./dr-ai.module.css";

type ServiceId = "a" | "b" | "c" | "d" | "e" | "f";
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
      "连续 5 个上午现场培训，每天 2.5 小时；包含课程讲解、现场演示、多团队案例化讲解、Prompt 示例、DR 业务场景拆解",
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
    summary: "按线下工作日计价，建议优先集中在同一次行程中连续安排 2 到 3 天",
    detail:
      "阶段性到现场做专题加深、团队案例复盘、生成结果集中诊断或管理层沟通；单日现场服务合计不超过 5 小时，可拆成上午专题辅导 + 下午案例复盘 / 管理层沟通",
    bestFor: "需要再到现场推动真实业务应用，但不需要重新开完整启动营",
  },
  {
    id: "c",
    code: "C",
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
    id: "d",
    code: "D",
    title: "线上应用辅导课",
    channel: "线上",
    unit: "次",
    price: 5000,
    max: 12,
    summary: "每次约 60 到 90 分钟，可按团队或主题开课",
    detail:
      "主要面向业务人员，可单个团队参加，也可多个团队共同参加；可采用线上授课、案例讲解、轻量场景拆解等形式，并结合少量真实业务样例",
    bestFor: "让真实业务场景跑起来，而不只是停留在听课和零散答疑",
  },
  {
    id: "e",
    code: "E",
    title: "线上顾问例会",
    channel: "线上",
    unit: "次",
    price: 4000,
    max: 12,
    summary: "每次约 60 到 75 分钟，主要面向管理层和项目负责人",
    detail:
      "围绕 AI 创意工具变化、行业案例、竞品应用方式、组织推进判断和下一阶段建议进行讨论，可用于帮助管理层补充行业认知",
    bestFor: "帮助管理层和项目负责人获得 AI 行业认知、工具趋势和推进判断",
  },
  {
    id: "f",
    code: "F",
    title: "追加线下 AI 启动营",
    channel: "线下",
    unit: "期",
    price: 38000,
    max: 3,
    summary: "适合新一批成员或新增团队系统学习",
    detail:
      "默认连续 5 个半天，每次 2.5 小时，在现有课程框架上做内容微调；如需要重新开发全新主题课程，可根据范围另行确认",
    bestFor: "后续再给新增团队或新一批成员开一轮系统训练",
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
    online: ["C 线上课后答疑 × 4，作为本次合作赠送"],
    included: { a: 1, c: 4 },
  },
  {
    id: "growth",
    title: "方案二：1 个月应用辅导包",
    subtitle: "把 1 到 2 类真实业务场景跑一轮",
    price: 58000,
    listPrice: 74000,
    bestFor: "适合希望培训后继续有固定节奏，把方法迁移到真实工作里",
    onsite: ["A 首周现场 AI 启动营 × 1"],
    online: ["C 线上课后答疑 × 4", "D 线上应用辅导课 × 4", "E 线上顾问例会 × 1"],
    included: { a: 1, c: 4, d: 4, e: 1 },
  },
  {
    id: "system",
    title: "方案三：2 个月业务应用推进包",
    subtitle: "更适合希望线下持续推动业务团队应用的总包合作",
    price: 84000,
    listPrice: 116000,
    bestFor: "适合 DR 希望培训后继续通过线下复盘和业务辅导，把 AI 真正带进团队日常工作",
    onsite: ["A 首周现场 AI 启动营 × 1", "B 追加线下专题辅导日 × 3"],
    online: ["C 线上课后答疑 × 4", "D 线上应用辅导课 × 6"],
    included: { a: 1, b: 3, c: 4, d: 6 },
  },
  {
    id: "custom",
    title: "自由组合",
    subtitle: "按实际预算和团队范围自行加购",
    price: 0,
    listPrice: 0,
    bestFor: "适合先确认预算，再从标准单项服务里组合",
    onsite: ["可从 A / B / F 中选择线下服务"],
    online: ["可从 C / D / E 中选择线上服务"],
    included: {},
  },
];

const audiences = [
  ["视觉部", "平面视觉、视频概念、空间陈列、DP 点、门店屏幕", "KV、商品图、场景图、空间概念、社媒图、门店屏幕素材"],
  ["社媒团队", "内容选题、故事片创意、脚本、分镜、社媒图片和视频", "选题拆解、故事脚本、视频分镜、内容变体"],
  ["产品团队", "产品设计灵感、创意 demo、系列延展、新品概念测试", "产品概念表达、demo 生成、卖点验证"],
  ["电商团队", "商品头图、详情页、banner、商品视频、投放素材方向", "主图创意、套图生成、短视频物料、电商转化表达"],
];

const valueItems = [
  ["共同认知", "让不同团队对 AI 能力边界、适用场景和结果判断形成共同语言，减少各部门各自摸索的时间成本"],
  ["岗位方法", "把图片、视频、脚本、产品 demo、电商素材等工作拆成可操作步骤，让成员知道如何把 AI 放进自己的日常任务"],
  ["真实场景", "围绕 DR 自己的业务样例做讲解和演练，让学习结果能回到视觉、社媒、产品、电商的真实需求里继续尝试"],
  ["持续推进", "通过课后答疑、应用辅导课和可追加线下辅导，让培训不止停留在听懂，而是进入使用、复盘和迭代"],
];

const coursePlan = [
  ["第 1 天", "AI 创意能力综述", "建立共同认知，理解 AI 在创意和内容生产中的能力边界"],
  ["第 2 天", "AI 图片应用", "KV、商品图、场景图、空间概念、社媒图的生成方法"],
  ["第 3 天", "AI 视频应用", "故事片、产品视频、门店屏、信息流视频从脚本到画面的生成逻辑"],
  ["第 4 天", "AI 进阶控制", "Prompt、参考图、一致性、品牌调性、质感控制"],
  ["第 5 天", "DR 业务场景实战", "结合 DR 典型业务需求进行拆解，形成可回到岗位尝试的应用路径"],
];

const planDetails = [
  {
    title: "方案 1：首周现场启动包",
    body:
      "适合先完成第一轮 AI 应用能力启动。首周完成 5 个上午现场培训，后续在微信群中提供 4 次线上课后答疑，帮助团队处理基础问题和初步尝试中的共性问题。",
    items: ["首周完成 5 个上午现场培训", "后续 4 次线上课后答疑，主要在微信群中进行"],
  },
  {
    title: "方案 2：1 个月场景应用辅导包",
    body:
      "适合在首周培训后，继续用 3 周时间通过线上应用辅导课和案例讲解，帮助团队从“听懂”走到“开始应用”。",
    items: [
      "首周完成 5 个上午现场培训",
      "后续安排 4 次线上课后答疑",
      "后续安排 4 次线上应用辅导课，可采用线上授课、案例讲解、轻量场景拆解等形式",
      "最后 1 次线上顾问例会用于补充行业认知、工具趋势和下一步推进判断",
      "线上应用辅导课主要面向业务人员，DR 可根据每次主题提前提供少量真实业务样例，例如电商头图、社媒故事片、产品创意 demo、空间陈列概念等",
    ],
  },
  {
    title: "方案 3：2 个月业务应用推进包",
    body:
      "适合项目不止停留在首周培训，而是在 1 到 2 个月内通过更多线下专题辅导和线上应用课，持续推动业务团队把 AI 用到真实工作里。",
    items: [
      "首周完成 5 个上午现场培训",
      "后续安排 4 次线上课后答疑",
      "后续安排 3 次线下专题辅导日，优先面向业务团队做专题加深、案例复盘和结果诊断",
      "后续安排 6 次线上应用辅导课，可按视觉、社媒、产品、电商等业务主题展开",
      "线下专题辅导日用于专题加深、团队案例复盘、生成结果集中诊断或管理层沟通",
      "线上应用辅导课主要面向业务人员，可单个团队参加，也可多个团队共同参加",
    ],
  },
];

const addOnMechanisms = [
  ["追加 1 个线下工作日", "12,000 元 + 差旅", "按所选方案折扣计算", "适合单次专题加深或集中复盘，现场服务合计不超过 5 小时"],
  ["连续追加 2 个线下工作日", "24,000 元 + 差旅", "按所选方案折扣计算", "适合覆盖 2 个专题或多个团队集中复盘"],
  ["连续追加 3 个线下工作日", "36,000 元 + 差旅", "按所选方案折扣计算", "适合做阶段性集中辅导、跨团队案例诊断和管理层复盘"],
  ["追加 1 期线下 AI 启动营", "38,000 元 + 差旅", "可结合其他服务另行组合", "适合新一批成员或新增团队系统学习，默认连续 5 个半天"],
];

const excludedItems = [
  "批量代做商用图片、视频、电商物料",
  "为每个团队搭建完整定制化生产工作流",
  "对具体项目进行无限陪产和无限改稿",
  "非固定会议时间的随时响应",
  "法务、版权、广告合规背书",
  "差旅、住宿等线下执行成本",
];

const boundarySections = [
  {
    title: "合作目标",
    body:
      "本次合作不是单纯购买课时，也不是替团队定制一套固定工作流，而是帮助视觉、社媒、产品、电商等岗位成员建立可迁移的 AI 应用能力。课程会用真实业务场景讲解，让成员知道什么时候该用 AI、怎么拆需求、怎么判断结果、下一轮如何调整。",
  },
  {
    title: "课程内容",
    body:
      "5 天现场课程为拟定版本，包含 AI 创意能力综述、AI 图片应用、AI 视频应用、AI 进阶控制和 DR 业务场景实战。前期需求沟通已完成，后续课程内容会在现有沟通基础上，根据参与团队、重点业务场景和实际素材继续微调。",
  },
  {
    title: "线上答疑",
    body:
      "线上课后答疑主要在微信群进行，需要固定时间集中处理，建议每周 2 次，每次约 1 小时。答疑用于解决课后工具使用、提示词、生成失败、作业推进等轻量问题，不等同于全天候即时咨询，也不等同于定制工作流交付。",
  },
  {
    title: "追加线下",
    body:
      "如后续需要继续线下推进，建议按 3 天或 5 天集中安排，尽量避免零散半天往返。追加线下专题辅导日按整天资源占用核算，上午可做专题授课，下午可用于团队案例拆解、结果点评和下一轮任务布置。",
  },
  {
    title: "费用边界",
    body:
      "课堂演示和培训中必要的 AI 工具订阅、生成算力与素材测试成本由晨然承担。线下服务的机酒和市内交通差旅另计。DR 自行大规模生产、内部账号订阅、商用素材授权、上线投放和正式生产成本由 DR 承担。",
  },
  {
    title: "另行报价",
    body:
      "如果后续需要定制部门工作流、内部工具模板、标准提示词库、SOP 文档、长期项目陪跑或直接参与具体项目产出，这部分会显著增加准备和交付成本，需要在现有培训与辅导包之外重新评估报价。",
  },
];

const summaryItems = [
  "如果希望团队先完成第一轮认知和方法启动，可选择方案 1",
  "如果希望团队通过线上应用辅导和案例讲解完成第一轮应用，可选择方案 2",
  "如果希望更持续地推进，并让业务团队获得更多线下复盘和专题辅导，可选择方案 3",
];

const workflowDeliverables = [
  ["场景诊断", "明确某个团队最适合用 AI 介入的任务、输入素材、判断标准和不适合 AI 处理的边界"],
  ["工具链组合", "根据图片、视频、文字、参考图、一致性控制等需求选择工具组合，而不是只讲单个工具"],
  ["模板沉淀", "沉淀 Prompt 结构、参考图规范、命名方式、素材输入要求和结果检查清单"],
  ["SOP 共创", "把从 brief 到生成、筛选、复盘、二次修改的步骤整理成团队可执行的方法"],
  ["案例验证", "用少量真实业务样例跑一轮，判断流程是否可用，并根据结果调整模板和 SOP"],
  ["团队交接", "把方法交给业务团队和负责人，让内部后续可以持续使用，而不是完全依赖外部老师"],
];

const workflowPhases = [
  ["01", "先选场景", "建议从 1 到 2 个高频、价值明确、容易验证的业务场景开始"],
  ["02", "共创流程", "围绕真实 brief、素材输入、质量标准和审批链路设计 AI 介入方式"],
  ["03", "样例验证", "用真实业务样例跑一轮，看效率、可控性、品牌一致性和复用难度"],
  ["04", "文档交接", "沉淀 SOP、Prompt 模板、参考图规范、检查清单和团队使用建议"],
];

const workflowBoundaries = [
  "不包含在当前 42,000 / 58,000 / 88,000 元培训与辅导方案内",
  "不承诺替 DR 批量生产正式商用素材，重点是共创方法和验证流程",
  "如涉及部门 SOP、工具链模板、案例验证和项目陪跑，需要根据团队数量、场景复杂度和交付深度单独报价",
  "DR 内部账号订阅、批量生成算力、商用素材授权、上线投放和法务合规仍由 DR 自行负责",
];

function formatPrice(value: number) {
  return `¥${yuan.format(value)}`;
}

function roundToHundred(value: number) {
  return Math.round(value / 100) * 100;
}

function getPlanDiscountRate(plan: Plan) {
  if (!plan.listPrice) return 1;
  return plan.price / plan.listPrice;
}

function getAddonPrice(plan: Plan, listPrice: number) {
  if (plan.id === "custom") return listPrice;
  return roundToHundred(listPrice * getPlanDiscountRate(plan));
}

function getPlanDiscount(plan: Plan) {
  if (!plan.listPrice) return "自由组合";
  return `约 ${Math.round((plan.price / plan.listPrice) * 100) / 10} 折`;
}

function getSavingsLabel(plan: Plan) {
  if (!plan.listPrice) return "";
  return `单项合计 ${formatPrice(plan.listPrice)} · 预估省 ${formatPrice(plan.listPrice - plan.price)}`;
}

function App() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("growth");
  const [addons, setAddons] = useState<Partial<Record<ServiceId, number>>>({});
  const [copied, setCopied] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];
  const isCustomPlan = selectedPlan.id === "custom";

  const totals = useMemo(() => {
    const addonRows = services
      .map((service) => {
        const quantity = addons[service.id] ?? 0;
        const listPrice = service.price * quantity;
        const price = getAddonPrice(selectedPlan, listPrice);
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
    const price = selectedPlan.id === "custom" ? addonListPrice : selectedPlan.price + addonPrice;
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
    isCustomPlan ? `当前标准合计：${totals.price ? formatPrice(totals.price) : "待组合"}` : `预估报价：${formatPrice(totals.price)}`,
    totals.listPrice
      ? isCustomPlan
        ? `标准合计：${formatPrice(totals.listPrice)}，具体优惠细节面聊确认`
        : `标准合计：${formatPrice(totals.listPrice)}，预估约 ${totals.discount}`
      : "标准合计：待组合",
    "线下内容：",
    ...selectedPlan.onsite.map((item) => `- ${item}`),
    "线上内容：",
    ...selectedPlan.online.map((item) => `- ${item}`),
    totals.addonRows.length ? "追加服务：" : "追加服务：暂不追加",
    ...totals.addonRows.map((row) => {
      const linePrice = selectedPlan.id === "custom" ? row.listPrice : row.price;
      return `- ${row.service.code} ${row.service.title} × ${row.quantity}，${formatPrice(linePrice)}`;
    }),
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
    <>
      <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="返回晨然主页">
          晨然
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
          <p className={styles.eyebrow}>AI 企业应用合作方案</p>
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
          <figcaption>现场启动、课后答疑、应用辅导与后续扩展</figcaption>
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
          <p className={styles.valueLead}>
            DR 最终获得的不是一周课程本身，而是一套能在内部继续生长的 AI 应用起点：管理层可以看到团队如何把 AI 用进业务，业务成员可以知道自己的岗位该从哪里开始，视觉、社媒、产品、电商团队可以用同一套判断标准讨论创意、素材、结果和下一轮优化。首周现场训练负责统一认知和方法，后续线上与线下辅导负责把方法带回真实场景，让团队从“了解工具”进入“开始使用、能够判断、持续改进”的状态。
          </p>
          <div className={styles.valueGrid}>
            {valueItems.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
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
          <p className={styles.sectionNote}>
            课程安排为初步拟定版本，可根据 DR 参与团队、重点业务场景和实际素材继续调整。前期需求沟通已完成，后续课程内容会在现有沟通基础上继续微调
          </p>
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
          <p className={styles.eyebrow}>交互式报价</p>
          <h2>选择组合包，或继续加购服务</h2>
          <p>
            页面展示的是预估报价与预估优惠空间。具体服务组合、优惠细节和差旅安排，会在面聊时一起确认
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
                <div className={styles.planPriceLine}>
                  <strong>{plan.price ? formatPrice(plan.price) : "按组合计算"}</strong>
                  {plan.price ? (
                    <em>
                      {getSavingsLabel(plan)} · {getPlanDiscount(plan)}
                    </em>
                  ) : (
                    <em>优惠细节面聊确认</em>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className={styles.addonPanel}>
            <div className={styles.panelHeader}>
              <h3>加购服务</h3>
              <p>可在当前方案上继续追加，追加服务会按所选方案的预估折扣计算。自由组合先计算标准合计，具体优惠面聊确认</p>
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
                        {!isCustomPlan ? <em>标准 {formatPrice(row.listPrice)}</em> : null}
                      </span>
                      <strong>{formatPrice(selectedPlan.id === "custom" ? row.listPrice : row.price)}</strong>
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
                  <span>{isCustomPlan ? "预估优惠" : "预估节省"}</span>
                  <strong>{isCustomPlan ? "面聊确认" : totals.savings ? formatPrice(totals.savings) : "-"}</strong>
                </p>
                <p className={styles.finalPriceRow}>
                  <span>{isCustomPlan ? "当前标准合计" : "预估报价"}</span>
                  <strong>
                    {totals.price ? formatPrice(totals.price) : "待组合"}
                    {totals.price ? <em>{isCustomPlan ? "优惠面聊确认" : totals.discount}</em> : null}
                  </strong>
                </p>
              </div>

              <p className={styles.quoteNote}>
                以上为预估口径，具体服务组合、优惠细节与差旅安排以面聊确认版本为准
              </p>

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
          <p>方案说明</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>三个方案对应不同推进深度，线上次数为服务上限</h2>
          <div className={styles.planDetails}>
            {planDetails.map((plan) => (
              <article key={plan.title}>
                <h3>{plan.title}</h3>
                <p>{plan.body}</p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.sectionNote}>
            以上线上次数可根据双方排期合并或分批安排。C 用于处理基础共性问题，D 用于线上授课、案例讲解和轻量场景拆解，E 更偏向行业认知、工具趋势和管理层判断，不作为业务辅导主线
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>05</span>
          <p>追加机制</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>方案之外可自由组合，追加线下建议集中安排</h2>
          <p className={styles.bodyLead}>
            除以上三个建议方案外，也可以根据 DR 后续实际推进情况，在 A / B / C / D / E / F 单项服务中自由组合。方案 3 结束后，如需继续增加线下辅导、线上诊断，或再为新一批成员开线下启动营，也可以按单项服务继续组合。
          </p>
          <p className={styles.bodyLead}>
            如果后续希望增加线下辅导，建议优先集中在同一次线下行程中连续安排 2 到 3 天。这样可以减少重复差旅成本，也更利于集中解决团队问题。
          </p>
          <div className={styles.addOnTable}>
            {addOnMechanisms.map(([method, standard, packagePrice, note]) => (
              <article key={method}>
                <h3>{method}</h3>
                <p>
                  <span>标准价</span>
                  <strong>{standard}</strong>
                </p>
                <p>
                  <span>组合追加价</span>
                  <strong>{packagePrice}</strong>
                </p>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <p className={styles.sectionNote}>
            线上答疑、线上应用辅导课和顾问例会也可以按单项价格追加，具体次数可根据项目推进情况确认
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>06</span>
          <p>合作边界</p>
        </div>
        <div className={styles.boundaryText}>
          {boundarySections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.exclusionPanel}>
          <h3>本项目不包含</h3>
          <ul>
            {excludedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.workflowCta}>
          <div>
            <h3>定制工作流属于更高级服务</h3>
            <p>
              如果后续希望为产品中心、电商、传播或视觉团队搭建固定 AI 生产流程，包括 SOP、Prompt 模板、参考图规范、工具链组合、案例验证和项目陪跑，可作为独立的工作流共创项目单独评估报价和周期。
            </p>
          </div>
          <button type="button" onClick={() => setWorkflowOpen(true)}>
            查看工作流定制说明
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>07</span>
          <p>总结</p>
        </div>
        <div className={styles.sectionBody}>
          <h2>先完成首周现场培训，再根据周期和推进深度选择后续方案</h2>
          <div className={styles.summaryList}>
            {summaryItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>
      </main>

      {workflowOpen ? (
        <div className={styles.modalBackdrop} onClick={() => setWorkflowOpen(false)}>
          <section
            aria-labelledby="workflow-modal-title"
            aria-modal="true"
            className={styles.workflowModal}
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <p>高级服务说明</p>
                <h2 id="workflow-modal-title">AI 工作流定制共创服务</h2>
              </div>
              <button type="button" aria-label="关闭工作流定制说明" onClick={() => setWorkflowOpen(false)}>
                关闭
              </button>
            </div>

            <div className={styles.modalIntro}>
              <strong>这是培训与应用辅导之外的高级服务</strong>
              <p>
                如果 DR 后续希望不只是让成员学会使用 AI，而是为某个团队沉淀固定生产流程、工具链、SOP、Prompt 模板和案例验证机制，可以把工作流定制作为独立项目单独评估。
              </p>
            </div>

            <div className={styles.modalBlock}>
              <h3>可以交付什么</h3>
              <div className={styles.modalGrid}>
                {workflowDeliverables.map(([title, body]) => (
                  <article key={title}>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.modalBlock}>
              <h3>推进方式</h3>
              <div className={styles.modalTimeline}>
                {workflowPhases.map(([step, title, body]) => (
                  <article key={step}>
                    <span>{step}</span>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.modalBoundary}>
              <h3>需要单独评估报价和周期</h3>
              <ul>
                {workflowBoundaries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

export default App;
