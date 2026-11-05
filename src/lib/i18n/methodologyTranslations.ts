export const METHODOLOGY_TRANSLATIONS: Record<string, { zh: string; es: string; pt: string }> = {
  'method.title': {
    zh: '研究方法',
    es: 'Metodología',
    pt: 'Metodologia',
  },
  'method.statusNote': {
    zh: '生产环境中的记录只有在完成有据可查的人工审核后才会发布。研究预览是单独标识的 AI 辅助研究界面；纳入预览并不会改变记录在生产发布流程中的审核状态。',
    es: 'Los registros de producción solo se publican tras una revisión humana documentada. La vista previa de investigación es un entorno asistido por IA y etiquetado por separado; su inclusión no modifica el estado de revisión del registro para su publicación en producción.',
    pt: 'Os registros de produção só são publicados após uma revisão humana documentada. A prévia de pesquisa é um ambiente assistido por IA e identificado separadamente; sua inclusão não altera o status de revisão do registro para publicação em produção.',
  },
  'method.trust.eyebrow': {
    zh: '信任模型',
    es: 'Modelo de confianza',
    pt: 'Modelo de confiança',
  },
  'method.trust.title': {
    zh: '四个交接点确保结论经得起审视',
    es: 'Cuatro puntos de control preservan la integridad de la conclusión',
    pt: 'Quatro pontos de controle preservam a integridade da conclusão',
  },
  'method.trust.intro': {
    zh: '软件可以保留可追溯性并默认拒绝发布，但无法替代产品事实、法律判断、控制测试或由可问责人员作出的授权。',
    es: 'El software puede preservar la trazabilidad y bloquear por defecto. No puede sustituir los hechos del producto, el criterio jurídico, las pruebas de controles ni la autorización humana responsable.',
    pt: 'O software pode preservar a rastreabilidade e bloquear por padrão. Ele não pode substituir os fatos do produto, o julgamento jurídico, os testes de controles nem a autorização humana responsável.',
  },
  'method.trust.fact.title': {
    zh: '一手来源事实',
    es: 'Hecho de fuente primaria',
    pt: 'Fato de fonte primária',
  },
  'method.trust.fact.text': {
    zh: '官方文本、状态、法律形式、日期、适用范围、引证及复核触发条件。',
    es: 'Texto oficial, estado, forma jurídica, fecha, alcance, cita y condición de nueva revisión.',
    pt: 'Texto oficial, status, forma jurídica, data, escopo, citação e condição de nova revisão.',
  },
  'method.trust.judgment.title': {
    zh: '分析判断',
    es: 'Juicio analítico',
    pt: 'Julgamento analítico',
  },
  'method.trust.judgment.text': {
    zh: '商业影响和不确定性始终与来源事实清晰分开。',
    es: 'La implicación empresarial y la incertidumbre se mantienen visiblemente separadas del hecho respaldado por la fuente.',
    pt: 'A implicação empresarial e a incerteza permanecem visivelmente separadas do fato sustentado pela fonte.',
  },
  'method.trust.owner.title': {
    zh: '可问责负责人',
    es: 'Responsable con rendición de cuentas',
    pt: 'Responsável designado',
  },
  'method.trust.owner.text': {
    zh: '政策、产品、法务、工程、安全或管理层负责提供下一项证据或作出下一步决策。',
    es: 'Políticas públicas, producto, legal, ingeniería, seguridad o dirección asumen la siguiente evidencia o decisión.',
    pt: 'Políticas públicas, produto, jurídico, engenharia, segurança ou liderança assumem a próxima evidência ou decisão.',
  },
  'method.trust.gate.title': {
    zh: '人工发布门槛',
    es: 'Control humano de publicación',
    pt: 'Controle humano de publicação',
  },
  'method.trust.gate.text': {
    zh: '未发布的记录或会产生重大后果的结论，不会仅因由模型或测试套件生成便获得批准。',
    es: 'Ningún registro no publicado ni ninguna conclusión de consecuencias relevantes se aprueba por el mero hecho de que la haya producido un modelo o una batería de pruebas.',
    pt: 'Nenhum registro não publicado nem conclusão com consequências relevantes é aprovado apenas porque foi produzido por um modelo ou por uma suíte de testes.',
  },
  'method.monitoring.snapshots': {
    zh: '已记录的监测快照',
    es: 'Instantáneas de seguimiento registradas',
    pt: 'Registros de monitoramento documentados',
  },
  'method.monitoring.2026-07-14.action': {
    zh: '基线快照',
    es: 'instantánea de referencia',
    pt: 'registro de referência',
  },
  'method.monitoring.2026-07-14.note': {
    zh: '首份监测快照已按所列官方来源核查；不声称存在历史性监测周期。',
    es: 'La primera instantánea de seguimiento se contrastó con las fuentes oficiales indicadas; no se afirma que exista una cadencia histórica.',
    pt: 'O primeiro registro de monitoramento foi conferido com as fontes oficiais listadas; não se alega uma cadência histórica.',
  },
  'method.monitoring.2026-08-06.action': {
    zh: '变更复核',
    es: 'revisión de cambios',
    pt: 'revisão de mudanças',
  },
  'method.monitoring.2026-08-06.note': {
    zh: '记录了欧盟《官方公报》状态更正、欧盟与加州 8 月 2 日的适用性转换、中国 7 月 15 日生效的拟人化互动约束性规则，以及单独发布的智能体政策意见；这是第二份带日期的快照，不代表实时监测。',
    es: 'Registró la corrección del Diario Oficial de la UE, la transición de aplicabilidad del 2 de agosto en la UE y California, la norma china vinculante sobre interacción antropomórfica del 15 de julio y la opinión separada sobre política de agentes; es una segunda instantánea fechada, no una afirmación de seguimiento en tiempo real.',
    pt: 'Registrou a correção do Jornal Oficial da UE, a transição de aplicabilidade de 2 de agosto na UE e na Califórnia, a regra chinesa vinculante sobre interação antropomórfica de 15 de julho e a opinião separada sobre política de agentes; este é um segundo registro datado, não uma alegação de monitoramento em tempo real.',
  },
  'method.monitoring.2026-08-07.action': {
    zh: '定向核验',
    es: 'verificación focalizada',
    pt: 'verificação direcionada',
  },
  'method.monitoring.2026-08-07.note': {
    zh: '重新核验了支持 EU 立法生命周期与 Article 50、California 透明度，以及 China 约束性规则与政策方向区分卡片的官方来源。本次范围明确的时效核验不代表实时或全面监测。',
    es: 'Se volvieron a comprobar las fuentes oficiales que sustentan el ciclo legislativo y el artículo 50 de la UE, la transparencia de California y la distinción china entre norma vinculante y orientación de política. Esta verificación acotada de vigencia no es seguimiento exhaustivo ni en tiempo real.',
    pt: 'Foram novamente verificadas as fontes oficiais que sustentam o ciclo legislativo e o artigo 50 da UE, a transparência da Califórnia e a distinção chinesa entre regra vinculativa e orientação de política. Esta verificação delimitada de atualidade não é monitorização abrangente nem em tempo real.',
  },
  'method.monitoring.2026-08-13.action': {
    zh: '官方来源范围核验',
    es: 'actualización acotada de fuentes oficiales',
    pt: 'atualização delimitada de fontes oficiais',
  },
  'method.monitoring.2026-08-13.note': {
    zh: '重新核验了清单中的欧盟、美国、中国、新加坡、韩国和英国官方来源，截止2026年8月13日。现有跟踪法规在8月7日之后未发现实质性变化；本次核验补充了先前遗漏的官方来源，并将加州 SB 1000 标记为尚待审议的提案，而非现行法。这项选择性审查并非实时或全面监测。',
    es: 'Se volvieron a comprobar las fuentes oficiales enumeradas de la UE, Estados Unidos, China, Singapur, Corea y el Reino Unido hasta el 13 de agosto de 2026. No se halló ningún cambio sustantivo posterior al 7 de agosto en los instrumentos ya seguidos; la revisión añade fuentes oficiales omitidas anteriormente y señala la SB 1000 de California como propuesta pendiente, no como ley vigente. Esta revisión selectiva no constituye un seguimiento exhaustivo ni en tiempo real.',
    pt: 'Foram novamente verificadas as fontes oficiais listadas da UE, dos Estados Unidos, da China, de Singapura, da Coreia e do Reino Unido até 13 de agosto de 2026. Não foi encontrada qualquer alteração substancial posterior a 7 de agosto nos instrumentos já acompanhados; a revisão acrescenta fontes oficiais antes omitidas e assinala a SB 1000 da Califórnia como proposta pendente, não como lei vigente. Esta revisão seletiva não constitui monitorização abrangente nem em tempo real.',
  },
  'method.workflow.title': {
    zh: '研究流程',
    es: 'Flujo de investigación',
    pt: 'Fluxo de pesquisa',
  },
  'method.workflow.define.label': {
    zh: '明确决策。',
    es: 'Definir la decisión.',
    pt: 'Definir a decisão.',
  },
  'method.workflow.define.text': {
    zh: '记录研究所要支持的产品、市场、能力、日期和具体决策。',
    es: 'Registrar el producto, el mercado, la capacidad, la fecha y la decisión que la investigación debe fundamentar.',
    pt: 'Registrar o produto, o mercado, a capacidade, a data e a decisão que a pesquisa deve embasar.',
  },
  'method.workflow.sources.label': {
    zh: '优先使用一手来源。',
    es: 'Usar primero fuentes primarias.',
    pt: 'Usar primeiro fontes primárias.',
  },
  'method.workflow.sources.text': {
    zh: '优先采用官方立法文本、监管机构或政府部门发布材料、标准组织资料及公司官方披露。二手来源可以帮助定位或解释一手来源，但不能在未作说明的情况下取代一手来源。',
    es: 'Dar prioridad a la legislación oficial, las publicaciones de reguladores o ministerios, los materiales de organismos de normalización y las divulgaciones oficiales de empresas. Las fuentes secundarias pueden ayudar a localizar o interpretar una fuente primaria, pero no la sustituyen de forma implícita.',
    pt: 'Priorizar legislação oficial, publicações de reguladores ou ministérios, materiais de organismos de normalização e divulgações oficiais de empresas. Fontes secundárias podem ajudar a localizar ou interpretar uma fonte primária, mas não a substituem de forma implícita.',
  },
  'method.workflow.provenance.label': {
    zh: '记录来源链。',
    es: 'Registrar la procedencia.',
    pt: 'Registrar a procedência.',
  },
  'method.workflow.provenance.text': {
    zh: '保存来源 ID、发布者、标题、URL、来源等级、发布与访问日期、稳定引用或存档证据，以及下次复核日期。',
    es: 'Conservar el ID de la fuente, el editor, el título, la URL, el nivel, las fechas de publicación y acceso, la referencia estable o evidencia archivada y la fecha de próxima revisión.',
    pt: 'Manter o ID da fonte, o publicador, o título, a URL, o nível, as datas de publicação e acesso, a referência estável ou evidência arquivada e a data da próxima revisão.',
  },
  'method.workflow.epistemic.label': {
    zh: '区分认知类型。',
    es: 'Separar los tipos epistémicos.',
    pt: 'Separar os tipos epistêmicos.',
  },
  'method.workflow.epistemic.text': {
    zh: '事实说明来源能够支持什么；推论解释其可能的商业含义；建议提出由明确负责人执行的行动。',
    es: 'Un hecho indica lo que respalda la fuente; una inferencia explica su posible significado empresarial; una recomendación propone una acción con un responsable definido.',
    pt: 'Um fato indica o que a fonte sustenta; uma inferência explica seu possível significado empresarial; uma recomendação propõe uma ação com responsável definido.',
  },
  'method.workflow.scope.label': {
    zh: '审视适用范围。',
    es: 'Cuestionar el alcance.',
    pt: 'Questionar o escopo.',
  },
  'method.workflow.scope.text': {
    zh: '核查约束力、生命周期、适用性、产品事实、例外情况、尚未解决的翻译问题和相反证据。',
    es: 'Comprobar el carácter vinculante, el ciclo de vida, la aplicabilidad, los hechos del producto, las excepciones, las traducciones no resueltas y la evidencia contraria.',
    pt: 'Verificar o caráter vinculante, o ciclo de vida, a aplicabilidade, os fatos do produto, as exceções, as traduções pendentes e as evidências contrárias.',
  },
  'method.workflow.review.label': {
    zh: '发布前审核。',
    es: 'Revisar antes de publicar.',
    pt: 'Revisar antes da publicação.',
  },
  'method.workflow.review.text': {
    zh: '生产发布既要求记录处于已发布状态，也要求有负责人批准日志。纳入预览不等于获得发布批准。',
    es: 'La producción exige el estado publicado y la aprobación registrada de un responsable. La inclusión en la vista previa no equivale a una aprobación de publicación.',
    pt: 'A produção exige o status publicado e a aprovação registrada de um responsável. A inclusão na prévia não equivale à aprovação de publicação.',
  },
  'method.sources.title': {
    zh: '来源等级与置信度',
    es: 'Niveles de fuente y confianza',
    pt: 'Níveis de fonte e confiança',
  },
  'method.sources.tier1.label': {
    zh: '第 1 级',
    es: 'Nivel 1',
    pt: 'Nível 1',
  },
  'method.sources.tier1.text': {
    zh: '是具有权威性的一手材料。',
    es: 'corresponde a material primario autorizado.',
    pt: 'corresponde a material primário autorizado.',
  },
  'method.sources.tier2.label': {
    zh: '第 2 级',
    es: 'Nivel 2',
    pt: 'Nível 2',
  },
  'method.sources.tier2.text': {
    zh: '是具有权威性的解释性或实施性来源。',
    es: 'corresponde a una fuente autorizada de explicación o implementación.',
    pt: 'corresponde a uma fonte autorizada de explicação ou implementação.',
  },
  'method.sources.tier3.label': {
    zh: '第 3 级',
    es: 'Nivel 3',
    pt: 'Nível 3',
  },
  'method.sources.tier3.text': {
    zh: '可支持资料发现或背景了解，但不能单独确立事实性主张。',
    es: 'puede apoyar el descubrimiento o el contexto, pero no establece por sí solo una afirmación factual.',
    pt: 'pode apoiar a descoberta ou o contexto, mas não estabelece sozinho uma afirmação factual.',
  },
  'method.sources.confidence': {
    zh: '置信度上限取决于来源质量、生命周期不确定性、翻译质量，以及支撑推论的最薄弱事实。',
    es: 'La confianza queda limitada por la calidad de las fuentes, la incertidumbre del ciclo de vida, la calidad de la traducción y el hecho más débil que sustenta una inferencia.',
    pt: 'A confiança é limitada pela qualidade das fontes, pela incerteza do ciclo de vida, pela qualidade da tradução e pelo fato mais fraco que sustenta uma inferência.',
  },
  'method.changeControl.title': {
    zh: '监测与变更控制',
    es: 'Seguimiento y control de cambios',
    pt: 'Monitoramento e controle de mudanças',
  },
  'method.changeControl.text': {
    zh: '每项带日期的作品集信号都包含来源 ID、最近核验日期和下次复核日期。只有在经核实的变化影响产品范围、发布时间、算力可用性、客户资格、外部立场或所需证据时，才会上调监测等级。更正会保留先前记录并说明变更内容；一天的快照绝不会被描述成具有历史积累的周度追踪记录。',
    es: 'Cada señal fechada del portafolio incluye IDs de fuente, una fecha de última verificación y una fecha de próxima revisión. El seguimiento solo se escala cuando un cambio verificado afecta al alcance del producto, el calendario de lanzamiento, la disponibilidad de cómputo, la elegibilidad de clientes, el posicionamiento externo o la evidencia exigida. Las correcciones conservan el registro anterior y explican el cambio; una instantánea de un solo día nunca se presenta como un historial de seguimiento semanal.',
    pt: 'Cada sinal datado do portfólio inclui IDs de fonte, uma data de última verificação e uma data de próxima revisão. O monitoramento só é escalado quando uma mudança verificada afeta o escopo do produto, o cronograma de lançamento, a disponibilidade computacional, a elegibilidade de clientes, o posicionamento externo ou as evidências exigidas. As correções preservam o registro anterior e explicam a mudança; um registro de um único dia nunca é apresentado como um histórico de acompanhamento semanal.',
  },
  'method.boundary.title': {
    zh: '环境配置与发布边界',
    es: 'Límites del perfil y de la publicación',
    pt: 'Limites do perfil e da publicação',
  },
  'method.boundary.fixtures.label': {
    zh: '测试样本：',
    es: 'Datos ficticios:',
    pt: 'Dados fictícios:',
  },
  'method.boundary.fixtures.text': {
    zh: '用于测试产品和公式的虚构记录。',
    es: 'registros ficticios para probar el producto y la fórmula.',
    pt: 'registros fictícios para testar o produto e a fórmula.',
  },
  'method.boundary.preview.label': {
    zh: '研究预览：',
    es: 'Vista previa de investigación:',
    pt: 'Prévia de pesquisa:',
  },
  'method.boundary.preview.text': {
    zh: '由清单确定范围的可复现子集，加上明确标识的作品集样本；研究由 AI 辅助完成，尚未获得独立审核以用于生产发布。',
    es: 'un subconjunto determinista delimitado por un manifiesto, junto con muestras de portafolio claramente etiquetadas; está asistido por IA y no cuenta con aprobación independiente para su publicación en producción.',
    pt: 'um subconjunto determinístico delimitado por um manifesto, junto com amostras de portfólio claramente identificadas; é assistido por IA e não possui aprovação independente para publicação em produção.',
  },
  'method.boundary.production.label': {
    zh: '生产环境：',
    es: 'Producción:',
    pt: 'Produção:',
  },
  'method.boundary.production.text': {
    zh: '采用默认拒绝机制的结构化路由，仅呈现已发布且获批的记录。未发布的条目可以保留在研究文件中，但不会出现在应用中。',
    es: 'rutas estructuradas con cierre seguro que solo muestran registros publicados y aprobados. Las filas no publicadas pueden permanecer en los archivos de investigación sin aparecer en la aplicación.',
    pt: 'rotas estruturadas com bloqueio por padrão que exibem apenas registros publicados e aprovados. Linhas não publicadas podem permanecer nos arquivos de pesquisa sem aparecer no aplicativo.',
  },
  'method.appendix.eyebrow': {
    zh: '进阶方法 / 附录',
    es: 'Método avanzado / anexo',
    pt: 'Método avançado / apêndice',
  },
  'method.appendix.title': {
    zh: 'ADRS 优先级模型',
    es: 'Modelo de priorización ADRS',
    pt: 'Modelo de priorização ADRS',
  },
  'method.appendix.intro': {
    zh: '以上六步研究流程是核心方法。以下 ADRS 内容是面向需要技术细节的读者所提供的可选优先级辅助。',
    es: 'El flujo de investigación de seis pasos anterior es el método principal. El material ADRS que sigue es una ayuda opcional de priorización para quienes quieran consultar el detalle técnico.',
    pt: 'O fluxo de pesquisa em seis passos acima é o método principal. O material ADRS abaixo é um apoio opcional à priorização para quem pretenda consultar o detalhe técnico.',
  },
  'method.adrs.constants.title': {
    zh: 'ADRS 常量（SPEC §13——已锁定）',
    es: 'Constantes de ADRS (SPEC §13 — bloqueadas)',
    pt: 'Constantes do ADRS (SPEC §13 — bloqueadas)',
  },
  'method.adrs.constants.canonicalNote': {
    zh: '规范性方法证据：为避免翻译改变含义，以下经过测试的公式在所有界面语言中均保留英文原文。',
    es: 'Evidencia metodológica canónica: la fórmula probada que aparece a continuación se conserva literalmente en inglés en todos los idiomas de la interfaz para evitar que la traducción altere su significado.',
    pt: 'Evidência metodológica canônica: a fórmula testada abaixo permanece literalmente em inglês em todos os idiomas da interface para evitar que a tradução altere seu significado.',
  },
  'method.adrs.constants.summary': {
    zh: '展开公式常量',
    es: 'Abrir las constantes de la fórmula',
    pt: 'Abrir as constantes da fórmula',
  },
  'method.adrs.limit.title': {
    zh: 'ADRS 的决策使用限制',
    es: 'Límite del uso decisorio de ADRS',
    pt: 'Limite do uso decisório do ADRS',
  },
  'method.adrs.limit.text': {
    zh: 'ADRS 是由作者设计的优先级排序启发式方法，不是经过校准的概率、合规评分或自动化上线门槛。决策必须呈现风险等级、驱动因素拆解、证据质量和合理的敏感性范围。覆盖不足可能使评分向下偏移。',
    es: 'ADRS es una heurística de priorización diseñada por el autor, no una probabilidad calibrada, una puntuación de cumplimiento ni una puerta de lanzamiento automatizada. Las decisiones deben mostrar el nivel, el desglose de los factores, la calidad de la evidencia y un rango plausible de sensibilidad. La falta de cobertura puede sesgar la puntuación a la baja.',
    pt: 'O ADRS é uma heurística de priorização criada pelo autor, não uma probabilidade calibrada, uma pontuação de conformidade nem um critério automatizado de lançamento. As decisões devem mostrar o nível, a decomposição dos fatores, a qualidade das evidências e uma faixa plausível de sensibilidade. A falta de cobertura pode enviesar a pontuação para baixo.',
  },
  'method.limits.title': {
    zh: '已知限制',
    es: 'Limitaciones conocidas',
    pt: 'Limitações conhecidas',
  },
  'method.limits.text': {
    zh: '当前结构化语料库是一套经过筛选的研究基础，并非产品规范最初描述的更大规模语料库。它无法证明普遍性的法律覆盖、未明确产品的当前适用性，也无法证明尚未在真实工作流程中测试的控制措施是否有效。会产生重大后果的决策仍需由具备资质的当地专业人员审核。',
    es: 'El corpus estructurado actual es una base de investigación seleccionada, no el corpus más amplio descrito originalmente en la especificación del producto. No puede demostrar una cobertura jurídica universal, la aplicabilidad vigente a un producto no especificado ni la eficacia de controles que no se hayan probado en un flujo de trabajo real. Las decisiones de consecuencias relevantes siguen requiriendo una revisión local cualificada.',
    pt: 'O corpus estruturado atual é uma base de pesquisa selecionada, não o corpus mais amplo originalmente descrito na especificação do produto. Ele não pode demonstrar cobertura jurídica universal, aplicabilidade atual a um produto não especificado nem a eficácia de controles que não tenham sido testados em um fluxo de trabalho real. Decisões com consequências relevantes continuam exigindo revisão local qualificada.',
  },
};
