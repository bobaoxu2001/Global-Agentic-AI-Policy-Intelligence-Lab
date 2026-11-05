type Translation = { zh: string; es: string; pt: string };

const t = (zh: string, es: string, pt: string): Translation => ({ zh, es, pt });

export const RISK_MANAGEMENT_TRANSLATIONS: Record<string, Translation> = {
  'method.rmf.eyebrow': t('应用型风险管理', 'Gestión de riesgos aplicada', 'Gestão de riscos aplicada'),
  'method.rmf.title': t('GOVERN → MAP → MEASURE → MANAGE', 'GOVERN → MAP → MEASURE → MANAGE', 'GOVERN → MAP → MEASURE → MANAGE'),
  'method.rmf.text': t(
    '了解如何用 NIST AI RMF 1.0 连接政策预期、产品场景、技术证据与可问责决策，并应用于企业智能体、云与模型 API、游戏与内容、通信及金融科技。',
    'Vea cómo NIST AI RMF 1.0 puede conectar expectativas normativas, contexto de producto, evidencia técnica y decisiones responsables en agentes empresariales, nube y API de modelos, juegos y contenido, comunicación y FinTech.',
    'Veja como o NIST AI RMF 1.0 pode conectar expectativas de políticas, contexto do produto, evidências técnicas e decisões responsáveis em agentes empresariais, nuvem e APIs de modelos, jogos e conteúdo, comunicação e FinTech.',
  ),
  'method.rmf.boundary': t(
    '这是基于公开信息的独立应用，不代表腾讯采用该框架、获得认证、符合合规要求或已证明控制有效。',
    'Aplicación independiente a información pública; no afirma adopción por Tencent, certificación, cumplimiento ni eficacia de controles.',
    'Aplicação independente a informações públicas; não afirma adoção pela Tencent, certificação, conformidade nem eficácia de controles.',
  ),
  'method.rmf.open': t('打开 AI RMF 应用方法', 'Abrir la aplicación de AI RMF', 'Abrir a aplicação do AI RMF'),

  'rmf.hero.eyebrow': t('NIST AI RMF 1.0 · 应用型运营方法', 'NIST AI RMF 1.0 · método operativo aplicado', 'NIST AI RMF 1.0 · método operacional aplicado'),
  'rmf.hero.title': t('从政策信号到 AI 风险决策', 'De la señal normativa a la decisión sobre riesgo de IA', 'Do sinal de política à decisão sobre risco de IA'),
  'rmf.hero.dek': t(
    '一套实用方法，把外部政策预期、产品场景、技术证据和可问责的上线决策连接到多产品 AI 生态中。',
    'Una forma práctica de conectar expectativas normativas externas, contexto de producto, evidencia técnica y decisiones de lanzamiento responsables en un ecosistema de IA con múltiples productos.',
    'Uma forma prática de conectar expectativas externas de políticas, contexto do produto, evidências técnicas e decisões responsáveis de lançamento em um ecossistema de IA com vários produtos.',
  ),
  'rmf.hero.primary': t('查看四个核心环节', 'Explorar las cuatro funciones', 'Explorar as quatro funções'),
  'rmf.hero.secondary': t('打开 NIST Core', 'Abrir el Core de NIST', 'Abrir o Core do NIST'),
  'rmf.boundary.label': t('证据边界', 'Límite de evidencia', 'Limite das evidências'),
  'rmf.boundary.text': t(
    'NIST AI RMF 1.0 是自愿、非特定行业的框架，目前正在修订。本页是将其应用于公开信息的独立分析：不声称腾讯已采用该框架，不构成认证或合规结论，不证明公开披露的控制措施有效，也不是法律建议。它是场景层的方法样本，不是条款级法律映射或上线授权。',
    'NIST AI RMF 1.0 es voluntario, no se limita a un sector y está actualmente en revisión. Esta es una aplicación analítica independiente a información pública: no afirma que Tencent haya adoptado el marco, no es una certificación ni una conclusión de cumplimiento, no prueba la eficacia de los controles divulgados y no es asesoramiento jurídico. Es un artefacto metodológico de contexto, no un mapeo jurídico por disposición ni una autorización de lanzamiento.',
    'O NIST AI RMF 1.0 é voluntário, não específico a um setor e está atualmente em revisão. Esta é uma aplicação analítica independente a informações públicas: não afirma que a Tencent adotou o framework, não é certificação nem conclusão de conformidade, não prova a eficácia dos controles divulgados e não constitui aconselhamento jurídico. É um artefato metodológico de contexto, não um mapeamento jurídico por dispositivo nem autorização de lançamento.',
  ),

  'rmf.core.eyebrow': t('四个核心环节', 'Cuatro funciones centrales', 'Quatro funções centrais'),
  'rmf.core.title': t('一个持续迭代的风险管理系统', 'Un sistema iterativo de gestión de riesgos', 'Um sistema iterativo de gestão de riscos'),
  'rmf.core.intro': t(
    '四个环节不是一次性清单。GOVERN 横跨全流程；当场景变化或出现新证据时，下一次管理决策前要重新进入 MAP 和 MEASURE。',
    'Las funciones no son una lista de verificación de una sola vez. GOVERN es transversal; un cambio de contexto o nueva evidencia devuelve el trabajo a MAP y MEASURE antes de la siguiente decisión de gestión.',
    'As funções não são uma lista de verificação única. GOVERN é transversal; uma mudança de contexto ou nova evidência leva o trabalho de volta a MAP e MEASURE antes da próxima decisão de gestão.',
  ),
  'rmf.core.governBand': t(
    '贯穿全生命周期的问责、政策、文化与流程',
    'Rendición de cuentas, políticas, cultura y procesos transversales durante todo el ciclo de vida',
    'Responsabilização, políticas, cultura e processos transversais em todo o ciclo de vida',
  ),
  'rmf.layer.fact': t('NIST 框架基础', 'Fundamento NIST', 'Fundamento NIST'),
  'rmf.layer.proposal': t('Atlas 应用建议', 'Aplicación de Atlas', 'Aplicação do Atlas'),
  'rmf.layer.question': t('决策问题', 'Pregunta de decisión', 'Pergunta de decisão'),
  'rmf.govern.fact': t(
    '建立风险管理文化，并明确政策、角色、文档、问责和组织协调。GOVERN 为 MAP、MEASURE 和 MANAGE 提供信息与支持。',
    'Cultivar una cultura de gestión de riesgos y establecer políticas, funciones, documentación, rendición de cuentas y alineación organizativa. GOVERN informa y habilita MAP, MEASURE y MANAGE.',
    'Cultivar uma cultura de gestão de riscos e estabelecer políticas, papéis, documentação, responsabilização e alinhamento organizacional. GOVERN informa e viabiliza MAP, MEASURE e MANAGE.',
  ),
  'rmf.govern.proposal': t(
    '建立 AI 系统清单、风险容忍度、第三方供应链规则、培训、监测、审计、事故响应和退出机制；明确 RACI 以及批准、暂停和升级权限。',
    'Mantener un inventario de IA, tolerancias de riesgo, reglas para la cadena de suministro de terceros, formación, seguimiento, auditoría, respuesta a incidentes y vías de retirada. Hacer explícitos el RACI y la autoridad para aprobar, pausar y escalar.',
    'Manter um inventário de IA, tolerâncias a risco, regras para a cadeia de terceiros, treinamento, monitoramento, auditoria, resposta a incidentes e caminhos de desativação. Tornar explícitos o RACI e a autoridade para aprovar, pausar e escalar.',
  ),
  'rmf.govern.question': t(
    '谁负责？依据什么标准？谁有权批准、暂停或升级？',
    '¿Quién responde, con qué estándar y quién puede aprobar, pausar o escalar?',
    'Quem responde, com base em qual padrão, e quem pode aprovar, pausar ou escalar?',
  ),
  'rmf.map.fact': t(
    '建立系统与使用场景：预期用途、参与者、受影响的人群、影响、风险成因和风险。该场景可支持初步的继续或停止判断。',
    'Establecer el contexto del sistema y de uso: fines previstos, actores, personas afectadas, impactos, factores contribuyentes y riesgos. Este contexto puede respaldar una decisión inicial de continuar o no.',
    'Estabelecer o contexto do sistema e de uso: finalidades previstas, atores, pessoas afetadas, impactos, fatores contribuintes e riscos. Esse contexto pode apoiar uma decisão inicial de continuar ou não.',
  ),
  'rmf.map.proposal': t(
    '记录要解决的问题、用户、受影响群体、市场、行业、人类与 AI 的决策分工、数据、工具、预期用途、可预见误用，以及非 AI 方案是否更合适。',
    'Registrar el problema, usuarios, grupos afectados, mercados, sector, papel decisorio humano frente a IA, datos, herramientas, uso previsto, uso indebido previsible y si una opción sin IA funcionaría mejor.',
    'Registrar o problema, usuários, grupos afetados, mercados, setor, papel decisório humano versus IA, dados, ferramentas, uso previsto, uso indevido previsível e se uma opção sem IA funcionaria melhor.',
  ),
  'rmf.map.question': t(
    '系统在哪里使用、替谁做什么、可能影响谁？',
    '¿Dónde se usa el sistema, para quién, para hacer qué y a quién puede afectar?',
    'Onde o sistema é usado, para quem, para fazer o quê e quem pode ser afetado?',
  ),
  'rmf.measure.fact': t(
    '使用定量、定性或混合方法，在部署前和运行中测试、评估、验证与监测风险。记录暂时无法测量的风险，并持续复核指标是否仍适用。',
    'Usar métodos cuantitativos, cualitativos o mixtos para probar, evaluar, verificar y supervisar el riesgo antes del despliegue y durante la operación. Documentar los riesgos aún no medibles y revisar si las métricas siguen siendo adecuadas.',
    'Usar métodos quantitativos, qualitativos ou mistos para testar, avaliar, verificar e monitorar o risco antes da implantação e durante a operação. Documentar riscos ainda não mensuráveis e rever se as métricas continuam adequadas.',
  ),
  'rmf.measure.proposal': t(
    '测试预期用途表现、错误严重程度、攻击和提示词注入、隐私泄露、差异化影响、人类理解、控制绕过、漂移，以及第三方模型或工具风险——不能只看准确率。',
    'Probar desempeño para el uso previsto, gravedad de errores, ataques e inyección de prompts, filtración de privacidad, impacto diferencial, comprensión humana, evasión de controles, deriva y riesgo de modelos o herramientas de terceros; no solo precisión.',
    'Testar desempenho no uso previsto, gravidade dos erros, ataques e injeção de prompts, vazamento de privacidade, impacto diferencial, compreensão humana, contorno de controles, deriva e risco de modelos ou ferramentas de terceiros — não apenas acurácia.',
  ),
  'rmf.measure.question': t(
    '什么证据能证明系统可靠？控制措施在真实场景中有效吗？',
    '¿Qué evidencia demuestra que el sistema es fiable y que los controles funcionan en el contexto real?',
    'Que evidência demonstra que o sistema é confiável e que os controles funcionam no contexto real?',
  ),
  'rmf.manage.fact': t(
    '对已识别和测量的风险排序，配置资源，选择应对措施，监测结果，沟通、恢复并改进。决策可以包括是否继续开发或部署。',
    'Priorizar los riesgos mapeados y medidos, asignar recursos, elegir respuestas, supervisar resultados, comunicar, recuperar y mejorar. La decisión puede incluir si el desarrollo o despliegue debe continuar.',
    'Priorizar riscos mapeados e medidos, alocar recursos, escolher respostas, monitorar resultados, comunicar, recuperar e melhorar. A decisão pode incluir se o desenvolvimento ou a implantação deve continuar.',
  ),
  'rmf.manage.proposal': t(
    '选择全面上线、限定试点、市场暂缓、缩小权限、人工审批、更换供应商、私有化部署、暂停、回滚、通知或补救；风险可降低、接受、转移或避免。',
    'Elegir lanzamiento completo, piloto limitado, pausa por mercado, reducción de permisos, aprobación humana, cambio de proveedor, despliegue privado, pausa, reversión, notificación o reparación. Los riesgos pueden mitigarse, aceptarse, transferirse o evitarse.',
    'Escolher lançamento amplo, piloto limitado, suspensão por mercado, redução de permissões, aprovação humana, troca de fornecedor, implantação privada, pausa, reversão, notificação ou reparação. Os riscos podem ser mitigados, aceitos, transferidos ou evitados.',
  ),
  'rmf.manage.question': t(
    '基于现有证据，现在采取什么行动？什么条件会触发不同决策？',
    'Según la evidencia, ¿qué acción se toma ahora y qué activaría una decisión diferente?',
    'Com base nas evidências, que ação deve ser tomada agora e o que acionaria uma decisão diferente?',
  ),
  'rmf.core.cycle': t(
    '新的场景、事故、模型变化、供应商、市场或证据都会重新开启循环。',
    'Un nuevo contexto, incidentes, cambios de modelo, proveedores, mercados o evidencia reabren el ciclo.',
    'Novo contexto, incidentes, mudanças de modelo, fornecedores, mercados ou evidências reabrem o ciclo.',
  ),

  'rmf.evidence.eyebrow': t('先证据，后推论', 'Evidencia antes que inferencia', 'Evidência antes da inferência'),
  'rmf.evidence.title': t('哪些是公开披露，哪些是分析建议', 'Qué se divulga y qué se propone', 'O que foi divulgado e o que é proposto'),
  'rmf.evidence.intro': t(
    '公开材料可以证明产品功能和公司自述的治理实践，但仅凭这些材料无法证明落地质量、控制有效性或全面合规。',
    'Las divulgaciones públicas pueden establecer funciones del producto y prácticas de gobernanza declaradas. Por sí solas no prueban la calidad de implantación, la eficacia de controles ni el cumplimiento integral.',
    'Divulgações públicas podem estabelecer funções do produto e práticas de governança declaradas. Por si só, não provam a qualidade da implementação, a eficácia dos controles nem a conformidade abrangente.',
  ),
  'rmf.evidence.public.label': t('公开披露的证据', 'Evidencia informada públicamente', 'Evidência informada publicamente'),
  'rmf.evidence.public.title': t('治理与产品控制的公开基线', 'Una base de gobernanza y controles de producto', 'Uma base de governança e controles de produto'),
  'rmf.evidence.public.text': t(
    '腾讯公开描述的负责任 AI 治理覆盖隐私、数据安全、算法公平、防止滥用、全生命周期风险响应以及向用户说明能力边界。针对特定产品模式，WorkBuddy 文档描述了工作空间、确认模式、隔离、访问控制、加密和管理日志；CodeBuddy CLI 文档描述了细粒度权限和可选沙箱。腾讯 2026 年 7 月发布的 Hy3 材料还描述了多产品接入以及通过 TokenHub 提供 API。',
    'Tencent describe públicamente una gobernanza de IA responsable que abarca privacidad, seguridad de datos, equidad algorítmica, prevención del abuso, respuesta al riesgo durante el ciclo de vida y comunicación de límites. Para modos de producto concretos, la documentación de WorkBuddy describe espacios de trabajo, confirmaciones, aislamiento, control de acceso, cifrado y registros administrativos; la de CodeBuddy CLI describe permisos granulares y sandbox opcional. El lanzamiento de Hy3 de julio de 2026 describe su uso en varios productos y acceso por API mediante TokenHub.',
    'A Tencent descreve publicamente uma governança de IA responsável que abrange privacidade, segurança de dados, equidade algorítmica, prevenção de uso indevido, resposta a riscos no ciclo de vida e comunicação de limites. Para modos específicos, a documentação do WorkBuddy descreve espaços de trabalho, confirmações, isolamento, controle de acesso, criptografia e registros administrativos; a do CodeBuddy CLI descreve permissões granulares e sandbox opcional. O lançamento do Hy3 em julho de 2026 descreve uso em vários produtos e acesso por API via TokenHub.',
  ),
  'rmf.evidence.proposed.label': t('Atlas 运营建议', 'Propuesta operativa de Atlas', 'Proposta operacional do Atlas'),
  'rmf.evidence.proposed.title': t('跨产品的共同决策层', 'Una capa común de decisión entre productos', 'Uma camada comum de decisão entre produtos'),
  'rmf.evidence.proposed.text': t(
    '下文的集团清单、风险分级、RACI、提供者—部署者责任模型、示例指标和上线门槛均为分析建议，不代表腾讯未公开的内部机制，也不等于发现了控制缺口。',
    'El inventario grupal, los niveles de riesgo, RACI, el modelo de responsabilidad proveedor–desplegador, las métricas de ejemplo y los controles de lanzamiento son recomendaciones analíticas. No describen el diseño interno no divulgado de Tencent ni identifican una deficiencia de control.',
    'O inventário do grupo, os níveis de risco, o RACI, o modelo de responsabilidade provedor–implantador, as métricas de exemplo e os critérios de lançamento são recomendações analíticas. Não descrevem o desenho interno não divulgado da Tencent nem identificam uma lacuna de controle.',
  ),

  'rmf.group.eyebrow': t('建议的集团级 GOVERN', 'GOVERN grupal propuesto', 'GOVERN proposto em nível de grupo'),
  'rmf.group.title': t('一套共同底座，按风险增强', 'Una base operativa que aumenta con el riesgo', 'Uma base operacional que aumenta com o risco'),
  'rmf.group.intro': t(
    '多元化产品组合需要共同的最低标准，同时保留针对具体用途的测试和市场决策。',
    'Una cartera diversa necesita un estándar mínimo común y, a la vez, pruebas específicas por caso de uso y decisiones por mercado.',
    'Um portfólio diverso precisa de um padrão mínimo comum, preservando testes por caso de uso e decisões por mercado.',
  ),
  'rmf.group.inventory.title': t('AI 系统清单', 'Inventario de IA', 'Inventário de IA'),
  'rmf.group.inventory.text': t(
    '记录产品、模型和供应商、数据、工具、用户与市场、产品及技术负责人、风险负责人、当前阶段、最近评估和下次复核。',
    'Registrar producto, modelo y proveedor, datos, herramientas, usuarios y mercados, responsables de producto y técnica, responsable de riesgo, fase actual, última evaluación y próxima revisión.',
    'Registrar produto, modelo e fornecedor, dados, ferramentas, usuários e mercados, responsáveis de produto e técnica, responsável por risco, estágio atual, última avaliação e próxima revisão.',
  ),
  'rmf.group.tiers.title': t('风险分级', 'Niveles de riesgo', 'Níveis de risco'),
  'rmf.group.tiers.text': t(
    '示例：Level 1 为内部辅助；Level 2 为面向消费者的内容生成；Level 3 为访问企业数据或调用工具；Level 4 涉及金融、未成年人、重大权益或不可逆操作。风险越高，证据和审批门槛越强。',
    'Ejemplo: Level 1, asistencia interna; Level 2, generación para consumidores; Level 3, acceso a datos empresariales o herramientas; Level 4, finanzas, menores, derechos relevantes o acciones irreversibles. A mayor riesgo, mayor evidencia y control de aprobación.',
    'Exemplo: Level 1, assistência interna; Level 2, geração para consumidores; Level 3, acesso a dados empresariais ou ferramentas; Level 4, finanças, menores, direitos relevantes ou ações irreversíveis. Quanto maior o risco, mais fortes as evidências e aprovações.',
  ),
  'rmf.group.raci.text': t(
    '针对预期用途、技术控制、法律适用性、安全测试、政策解释和风险接受，明确谁负责执行、谁最终问责、咨询谁以及告知谁。',
    'Asignar quién es Responsable, Aprobador, Consultado e Informado respecto del uso previsto, controles técnicos, aplicabilidad jurídica, pruebas de seguridad, interpretación normativa y aceptación del riesgo.',
    'Definir quem é Responsável, Aprovador, Consultado e Informado sobre uso previsto, controles técnicos, aplicabilidade jurídica, testes de segurança, interpretação de políticas e aceitação de risco.',
  ),
  'rmf.role.product': t('定义预期用途、受影响用户、业务价值、误用方式和产品负责人。', 'Definir uso previsto, usuarios afectados, valor empresarial, uso indebido y responsable de producto.', 'Definir uso previsto, usuários afetados, valor de negócio, uso indevido e responsável pelo produto.'),
  'rmf.role.engineering': t('实现权限、隔离、日志、评估接口、回滚和运营控制。', 'Implantar permisos, aislamiento, registros, puntos de evaluación, reversión y controles operativos.', 'Implementar permissões, isolamento, registros, pontos de avaliação, reversão e controles operacionais.'),
  'rmf.role.legal': t('判断法律适用性、所需审核、文档要求和不同市场的限制。', 'Determinar aplicabilidad jurídica, revisión necesaria, documentación y restricciones por mercado.', 'Determinar aplicabilidade jurídica, revisão necessária, documentação e restrições por mercado.'),
  'rmf.role.security': t('测试对抗路径，验证事故处理，并负责安全升级。', 'Probar vías adversariales, validar la gestión de incidentes y asumir el escalado de seguridad.', 'Testar caminhos adversariais, validar a resposta a incidentes e assumir a escalada de segurança.'),
  'rmf.role.policy': t('监测政策，把外部预期转化为证据问题，并区分事实、推论和政策立场。', 'Supervisar políticas, convertir expectativas externas en preguntas de evidencia y distinguir hecho, inferencia y posición pública.', 'Monitorar políticas, converter expectativas externas em perguntas de evidência e distinguir fato, inferência e posição pública.'),
  'rmf.role.management': t('批准高风险上线条件，并作出明确且带日期的风险接受决定。', 'Autorizar condiciones de lanzamiento de alto riesgo y tomar decisiones explícitas y fechadas de aceptación.', 'Autorizar condições de lançamento de alto risco e tomar decisões explícitas e datadas de aceitação.'),

  'rmf.surfaces.eyebrow': t('按产品界面开展 MAP', 'MAP por superficie de producto', 'MAP por superfície de produto'),
  'rmf.surfaces.title': t('同一个模型会产生不同风险', 'El mismo modelo puede crear riesgos diferentes', 'O mesmo modelo pode criar riscos diferentes'),
  'rmf.surfaces.intro': t(
    '基础模型评估不能代替每个下游产品的真实场景。每种产品都需要单独识别参与者、权限、潜在伤害、指标和决策选项。',
    'La evaluación de un modelo fundacional no sustituye el contexto de cada producto posterior. Cada superficie necesita sus propios actores, permisos, daños, medidas y opciones de decisión.',
    'A avaliação de um modelo fundacional não substitui o contexto de cada produto downstream. Cada superfície precisa de seus próprios atores, permissões, danos, medidas e opções de decisão.',
  ),
  'rmf.surface.agent.type': t('企业智能体', 'Agentes empresariales', 'Agentes empresariais'),
  'rmf.surface.agent.map': t(
    '它能访问哪些文件、工具、系统、模型和其他智能体？权限是临时还是持续？哪些动作必须由人确认？数据如何在供应商和工作空间之间流动？',
    '¿A qué archivos, herramientas, sistemas, modelos y otros agentes puede acceder? ¿Los permisos son temporales o persistentes? ¿Qué acciones requieren confirmación humana? ¿Cómo fluyen los datos entre proveedores y espacios de trabajo?',
    'Quais arquivos, ferramentas, sistemas, modelos e outros agentes podem ser acessados? As permissões são temporárias ou persistentes? Quais ações exigem confirmação humana? Como os dados circulam entre fornecedores e espaços de trabalho?',
  ),
  'rmf.surface.agent.measure': t(
    '任务完成率、越权操作率、审批绕过率、工具调用轨迹完整率、人工纠正率、回滚成功率、敏感数据暴露率，以及每个成功结果的成本。',
    'Éxito de tareas, acciones no autorizadas, evasión de aprobación, integridad de trazas de herramientas, corrección humana, éxito de reversión, exposición de datos sensibles y coste por resultado satisfactorio.',
    'Sucesso de tarefas, ações não autorizadas, contorno de aprovação, integridade do rastro de ferramentas, correção humana, sucesso de reversão, exposição de dados sensíveis e custo por resultado bem-sucedido.',
  ),
  'rmf.surface.agent.manage': t(
    '缩小工具范围，对不可逆步骤要求确认，隔离高风险工作空间，限制供应商访问，向选定用户试点，或暂停并回滚。',
    'Reducir el alcance de herramientas, exigir confirmación para pasos irreversibles, aislar espacios de alto riesgo, limitar el acceso de proveedores, pilotar con usuarios seleccionados o pausar y revertir.',
    'Reduzir o escopo de ferramentas, exigir confirmação para etapas irreversíveis, isolar espaços de alto risco, limitar acesso de fornecedores, fazer piloto com usuários selecionados ou pausar e reverter.',
  ),
  'rmf.surface.cloud.type': t('云与模型 API', 'Nube y API de modelos', 'Nuvem e APIs de modelos'),
  'rmf.surface.cloud.map': t(
    '腾讯在该场景中是模型提供者、平台提供者、应用设计者还是部署支持方？数据在哪里处理？由谁选择用途、地区、工具和下游控制？',
    '¿Tencent actúa como proveedor de modelo, plataforma, diseñador de aplicación o apoyo al despliegue? ¿Dónde se procesan los datos? ¿Quién elige el caso de uso, la región, las herramientas y los controles posteriores?',
    'A Tencent atua como provedora de modelo, plataforma, designer da aplicação ou suporte à implantação? Onde os dados são processados? Quem escolhe o caso de uso, a região, as ferramentas e os controles downstream?',
  ),
  'rmf.surface.cloud.measure': t(
    '分别评估模型与平台证据和客户应用证据；测试路由、供应商回退、数据处理、工具供应链和特定用途表现。',
    'Evaluar por separado la evidencia del modelo y la plataforma y la de la aplicación del cliente; probar enrutamiento, respaldo de proveedores, tratamiento de datos, cadena de herramientas y desempeño específico del uso.',
    'Avaliar separadamente as evidências do modelo e da plataforma e as da aplicação do cliente; testar roteamento, fallback de fornecedores, tratamento de dados, cadeia de ferramentas e desempenho específico do uso.',
  ),
  'rmf.surface.cloud.manage': t(
    '采用提供者—部署者责任模型，设置市场和行业条件、限制工具访问、要求客户提供证据，或为敏感场景采用私有化部署。',
    'Usar un modelo de responsabilidad proveedor–desplegador, condiciones por mercado y sector, acceso restringido a herramientas, requisitos de evidencia del cliente o despliegue privado para contextos sensibles.',
    'Usar um modelo de responsabilidade provedor–implantador, condições por mercado e setor, acesso restrito a ferramentas, requisitos de evidência do cliente ou implantação privada em contextos sensíveis.',
  ),
  'rmf.surface.content.type': t('游戏与内容', 'Juegos y contenido', 'Jogos e conteúdo'),
  'rmf.surface.content.title': t('NPC、生成媒体、UGC 与处罚机制', 'NPC, medios generados, UGC y medidas disciplinarias', 'NPCs, mídia gerada, UGC e medidas disciplinares'),
  'rmf.surface.content.map': t(
    '区分娱乐性 NPC 与推荐、匹配、审核、反作弊或处罚账号的系统；识别未成年人、AI 标识、冒充、知识产权和模型生成内容与玩家内容的边界。',
    'Distinguir NPC de entretenimiento de sistemas que recomiendan, emparejan, moderan, detectan trampas o penalizan cuentas. Mapear menores, divulgación de IA, suplantación, propiedad intelectual y contenido generado frente a contenido de usuarios.',
    'Distinguir NPCs de entretenimento de sistemas que recomendam, fazem pareamento, moderam, detectam trapaça ou penalizam contas. Mapear menores, identificação de IA, personificação, propriedade intelectual e conteúdo gerado versus conteúdo de usuários.',
  ),
  'rmf.surface.content.measure': t(
    '衡量有害内容发生率、标识覆盖率、事实错误、身份混淆、投诉、纠正成功率，以及推荐或处罚造成的差异化影响。',
    'Medir contenido dañino, cobertura de etiquetas, errores fácticos, confusión de identidad, quejas, corrección satisfactoria e impacto diferencial de recomendación o medidas disciplinarias.',
    'Medir conteúdo nocivo, cobertura de identificação, erros factuais, confusão de identidade, reclamações, correção bem-sucedida e impacto diferencial de recomendação ou medidas disciplinares.',
  ),
  'rmf.surface.content.manage': t(
    '把创意功能与会产生重大后果的控制分开；加强未成年人或账号操作的审核，调整标识，限制生成，或增加申诉与恢复路径。',
    'Separar controles creativos de los que producen consecuencias; reforzar revisión para menores o acciones sobre cuentas, cambiar etiquetas, limitar generación o añadir apelación y restauración.',
    'Separar controles criativos daqueles com consequências; reforçar a revisão para menores ou ações sobre contas, mudar a identificação, limitar a geração ou adicionar recurso e restauração.',
  ),
  'rmf.surface.social.type': t('通信与社交', 'Comunicación y entorno social', 'Comunicação e social'),
  'rmf.surface.social.title': t('消息、身份、推荐与用户控制', 'Mensajería, identidad, recomendación y control del usuario', 'Mensagens, identidade, recomendação e controle do usuário'),
  'rmf.surface.social.map': t(
    '如果 AI 扩展到通信或社交功能，应识别私人数据使用、真人与 AI 身份、冒充、诈骗和深度伪造、有害内容放大、用户关闭与纠正，以及不同国家的差异。',
    'Si la IA se amplía a funciones de comunicación o sociales, mapear uso de datos privados, identidad humana frente a IA, suplantación, fraude y deepfakes, amplificación de contenido dañino, exclusión y corrección por el usuario y diferencias nacionales.',
    'Se a IA se expandir para funções de comunicação ou sociais, mapear uso de dados privados, identidade humana versus IA, personificação, fraude e deepfakes, amplificação de conteúdo nocivo, desativação e correção pelo usuário e diferenças entre países.',
  ),
  'rmf.surface.social.measure': t(
    '测试隐私泄露、身份混淆、诈骗和冒充路径、举报与纠正成功率、推荐影响，以及在超大用户规模下的表现。',
    'Probar filtración de privacidad, confusión de identidad, vías de fraude y suplantación, éxito de reporte y corrección, efectos de recomendación y desempeño a escala muy grande.',
    'Testar vazamento de privacidade, confusão de identidade, caminhos de fraude e personificação, sucesso de denúncia e correção, efeitos de recomendação e desempenho em escala muito grande.',
  ),
  'rmf.surface.social.manage': t(
    '按市场或人群限制功能，增加来源标识和用户控制，约束敏感数据访问，加强滥用响应，或在证据充足前暂缓能力。',
    'Limitar funciones por mercado o audiencia, añadir procedencia y controles del usuario, restringir datos sensibles, reforzar respuesta al abuso o aplazar capacidades hasta contar con evidencia suficiente.',
    'Limitar funções por mercado ou público, adicionar procedência e controles do usuário, restringir dados sensíveis, reforçar a resposta a abuso ou adiar capacidades até haver evidências suficientes.',
  ),
  'rmf.surface.fintech.title': t('欺诈、画像、建议、限制与交易', 'Fraude, perfiles, asesoramiento, restricciones y transacciones', 'Fraude, perfis, orientação, restrições e transações'),
  'rmf.surface.fintech.map': t(
    'AI 是辅助员工，还是直接影响资金、访问权限、资格或权益？错误结果会造成什么伤害？哪些群体可能受到不同影响？谁承担最终的人类责任？',
    '¿La IA asiste a una persona o afecta directamente fondos, acceso, elegibilidad o derechos? ¿Qué daño causa un resultado falso, quién recibe un impacto diferente y quién conserva la responsabilidad humana final?',
    'A IA auxilia uma pessoa ou afeta diretamente fundos, acesso, elegibilidade ou direitos? Qual é o dano de um resultado falso, quem é afetado de forma diferente e quem mantém a responsabilidade humana final?',
  ),
  'rmf.surface.fintech.measure': t(
    '假阳性与假阴性、不同群体的差异化影响、人工复核推翻率、申诉时间、严重错误数量，以及解释能否真正支持复核。',
    'Falsos positivos y negativos, impacto diferencial, tasa de revocación en revisión humana, tiempo de apelación, errores graves y si las explicaciones apoyan realmente la revisión.',
    'Falsos positivos e negativos, impacto diferencial, taxa de reversão em revisão humana, tempo de recurso, erros graves e se as explicações realmente apoiam a revisão.',
  ),
  'rmf.surface.fintech.manage': t(
    '对重大后果操作保留人工审批，缩小自动化权限，增加通知与申诉，提高证据门槛，开展受控试点，或避免该用途。',
    'Mantener aprobación humana para acciones de consecuencias relevantes, reducir autoridad automatizada, añadir aviso y apelación, elevar el umbral de evidencia, ejecutar un piloto controlado o evitar el uso.',
    'Manter aprovação humana para ações com consequências relevantes, reduzir autoridade automatizada, adicionar aviso e recurso, elevar o limiar de evidência, executar piloto controlado ou evitar o uso.',
  ),

  'rmf.options.eyebrow': t('MANAGE 是决策组合', 'MANAGE es una cartera de decisiones', 'MANAGE é um portfólio de decisões'),
  'rmf.options.title': t('不只有“上线”或“停止”', 'Más opciones que lanzar o detener', 'Mais opções do que lançar ou parar'),
  'rmf.options.intro': t(
    '全球决策应匹配具体产品、功能、用户和市场，不能假定一次批准覆盖所有部署。',
    'Una decisión global debe corresponder al producto, función, usuario y mercado; no suponer que una aprobación cubre todos los despliegues.',
    'Uma decisão global deve corresponder ao produto, função, usuário e mercado; não presumir que uma aprovação cobre todas as implantações.',
  ),
  'rmf.option.scale': t('低风险用途扩大上线；高风险用途仅向选定用户试点。', 'Escalar usos de bajo riesgo; pilotar usos de alto riesgo con usuarios seleccionados.', 'Escalar usos de baixo risco; pilotar usos de alto risco com usuários selecionados.'),
  'rmf.option.market': t('在特定市场或行业暂缓或调整功能。', 'Retener o modificar la función en mercados o sectores concretos.', 'Suspender ou modificar a função em mercados ou setores específicos.'),
  'rmf.option.permission': t('缩小智能体工具、数据范围、权限时长或不可逆操作权限。', 'Reducir herramientas, alcance de datos, duración o autoridad irreversible del agente.', 'Reduzir ferramentas, escopo de dados, duração ou autoridade irreversível do agente.'),
  'rmf.option.human': t('增加人工审批、复核、通知、申诉或补救。', 'Añadir aprobación humana, revisión, aviso, apelación o reparación.', 'Adicionar aprovação humana, revisão, aviso, recurso ou reparação.'),
  'rmf.option.supplier': t('更换模型、数据来源、工具、路由或供应商。', 'Cambiar modelos, fuentes de datos, herramientas, enrutamiento o proveedores.', 'Mudar modelos, fontes de dados, ferramentas, roteamento ou fornecedores.'),
  'rmf.option.deployment': t('对敏感场景采用专属或私有化部署。', 'Usar despliegue dedicado o privado para contextos sensibles.', 'Usar implantação dedicada ou privada em contextos sensíveis.'),
  'rmf.option.incident': t('暂停功能、控制事故、回滚、恢复并通知。', 'Pausar la función, contener el incidente, revertir, recuperar y notificar.', 'Pausar a função, conter o incidente, reverter, recuperar e notificar.'),
  'rmf.option.review': t('明确负责人、证据门槛、复核日期和重新开启决策的触发条件。', 'Fijar responsable, umbral de evidencia, fecha de revisión y activador para reabrir la decisión.', 'Definir responsável, critério de evidência, data de revisão e gatilho para reabrir a decisão.'),

  'rmf.policy.eyebrow': t('Global AI Policy 接口', 'Interfaz de Global AI Policy', 'Interface de Global AI Policy'),
  'rmf.policy.title': t('把外部信号连接到内部证据', 'Conectar señales externas con evidencia interna', 'Conectar sinais externos a evidências internas'),
  'rmf.policy.intro': t(
    '政策职能不需要亲自执行每项技术测试，但必须提出正确问题，判断证据是否足以支持对外说法和上线建议，并让决策责任保持明确。',
    'La función de políticas no necesita ejecutar cada prueba técnica. Debe formular las preguntas correctas, evaluar si la evidencia respalda afirmaciones externas y recomendaciones de lanzamiento, y mantener explícita la responsabilidad decisoria.',
    'A função de políticas não precisa executar cada teste técnico. Precisa formular as perguntas certas, avaliar se as evidências sustentam afirmações externas e recomendações de lançamento e manter explícita a responsabilidade decisória.',
  ),
  'rmf.policy.govern': t(
    '把全球预期转化为共同原则、风险分级、角色定义、内部政策和有边界的对外承诺。',
    'Traducir expectativas globales en principios comunes, niveles de riesgo, funciones, política interna y compromisos externos acotados.',
    'Traduzir expectativas globais em princípios comuns, níveis de risco, papéis, política interna e compromissos externos delimitados.',
  ),
  'rmf.policy.map': t(
    '针对国际化产品，研究产品能力、目标市场、受影响人群、适用规则以及政府和社会可能关注的问题。',
    'Para un producto internacional, investigar capacidades, mercados objetivo, personas afectadas, reglas aplicables y posibles preocupaciones públicas o gubernamentales.',
    'Para um produto internacional, pesquisar capacidades, mercados-alvo, pessoas afetadas, regras aplicáveis e possíveis preocupações públicas ou governamentais.',
  ),
  'rmf.policy.measure': t(
    '询问测试了什么、控制是否受到挑战、指标是否符合真实场景，以及哪些风险仍无法测量。',
    'Preguntar qué se probó, si los controles se sometieron a desafío, si las métricas reflejan el contexto real y qué riesgos siguen sin poder medirse.',
    'Perguntar o que foi testado, se os controles foram desafiados, se as métricas refletem o contexto real e quais riscos ainda não podem ser medidos.',
  ),
  'rmf.policy.manage': t(
    '形成受来源边界约束的高管简报、上线建议、利益相关方沟通、政策立场、负责人地图和带日期的后续行动。',
    'Producir un informe ejecutivo limitado por fuentes, recomendación de lanzamiento, mensajes para partes interesadas, posición normativa, mapa de responsables y acciones posteriores fechadas.',
    'Produzir um resumo executivo limitado pelas fontes, recomendação de lançamento, mensagens a stakeholders, posição de política, mapa de responsáveis e ações de acompanhamento datadas.',
  ),
  'rmf.policy.conclusion': t(
    'Global AI Policy 把外部政策信号输入 AI 风险管理循环，再把内部治理证据转化为外部利益相关方能够理解和信任的表达。',
    'Global AI Policy convierte señales externas en insumos para el ciclo de gestión de riesgos de IA y traduce evidencia interna de gobernanza en afirmaciones comprensibles y confiables para las partes externas.',
    'Global AI Policy transforma sinais externos em insumos para o ciclo de gestão de riscos de IA e traduz evidências internas de governança em afirmações compreensíveis e confiáveis para stakeholders externos.',
  ),

  'rmf.sources.eyebrow': t('官方证据目录', 'Registro oficial de evidencia', 'Registro oficial de evidências'),
  'rmf.sources.title': t('本页使用的一手来源', 'Fuentes primarias utilizadas en esta página', 'Fontes primárias usadas nesta página'),
  'rmf.sources.note': t(
    '状态和产品资料核查于 2026-08-07。腾讯材料仅作为公司公开披露的证据；NIST 框架语言作为自愿指南。所有界面语言均保留规范链接与官方标题。',
    'Estado y referencias de producto comprobados el 2026-08-07. Las declaraciones de Tencent se tratan como evidencia informada por la empresa y el marco NIST como guía voluntaria. Los enlaces y títulos oficiales permanecen canónicos en todos los idiomas.',
    'Status e referências de produto verificados em 2026-08-07. Declarações da Tencent são tratadas como evidências informadas pela empresa e o framework NIST como orientação voluntária. Links e títulos oficiais permanecem canônicos em todos os idiomas.',
  ),
  'rmf.sources.methodology': t('返回完整研究方法', 'Volver a la metodología completa', 'Voltar à metodologia completa'),
  'rmf.sources.brief': t('打开公开信息影响简报', 'Abrir el informe de implicaciones de información pública', 'Abrir o resumo de implicações de informações públicas'),
};
