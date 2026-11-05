export const RESEARCH_ROUTES_TRANSLATIONS: Record<string, { zh: string; es: string; pt: string }> = {
  // Jurisdiction routes.
  'research.jurisdictions.title': { zh: '司法管辖区', es: 'Jurisdicciones', pt: 'Jurisdições' },
  'research.jurisdictions.note.preview': {
    zh: '研究预览版统计清单范围内的记录；它们的审核中发布状态保持不变。',
    es: 'La vista previa cuenta registros delimitados por el manifiesto; su estado de publicación en revisión no cambia.',
    pt: 'A prévia conta registos delimitados pelo manifesto; o seu estado de publicação em revisão não muda.',
  },
  'research.jurisdictions.note.fixtures': {
    zh: '模拟数据统计均为虚构，仅用于测试产品体验。',
    es: 'Los recuentos de datos ficticios existen solo para probar la experiencia del producto.',
    pt: 'As contagens de dados fictícios existem apenas para testar a experiência do produto.',
  },
  'research.jurisdictions.note.production': {
    zh: '生产环境中的司法管辖区摘要仅展示已发布记录。',
    es: 'En producción, los resúmenes por jurisdicción solo muestran registros publicados.',
    pt: 'Em produção, os resumos por jurisdição apresentam apenas registos publicados.',
  },
  'research.jurisdictions.count.preview': { zh: '{count} 项范围内政策文件', es: '{count} instrumentos delimitados', pt: '{count} instrumentos delimitados' },
  'research.jurisdictions.count.fixtures': { zh: '{count} 项虚构政策文件', es: '{count} instrumentos ficticios', pt: '{count} instrumentos fictícios' },
  'research.jurisdictions.count.production': { zh: '{count} 项已发布政策文件', es: '{count} instrumentos publicados', pt: '{count} instrumentos publicados' },
  'research.jurisdictions.count.preview.one': { zh: '{count} 项范围内政策文件', es: '{count} instrumento delimitado', pt: '{count} instrumento delimitado' },
  'research.jurisdictions.count.fixtures.one': { zh: '{count} 项虚构政策文件', es: '{count} instrumento ficticio', pt: '{count} instrumento fictício' },
  'research.jurisdictions.count.production.one': { zh: '{count} 项已发布政策文件', es: '{count} instrumento publicado', pt: '{count} instrumento publicado' },
  'research.jurisdiction.us.name': { zh: '美国', es: 'Estados Unidos', pt: 'Estados Unidos' },
  'research.jurisdiction.eu.name': { zh: '欧盟', es: 'Unión Europea', pt: 'União Europeia' },
  'research.jurisdiction.sg.name': { zh: '新加坡', es: 'Singapur', pt: 'Singapura' },
  'research.jurisdiction.cn.name': { zh: '中国', es: 'China', pt: 'China' },
  'research.jurisdiction.detail.note.preview': {
    zh: '此研究预览版展示清单范围内的记录，包括仍在审核中的记录。追踪器是规范研究视图。',
    es: 'Esta vista previa muestra registros delimitados por el manifiesto, incluidos los que siguen en revisión. El rastreador es la vista canónica de investigación.',
    pt: 'Esta prévia mostra registos delimitados pelo manifesto, incluindo os que permanecem em revisão. O monitor é a vista canónica da investigação.',
  },
  'research.jurisdiction.detail.note.fixtures': { zh: '此配置中的每条记录都是虚构模拟数据。', es: 'Todos los registros de este perfil son datos ficticios.', pt: 'Todos os registos deste perfil são dados fictícios.' },
  'research.jurisdiction.detail.note.production': {
    zh: '生产环境仅展示经独立批准并已发布的记录。追踪器是规范研究视图。',
    es: 'Producción muestra solo registros publicados y aprobados de forma independiente. El rastreador es la vista canónica de investigación.',
    pt: 'Produção mostra apenas registos publicados e aprovados de forma independente. O monitor é a vista canónica da investigação.',
  },
  'research.jurisdiction.detail.empty.preview': { zh: '此司法管辖区没有清单范围内的政策文件。', es: 'No hay instrumentos delimitados por el manifiesto para esta jurisdicción.', pt: 'Não há instrumentos delimitados pelo manifesto para esta jurisdição.' },
  'research.jurisdiction.detail.empty.fixtures': { zh: '此司法管辖区没有虚构政策文件。', es: 'No hay instrumentos ficticios para esta jurisdicción.', pt: 'Não há instrumentos fictícios para esta jurisdição.' },
  'research.jurisdiction.detail.empty.production': { zh: '此司法管辖区没有已发布的政策文件。', es: 'No hay instrumentos publicados para esta jurisdicción.', pt: 'Não há instrumentos publicados para esta jurisdição.' },
  'research.lifecycle.proposed': { zh: '已提出', es: 'propuesto', pt: 'proposto' },
  'research.lifecycle.adopted_not_yet_applicable': {
    zh: '已通过但尚未适用',
    es: 'adoptado, todavía no aplicable',
    pt: 'adotado, ainda não aplicável',
  },
  'research.lifecycle.in_force_partially_applicable': {
    zh: '已生效并部分适用',
    es: 'en vigor y parcialmente aplicable',
    pt: 'em vigor e parcialmente aplicável',
  },
  'research.lifecycle.fully_applicable': { zh: '全面适用', es: 'plenamente aplicable', pt: 'plenamente aplicável' },
  'research.lifecycle.amended': { zh: '已修订', es: 'modificado', pt: 'alterado' },
  'research.lifecycle.superseded': { zh: '已被取代', es: 'sustituido', pt: 'substituído' },
  'research.lifecycle.rescinded': { zh: '已撤销', es: 'revocado', pt: 'revogado' },
  'research.lifecycle.expired': { zh: '已到期', es: 'expirado', pt: 'expirado' },
  'research.lifecycle.withdrawn': { zh: '已撤回', es: 'retirado', pt: 'retirado' },

  // Scenario routes. Scenario names, narratives, notes, IDs and dates remain canonical.
  'research.scenarios.title': { zh: '智能体场景', es: 'Escenarios de agentes', pt: 'Cenários de agentes' },
  'research.scenarios.note': {
    zh: '所有场景均为假设性的虚构组合。在有基于研究并经人工审核的评估前，它们仅在模拟数据模式中展示。',
    es: 'Todos los escenarios son composiciones hipotéticas y ficticias. Se muestran en modo de datos simulados hasta que existan evaluaciones basadas en investigación y revisadas por personas.',
    pt: 'Todos os cenários são composições hipotéticas e fictícias. São apresentados no modo de dados simulados até existirem avaliações sustentadas por investigação e revistas por pessoas.',
  },
  'research.scenarios.empty': {
    zh: '此配置中没有已发布场景。',
    es: 'No hay escenarios publicados en este perfil.',
    pt: 'Não há cenários publicados neste perfil.',
  },
  'research.scenario.notFound': { zh: '未找到。', es: 'No encontrado.', pt: 'Não encontrado.' },
  'research.scenario.hypothetical': { zh: '假设场景', es: 'ESCENARIO HIPOTÉTICO', pt: 'CENÁRIO HIPOTÉTICO' },
  'research.scenario.composite': { zh: '虚构组合', es: 'composición ficticia', pt: 'composição fictícia' },
  'research.scenario.capabilityProfile': { zh: '能力画像', es: 'Perfil de capacidades', pt: 'Perfil de capacidades' },
  'research.scenario.intensities': { zh: '§10 强度', es: 'intensidades de §10', pt: 'intensidades de §10' },
  'research.scenario.adrsTitle': {
    zh: '各司法管辖区 ADRS',
    es: 'ADRS por jurisdicción',
    pt: 'ADRS por jurisdição',
  },
  'research.notCompliance': {
    zh: '不构成合规判断',
    es: 'no es una determinación de cumplimiento',
    pt: 'não constitui uma determinação de conformidade',
  },
  'research.table.jurisdiction': { zh: '司法管辖区', es: 'Jurisdicción', pt: 'Jurisdição' },
  'research.table.inherent': { zh: '固有风险', es: 'Inherente', pt: 'Inerente' },
  'research.table.credit': { zh: '抵扣', es: 'Crédito', pt: 'Crédito' },
  'research.table.residual': { zh: '剩余风险（原始值）', es: 'Residual (bruto)', pt: 'Residual (bruto)' },
  'research.table.tier': { zh: '等级', es: 'Nivel', pt: 'Nível' },
  'research.scenario.openCalculator': {
    zh: '在计算器中打开',
    es: 'abrir en la calculadora',
    pt: 'abrir na calculadora',
  },
  'research.scenario.fixtureNote': {
    zh: '模拟数据中的 J 组件为虚构示例，仍待经审核的研究支持（OD-11/MD-3）。深层链接会根据此评估预填计算器（AC-ADRS-11）；每个开关仍可编辑。',
    es: 'Los componentes J de los datos simulados son FICTICIOS e ilustrativos, a la espera de investigación revisada (OD-11/MD-3). Los enlaces directos precargan la calculadora con esta evaluación (AC-ADRS-11); todos los controles siguen siendo editables.',
    pt: 'Os componentes J dos dados simulados são FICTÍCIOS e ilustrativos, enquanto aguardam investigação revista (OD-11/MD-3). As ligações diretas preenchem previamente a calculadora com esta avaliação (AC-ADRS-11); todos os controlos continuam editáveis.',
  },
  'research.scenario.provisionsTitle': {
    zh: '涉及此能力画像的条款',
    es: 'Disposiciones relacionadas con este perfil de capacidades',
    pt: 'Disposições relacionadas com este perfil de capacidades',
  },
  'research.scenario.provisionsEyebrow': {
    zh: '▲ 推断 — 能力重叠，参考日期',
    es: '▲ inferencia — solapamiento de capacidades, fecha de referencia',
    pt: '▲ inferência — sobreposição de capacidades, data de referência',
  },
  'research.scenario.noProvisions': {
    zh: '语料库中尚无条款映射到此画像。',
    es: 'Todavía no hay disposiciones del corpus vinculadas a este perfil.',
    pt: 'Ainda não há disposições do corpus associadas a este perfil.',
  },
  'research.scenario.bindingHits': {
    zh: '按司法管辖区统计的当前适用约束性命中',
    es: 'Coincidencias vinculantes actualmente aplicables por jurisdicción',
    pt: 'Correspondências vinculativas atualmente aplicáveis por jurisdição',
  },
  'research.table.provision': { zh: '条款', es: 'Disposición', pt: 'Disposição' },
  'research.table.jurisdictionShort': { zh: '辖区', es: 'Jur.', pt: 'Jur.' },
  'research.table.overlap': { zh: '重叠能力', es: 'Solapamiento', pt: 'Sobreposição' },
  'research.table.bindingness': { zh: '约束力', es: 'Carácter vinculante', pt: 'Caráter vinculativo' },
  'research.table.appliesFrom': { zh: '适用起始日', es: 'Aplicable desde', pt: 'Aplicável desde' },
  'research.table.bindingNow': { zh: '当前具有约束力？', es: '¿Vinculante ahora?', pt: 'Vinculativo agora?' },
  'research.yes': { zh: '是', es: 'sí', pt: 'sim' },
  'research.notYetBinding': {
    zh: '尚未适用/不具约束力',
    es: 'todavía no aplicable / no vinculante',
    pt: 'ainda não aplicável / não vinculativo',
  },

  // Capability, policy and risk taxonomies. Canonical record rows remain in their source language.
  'research.capabilityTaxonomy.title': {
    zh: '智能体能力分类',
    es: 'Taxonomía de capacidades agénticas',
    pt: 'Taxonomia de capacidades agênticas',
  },
  'research.capabilityTaxonomy.note': {
    zh: '能力描述智能体可以做什么，并不判断某项具体法律是否适用。',
    es: 'Las capacidades describen lo que un agente puede hacer, no si una ley concreta resulta aplicable.',
    pt: 'As capacidades descrevem o que um agente pode fazer, não se uma lei específica é aplicável.',
  },
  'research.table.capability': { zh: '能力', es: 'Capacidad', pt: 'Capacidade' },
  'research.table.definition': { zh: '定义', es: 'Definición', pt: 'Definição' },
  'research.policyTaxonomy.title': { zh: '政策分类', es: 'Taxonomía de políticas', pt: 'Taxonomia de políticas' },
  'research.policyTaxonomy.note': {
    zh: '每项政策文件均沿独立维度分类，确保状态、约束力与监管路径不会混为一谈。',
    es: 'Cada instrumento se clasifica en ejes independientes para no confundir estado, carácter vinculante y enfoque regulatorio.',
    pt: 'Cada instrumento é classificado segundo eixos independentes para não confundir estado, caráter vinculativo e abordagem regulatória.',
  },
  'research.policyTaxonomy.instrumentType.label': {
    zh: '政策文件类型',
    es: 'Tipo de instrumento',
    pt: 'Tipo de instrumento',
  },
  'research.policyTaxonomy.instrumentType.values': {
    zh: '已颁布法律 · 拟议立法 · 法规 · 行政行动 · 监管机构指引 · 自愿性框架 · 技术标准',
    es: 'ley promulgada · legislación propuesta · reglamento · acción ejecutiva · guía regulatoria · marco voluntario · norma técnica',
    pt: 'lei promulgada · legislação proposta · regulamento · ação executiva · orientação do regulador · quadro voluntário · norma técnica',
  },
  'research.policyTaxonomy.bindingness.label': { zh: '约束力', es: 'Carácter vinculante', pt: 'Caráter vinculativo' },
  'research.policyTaxonomy.bindingness.values': {
    zh: '具有约束力 · 有条件约束 · 不具约束力',
    es: 'vinculante · condicionalmente vinculante · no vinculante',
    pt: 'vinculativo · condicionalmente vinculativo · não vinculativo',
  },
  'research.policyTaxonomy.lifecycle.label': { zh: '生命周期', es: 'Ciclo de vida', pt: 'Ciclo de vida' },
  'research.policyTaxonomy.lifecycle.values': {
    zh: '已提出 → 已通过但尚未适用 → 已生效并部分适用 → 全面适用 → 已被取代、撤销、到期或撤回',
    es: 'propuesto → adoptado, todavía no aplicable → en vigor y parcialmente aplicable → plenamente aplicable → sustituido, revocado, expirado o retirado',
    pt: 'proposto → adotado, ainda não aplicável → em vigor e parcialmente aplicável → plenamente aplicável → substituído, revogado, expirado ou retirado',
  },
  'research.policyTaxonomy.approach.label': {
    zh: '监管路径',
    es: 'Enfoque regulatorio',
    pt: 'Abordagem regulatória',
  },
  'research.policyTaxonomy.approach.values': {
    zh: '横向综合 · 行业特定 · 技术特定 · 源自数据保护 · 内容治理 · 安全/网络安全 · 采购/政府内部 · 标准/保障',
    es: 'horizontal integral · sectorial · tecnológica · derivada de protección de datos · gobernanza de contenidos · seguridad/ciberseguridad · contratación/gobierno interno · estándares/aseguramiento',
    pt: 'horizontal abrangente · setorial · tecnológica · derivada da proteção de dados · governação de conteúdos · segurança/cibersegurança · contratação/governo interno · normas/garantia',
  },
  'research.riskTaxonomy.title': {
    zh: '治理风险分类',
    es: 'Taxonomía de riesgos de gobernanza',
    pt: 'Taxonomia de riscos de governação',
  },
  'research.riskTaxonomy.note': {
    zh: '风险是一套结构化分析分类；场景中的失败叙述仍为假设。',
    es: 'Los riesgos forman una taxonomía analítica estructurada; las narrativas de fallos de los escenarios siguen siendo hipotéticas.',
    pt: 'Os riscos formam uma taxonomia analítica estruturada; as narrativas de falhas dos cenários continuam a ser hipotéticas.',
  },
  'research.table.risk': { zh: '风险', es: 'Riesgo', pt: 'Risco' },

  // ADRS route framing.
  'research.riskScore.title': {
    zh: '智能体部署风险评分（ADRS）',
    es: 'Puntuación de riesgo de despliegue de agentes (ADRS)',
    pt: 'Pontuação de risco de implementação de agentes (ADRS)',
  },
  'research.riskScore.warning': {
    zh: '这不构成合规判断。',
    es: 'Esto no es una determinación de cumplimiento.',
    pt: 'Isto não constitui uma determinação de conformidade.',
  },
  'research.riskScore.intro': {
    zh: 'ADRS 是一种透明的分析沟通工具，用于比较假设性部署条件。',
    es: 'ADRS es una herramienta transparente de comunicación analítica para comparar condiciones hipotéticas de despliegue.',
    pt: 'ADRS é uma ferramenta transparente de comunicação analítica para comparar condições hipotéticas de implementação.',
  },
  'research.riskScore.note': {
    zh: '计算器采用确定性计算：分析人员手动设置能力锚点、有证据支持的缓解措施和四个司法管辖区 J 组件。选择司法管辖区绝不会自动改变评分。',
    es: 'La calculadora es determinista: los analistas fijan manualmente los anclajes de capacidad, las mitigaciones respaldadas y los cuatro componentes jurisdiccionales J. Seleccionar una jurisdicción nunca cambia la puntuación automáticamente.',
    pt: 'A calculadora é determinística: os analistas definem manualmente as âncoras de capacidade, as medidas de mitigação sustentadas e os quatro componentes jurisdicionais J. Selecionar uma jurisdição nunca altera automaticamente a pontuação.',
  },

  // ADRS dimensions and locked anchor-rubric presentation.
  'adrs.dimension.A': { zh: '自主性', es: 'Autonomía', pt: 'Autonomia' },
  'adrs.dimension.T': { zh: '行动范围', es: 'Superficie de acción', pt: 'Superfície de ação' },
  'adrs.dimension.D': { zh: '数据敏感度', es: 'Sensibilidad de los datos', pt: 'Sensibilidade dos dados' },
  'adrs.dimension.E': { zh: '外部触达范围', es: 'Alcance externo', pt: 'Alcance externo' },
  'adrs.dimension.R': { zh: '不可逆性', es: 'Irreversibilidad', pt: 'Irreversibilidade' },
  'adrs.weight': { zh: '权重', es: 'peso', pt: 'peso' },
  'adrs.integerAnchors': { zh: '仅使用整数锚点', es: 'solo anclajes enteros', pt: 'apenas âncoras inteiras' },
  'adrs.anchor': { zh: '锚点', es: 'anclaje', pt: 'âncora' },

  'adrs.anchor.A.0': {
    zh: '人工发起并批准每项行动（工具仅提供建议）',
    es: 'La persona inicia y aprueba cada acción (la herramienta solo sugiere)',
    pt: 'A pessoa inicia e aprova cada ação (a ferramenta apenas sugere)',
  },
  'adrs.anchor.A.1': {
    zh: '人工批准每项会产生实际影响的行动；智能体自动执行只读步骤',
    es: 'La persona aprueba cada acción con efectos; el agente ejecuta automáticamente los pasos de solo lectura',
    pt: 'A pessoa aprova cada ação com efeitos; o agente executa automaticamente os passos apenas de leitura',
  },
  'adrs.anchor.A.2': {
    zh: '人工批准成批行动或计划；智能体在已批准计划内执行步骤',
    es: 'La persona aprueba lotes o planes; el agente ejecuta los pasos dentro del plan aprobado',
    pt: 'A pessoa aprova lotes ou planos; o agente executa os passos dentro do plano aprovado',
  },
  'adrs.anchor.A.3': {
    zh: '智能体在严格政策边界内自主执行；人工异步审核',
    es: 'El agente actúa de forma autónoma dentro de límites normativos estrictos; la persona revisa de forma asíncrona',
    pt: 'O agente atua de forma autónoma dentro de limites normativos rígidos; a pessoa revê de forma assíncrona',
  },
  'adrs.anchor.A.4': {
    zh: '智能体自主执行、设定自身子目标或向其他智能体委派任务（C7+C10）',
    es: 'El agente actúa de forma autónoma, fija sus propios subobjetivos o delega en otros agentes (C7+C10)',
    pt: 'O agente atua de forma autónoma, define os próprios subobjetivos ou delega noutros agentes (C7+C10)',
  },
  'adrs.anchor.T.0': {
    zh: '不使用工具（仅生成内容）',
    es: 'Sin herramientas (solo generación)',
    pt: 'Sem ferramentas (apenas geração)',
  },
  'adrs.anchor.T.1': { zh: '只读工具（C4）', es: 'Herramientas de solo lectura (C4)', pt: 'Ferramentas apenas de leitura (C4)' },
  'adrs.anchor.T.2': {
    zh: '在沙盒或低影响系统中使用状态变更工具（C5，受控）',
    es: 'Herramientas que cambian el estado en un sandbox o en sistemas de baja consecuencia (C5, contenido)',
    pt: 'Ferramentas que alteram o estado num sandbox ou em sistemas de baixa consequência (C5, contido)',
  },
  'adrs.anchor.T.3': {
    zh: '在生产系统或面向客户的状态中使用状态变更工具（退款、配置变更）',
    es: 'Herramientas que cambian el estado en sistemas de producción o estados de cara al cliente (reembolsos, cambios de configuración)',
    pt: 'Ferramentas que alteram o estado em sistemas de produção ou estados dirigidos ao cliente (reembolsos, alterações de configuração)',
  },
  'adrs.anchor.T.4': {
    zh: '高影响工具：金融执行（C12）、安全控制、全局运行，或在运行时扩大作用范围（C11）',
    es: 'Herramientas de alta potencia: ejecución financiera (C12), controles de seguridad, operaciones en toda la flota o ampliación del alcance en tiempo de ejecución (C11)',
    pt: 'Ferramentas de elevada potência: execução financeira (C12), controlos de segurança, operações em toda a frota ou ampliação do âmbito em tempo de execução (C11)',
  },
  'adrs.anchor.D.0': { zh: '仅使用公开或合成数据', es: 'Solo datos públicos o sintéticos', pt: 'Apenas dados públicos ou sintéticos' },
  'adrs.anchor.D.1': {
    zh: '内部非个人业务数据（C2）',
    es: 'Datos empresariales internos no personales (C2)',
    pt: 'Dados empresariais internos não pessoais (C2)',
  },
  'adrs.anchor.D.2': {
    zh: '普通个人数据（C3，已识别用户）',
    es: 'Datos personales ordinarios (C3, usuarios identificados)',
    pt: 'Dados pessoais comuns (C3, utilizadores identificados)',
  },
  'adrs.anchor.D.3': {
    zh: '敏感类别（健康、金融、生物识别）、未成年人数据，或大规模画像（C9）',
    es: 'Categorías sensibles (salud, finanzas, biometría), datos de menores o elaboración de perfiles a gran escala (C9)',
    pt: 'Categorias sensíveis (saúde, finanças, biometria), dados de menores ou criação de perfis em grande escala (C9)',
  },
  'adrs.anchor.D.4': {
    zh: '大规模使用第3级数据，并在运营流程中跨境传输这些数据（R8）',
    es: 'Nivel 3 a escala, más transferencia transfronteriza de esos datos en el flujo operativo (R8)',
    pt: 'Nível 3 em escala, mais transferência transfronteiriça desses dados no fluxo operacional (R8)',
  },
  'adrs.anchor.E.0': {
    zh: '输出仅对内部运营人员可见',
    es: 'Resultados visibles solo para operadores internos',
    pt: 'Resultados visíveis apenas para operadores internos',
  },
  'adrs.anchor.E.1': {
    zh: '输出面向已认证最终用户，并明确位于产品内',
    es: 'Resultados para usuarios finales autenticados, claramente dentro del producto',
    pt: 'Resultados para utilizadores finais autenticados, claramente dentro do produto',
  },
  'adrs.anchor.E.2': {
    zh: '面向外部主体的一对一外发通信（C6：电子邮件、支持工单）',
    es: 'Comunicaciones salientes individuales a terceros (C6: correo electrónico, solicitudes de soporte)',
    pt: 'Comunicações externas individuais para terceiros (C6: correio eletrónico, pedidos de suporte)',
  },
  'adrs.anchor.E.3': {
    zh: '面向公众的内容，或在第三方平台上的行动（C1+C6 公开）',
    es: 'Contenido público o acciones en plataformas de terceros (C1+C6 público)',
    pt: 'Conteúdo público ou ações em plataformas de terceiros (C1+C6 público)',
  },
  'adrs.anchor.E.4': {
    zh: '第3级加上对外部主体作出的合同或金融承诺（C12）',
    es: 'Nivel 3 más compromisos contractuales o financieros con terceros (C12)',
    pt: 'Nível 3 mais compromissos contratuais ou financeiros com terceiros (C12)',
  },
  'adrs.anchor.R.0': {
    zh: '所有行动都可轻易撤销（仅草稿）',
    es: 'Todas las acciones son fácilmente reversibles (solo borradores)',
    pt: 'Todas as ações são facilmente reversíveis (apenas rascunhos)',
  },
  'adrs.anchor.R.1': {
    zh: '可通过常规操作撤销（可编辑记录、软删除）',
    es: 'Reversible con un esfuerzo rutinario (registros editables, borrado lógico)',
    pt: 'Reversível com esforço rotineiro (registos editáveis, eliminação lógica)',
  },
  'adrs.anchor.R.2': {
    zh: '需要大量工作或成本才能撤销（群发邮件已发送、退款已发放）',
    es: 'Reversible con esfuerzo o coste significativo (correos masivos enviados, reembolsos emitidos)',
    pt: 'Reversível com esforço ou custo significativo (mensagens em massa enviadas, reembolsos emitidos)',
  },
  'adrs.anchor.R.3': {
    zh: '经济或声誉影响实际上难以逆转（公开内容传播、合同承诺）',
    es: 'Efectos económicos o reputacionales prácticamente irreversibles (difusión de contenido público, compromisos contractuales)',
    pt: 'Efeitos económicos ou reputacionais praticamente irreversíveis (difusão de conteúdo público, compromissos contratuais)',
  },
  'adrs.anchor.R.4': {
    zh: '在合理最坏情形下，对人员、安全或关键基础设施造成不可逆伤害',
    es: 'Daño irreversible a personas, seguridad o infraestructura crítica en el peor caso plausible',
    pt: 'Dano irreversível a pessoas, segurança ou infraestruturas críticas no pior cenário plausível',
  },

  // ADRS mitigations and jurisdictional components.
  'adrs.mitigations': { zh: '缓解措施', es: 'Mitigaciones', pt: 'Medidas de mitigação' },
  'adrs.mitigations.note': {
    zh: '必须有证据才能主张；抵扣上限为 0.40',
    es: 'se requiere evidencia para alegarlas; crédito limitado a 0,40',
    pt: 'é necessária evidência para as declarar; crédito limitado a 0,40',
  },
  'adrs.mitigation.M1': {
    zh: '所有会产生实际影响的行动均设置 HITL 门槛 — 在工具执行边界前通过架构强制实施，并防止机械审批',
    es: 'Control HITL para todas las acciones con efectos — aplicado por arquitectura antes del límite de ejecución de herramientas y diseñado contra la aprobación mecánica',
    pt: 'Controlo HITL para todas as ações com efeitos — aplicado pela arquitetura antes do limite de execução de ferramentas e concebido contra aprovação mecânica',
  },
  'adrs.mitigation.M2': {
    zh: '最小权限工具范围 — 按任务分配凭证、默认拒绝注册表、不保留长期写入凭证',
    es: 'Alcance de herramientas con privilegio mínimo — credenciales por tarea, registro de denegación por defecto y sin credenciales permanentes de escritura',
    pt: 'Âmbito de ferramentas com privilégio mínimo — credenciais por tarefa, registo de negação por defeito e sem credenciais permanentes de escrita',
  },
  'adrs.mitigation.M3': {
    zh: '完整行动审计日志 — 不可变、逐工具调用记录，并带 trace ID（§18.5）',
    es: 'Registro integral de auditoría de acciones — inmutable, por llamada de herramienta y con trace ID (§18.5)',
    pt: 'Registo integral de auditoria de ações — imutável, por chamada de ferramenta e com trace ID (§18.5)',
  },
  'adrs.mitigation.M4': {
    zh: '硬性行动限制与终止开关 — 在模型外强制实施频率、价值和影响范围限制；终止开关经过测试',
    es: 'Límites estrictos de acción e interruptor de emergencia — límites de frecuencia, valor y radio de impacto aplicados fuera del modelo; interruptor probado',
    pt: 'Limites rígidos de ação e mecanismo de paragem — limites de frequência, valor e raio de impacto aplicados fora do modelo; mecanismo testado',
  },
  'adrs.mitigation.M5': {
    zh: '数据最小化与脱敏 — 在进入模型上下文前过滤 PII；限制记忆保留期限',
    es: 'Minimización y redacción de datos — filtrado de PII antes del contexto del modelo; límites de retención de memoria',
    pt: 'Minimização e ocultação de dados — filtragem de PII antes do contexto do modelo; limites de retenção de memória',
  },
  'adrs.mitigation.M6': {
    zh: '对抗性输入防护 — 提示注入测试；隔离不受信任内容',
    es: 'Defensas frente a entradas adversarias — pruebas de inyección de instrucciones y aislamiento de contenido no confiable',
    pt: 'Defesas contra entradas adversariais — testes de injeção de instruções e isolamento de conteúdo não fiável',
  },
  'adrs.mitigation.M7': {
    zh: '独立部署前审核 — 有记录，且由开发团队以外的主体完成',
    es: 'Revisión independiente previa al despliegue — documentada y realizada por una parte ajena al equipo constructor',
    pt: 'Revisão independente antes da implementação — documentada e realizada por uma parte externa à equipa de desenvolvimento',
  },
  'adrs.mitigation.M8': {
    zh: 'AI 披露与内容标识 — 告知用户；按司法管辖区要求标识合成内容',
    es: 'Divulgación de IA y etiquetado de contenido — información a usuarios y etiquetado de contenido sintético según la jurisdicción',
    pt: 'Divulgação de IA e rotulagem de conteúdo — informação aos utilizadores e rotulagem de conteúdo sintético segundo a jurisdição',
  },
  'adrs.mitigation.M9': {
    zh: '事件响应手册 — 经测试的回滚与通知程序',
    es: 'Manual de respuesta a incidentes — procedimiento probado de reversión y notificación',
    pt: 'Manual de resposta a incidentes — procedimento testado de reversão e notificação',
  },
  'adrs.cap.title': {
    zh: '缓解抵扣上限为40%',
    es: 'El crédito de mitigación está limitado al 40 %',
    pt: 'O crédito de mitigação está limitado a 40%',
  },
  'adrs.cap.text': {
    zh: '剩余风险不得低于固有风险的60%',
    es: 'el riesgo residual no puede ser inferior al 60 % del inherente',
    pt: 'o risco residual não pode ser inferior a 60% do risco inerente',
  },
  'adrs.jurisdiction': { zh: '司法管辖区', es: 'Jurisdicción', pt: 'Jurisdição' },
  'adrs.jurisdiction.note': {
    zh: '仅供参考；绝不会自动设置 J',
    es: 'solo como referencia; nunca configura J automáticamente',
    pt: 'apenas como referência; nunca define J automaticamente',
  },
  'adrs.jurisdiction.none': {
    zh: '未选择司法管辖区。下方四个 J 组件始终由分析人员手动设置。',
    es: 'No se ha seleccionado ninguna jurisdicción. El analista siempre configura manualmente los cuatro componentes J.',
    pt: 'Não foi selecionada qualquer jurisdição. O analista define sempre manualmente os quatro componentes J.',
  },
  'adrs.jurisdiction.selected': {
    zh: '{jurisdiction} 参考：只有在经审核的研究发布后，才会显示该司法管辖区的组件示例（OD-11）。选择司法管辖区不会改变下方任何开关；请根据所示定义自行设置。',
    es: 'Referencia para {jurisdiction}: los ejemplos de componentes específicos de la jurisdicción solo aparecen tras publicarse investigación revisada (OD-11). Seleccionar una jurisdicción no cambia ninguno de los controles siguientes; configúrelos según las definiciones mostradas.',
    pt: 'Referência para {jurisdiction}: os exemplos de componentes específicos da jurisdição só aparecem após a publicação de investigação revista (OD-11). Selecionar uma jurisdição não altera qualquer dos controlos abaixo; defina-os segundo as definições apresentadas.',
  },
  'adrs.jComponents': { zh: 'J 组件', es: 'Componentes J', pt: 'Componentes J' },
  'adrs.jComponents.note': {
    zh: '手动设置（0/1），每项均附 §13.5 定义',
    es: 'configuración manual (0/1), cada uno con su definición de §13.5',
    pt: 'configuração manual (0/1), cada um com a respetiva definição de §13.5',
  },
  'adrs.j.binding_hit': {
    zh: '至少一项当前适用且具有约束力的条款映射到智能体强度不低于2的能力',
    es: '≥1 disposición vinculante actualmente aplicable se vincula a una capacidad que el agente tiene con intensidad ≥2',
    pt: '≥1 disposição vinculativa atualmente aplicável está associada a uma capacidade que o agente possui com intensidade ≥2',
  },
  'adrs.j.near_term_hit': {
    zh: '至少一项已通过但尚未适用的约束性条款将在 assessed_date 后18个月内适用（强度不低于1）',
    es: '≥1 disposición vinculante adoptada pero aún no aplicable entra en aplicación dentro de los 18 meses siguientes a assessed_date (intensidad ≥1)',
    pt: '≥1 disposição vinculativa adotada mas ainda não aplicável começa a aplicar-se nos 18 meses seguintes a assessed_date (intensidade ≥1)',
  },
  'adrs.j.enforcement_posture': {
    zh: '监管机构已公开表示将相关领域列为执法重点 — 始终属于 ▲ 推断，须引用该信号',
    es: 'El regulador ha señalado públicamente una prioridad de aplicación en el área pertinente — siempre ▲ inferencia; debe citarse la señal',
    pt: 'O regulador indicou publicamente uma prioridade de aplicação na área relevante — sempre ▲ inferência; o sinal deve ser citado',
  },
  'adrs.j.prohibition_adjacent': {
    zh: '能力画像接近被禁止或须许可的实践 — 始终属于 ▲ 推断',
    es: 'El perfil de capacidades está próximo a una práctica prohibida o sujeta a licencia — siempre ▲ inferencia',
    pt: 'O perfil de capacidades está próximo de uma prática proibida ou sujeita a licença — sempre ▲ inferência',
  },

  // ADRS output and controls. Formula identifiers remain visible in every locale.
  'adrs.live.title': { zh: '实时计算', es: 'Cálculo en tiempo real', pt: 'Cálculo em tempo real' },
  'adrs.live.note': {
    zh: '全精度 · 显示1位小数 · 等级按原始值确定',
    es: 'precisión completa · muestra 1 decimal · nivel a partir del valor bruto',
    pt: 'precisão completa · apresentação com 1 casa decimal · nível a partir do valor bruto',
  },
  'adrs.output.contribution': { zh: '贡献值', es: 'contribución', pt: 'contribuição' },
  'adrs.output.inherent': {
    zh: '固有风险（InherentRisk）',
    es: 'Riesgo inherente (InherentRisk)',
    pt: 'Risco inerente (InherentRisk)',
  },
  'adrs.output.credit': {
    zh: '缓解抵扣（MitigationCredit）',
    es: 'Crédito de mitigación (MitigationCredit)',
    pt: 'Crédito de mitigação (MitigationCredit)',
  },
  'adrs.output.residual': {
    zh: '剩余风险（ResidualRisk，原始值）',
    es: 'Riesgo residual (ResidualRisk, bruto)',
    pt: 'Risco residual (ResidualRisk, bruto)',
  },
  'adrs.output.display': {
    zh: 'ADRS（显示值）',
    es: 'ADRS (mostrado)',
    pt: 'ADRS (apresentado)',
  },
  'adrs.output.tier': { zh: '等级（Tier）', es: 'Nivel (Tier)', pt: 'Nível (Tier)' },
  'adrs.copy': { zh: '复制永久链接', es: 'Copiar enlace permanente', pt: 'Copiar ligação permanente' },
  'adrs.copied': { zh: '已复制', es: 'copiado', pt: 'copiado' },
  'adrs.disclaimer': {
    zh: '这不构成合规判断。',
    es: 'Esto no es una determinación de cumplimiento.',
    pt: 'Isto não constitui uma determinação de conformidade.',
  },
};
