import styles from "./workflow.module.css";

const audiences = [
  ["产品中心", "产品设计灵感、系列延展、新品概念测试、从手稿 / 3D 模型 / 实物到可验证视觉方案"],
  ["电商团队", "商品主图、详情页、banner、商品视频、平台投放素材的稳定产出方法"],
  ["传播 / 社媒团队", "内容选题、故事片方向、脚本分镜、图片视频变体和社媒内容资产生成"],
  ["视觉团队", "KV、空间陈列、DP 点、门店屏幕、品牌视觉质感和参考图规范"],
];

const deliverables = [
  ["业务场景梳理", "明确每个团队最适合用 AI 介入的任务、输入素材、判断标准和不适合 AI 处理的边界"],
  ["工具链组合", "根据场景选择图片、视频、文字、参考图、一致性控制等工具组合，而不是只讲单个工具怎么用"],
  ["Prompt 与模板", "沉淀可复用的提示词结构、参考图规范、命名方式、素材输入要求和结果检查清单"],
  ["SOP 共创", "把从 brief 到生成、筛选、复盘、二次修改的步骤整理成团队可执行的工作方法"],
  ["案例验证", "用少量真实业务样例验证流程是否可用，找出卡点，并根据结果调整模板和 SOP"],
  ["团队交接", "把方法交给业务团队和负责人，确保后续不是只依赖外部老师，而是内部可以持续使用"],
];

const phases = [
  ["第一阶段", "场景诊断", "访谈团队负责人和关键使用者，确认高频任务、素材输入、质量标准、审批链路和现有卡点"],
  ["第二阶段", "流程设计", "围绕 1 到 2 个优先场景设计 AI 介入方式，明确每一步由谁做、用什么工具、产出什么结果"],
  ["第三阶段", "样例验证", "选取真实业务样例跑一轮，从生成结果、效率、可控性和品牌一致性四个维度判断是否可复用"],
  ["第四阶段", "文档沉淀", "整理 SOP、Prompt 模板、参考图规范、结果检查清单和团队使用建议"],
  ["第五阶段", "交接迭代", "对团队进行交接说明，收集第一轮使用反馈，再做一轮轻量调整"],
];

const boundaries = [
  "工作流定制不包含在当前 42,000 / 58,000 / 88,000 元培训与辅导方案内",
  "不承诺替 DR 批量生产正式商用素材，重点是共创方法和验证流程",
  "如涉及部门 SOP、工具链模板、案例验证和项目陪跑，需要根据团队数量、场景复杂度和交付深度单独报价",
  "DR 内部账号订阅、批量生成算力、商用素材授权、上线投放和法务合规仍由 DR 自行负责",
];

export default function WorkflowCustomizationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/share/ai-0524-x7k9">返回合作方案</a>
        <span>高级服务说明</span>
      </header>

      <section className={styles.hero}>
        <p>AI WORKFLOW CUSTOMIZATION</p>
        <h1>AI 工作流定制共创服务</h1>
        <div>
          <strong>这是培训与应用辅导之外的高级服务</strong>
          <span>
            如果 DR 后续希望不只是让成员学会使用 AI，而是为某个团队沉淀固定生产流程、工具链、SOP、Prompt 模板和案例验证机制，可以把工作流定制作为独立项目单独评估。
          </span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>
          <span>01</span>
          <p>适用对象</p>
        </div>
        <div className={styles.grid}>
          {audiences.map(([title, body]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>
          <span>02</span>
          <p>交付内容</p>
        </div>
        <div className={styles.deliverables}>
          {deliverables.map(([title, body]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>
          <span>03</span>
          <p>推进方式</p>
        </div>
        <div className={styles.timeline}>
          {phases.map(([phase, title, body]) => (
            <article key={phase}>
              <span>{phase}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>
          <span>04</span>
          <p>报价边界</p>
        </div>
        <div className={styles.boundary}>
          <h2>需要单独评估报价和周期</h2>
          <p>
            工作流定制会比培训和辅导更重，因为它需要进入具体部门的真实工作方式，理解素材输入、质量标准、审批链路和团队协作习惯。建议在首周现场启动营之后，根据团队反馈和优先级，再决定是否启动工作流共创项目。
          </p>
          <ul>
            {boundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
