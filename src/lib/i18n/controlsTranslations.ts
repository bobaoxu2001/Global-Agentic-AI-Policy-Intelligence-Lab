export const CONTROLS_TRANSLATIONS: Record<string, { zh: string; es: string; pt: string }> = {
  'controls.title': {
    zh: '政策到控制措施映射器',
    es: 'Mapeador de políticas a controles',
    pt: 'Mapeador de políticas para controles',
  },
  'controls.note': {
    zh: '控制措施目录（K 系列，SPEC §15.3）。每一项都是 ● 建议类成果：包含面向工程团队的实施说明、面向审计团队的验证方法，以及适用时的 ADRS 缓解类别。',
    es: 'Catálogo de controles (serie K, SPEC §15.3). Cada entrada es un artefacto de clase ● recomendación: notas de implementación para ingeniería, método de verificación para auditoría y, cuando corresponde, clase de mitigación ADRS.',
    pt: 'Catálogo de controles (série K, SPEC §15.3). Cada item é um artefato de classe ● recomendação: notas de implementação para engenharia, método de verificação para auditoria e, quando aplicável, classe de mitigação ADRS.',
  },
  'controls.boundary': {
    zh: '衍生控制措施是实施建议，并非法律条文的直接要求。',
    es: 'Los controles derivados son recomendaciones de implementación, no requisitos establecidos directamente por ley.',
    pt: 'Os controlos derivados são recomendações de implementação, não requisitos estabelecidos diretamente por lei.',
  },
  'controls.empty': { zh: '此配置中没有控制措施。', es: 'No hay controles en este perfil.', pt: 'Não há controles neste perfil.' },
  'controls.category.technical': { zh: '技术控制', es: 'Controles técnicos', pt: 'Controles técnicos' },
  'controls.category.process': { zh: '流程控制', es: 'Controles de proceso', pt: 'Controles de processo' },
  'controls.category.organizational': { zh: '组织控制', es: 'Controles organizativos', pt: 'Controles organizacionais' },
  'controls.category.documentation': { zh: '文档控制', es: 'Controles documentales', pt: 'Controles de documentação' },
  'controls.implement': { zh: '实施：', es: 'Implementar:', pt: 'Implementar:' },
  'controls.verify': { zh: '验证：', es: 'Verificar:', pt: 'Verificar:' },
  'controls.driving': { zh: '政策依据 / 衍生治理映射：', es: 'Justificación de política / mapeo de gobernanza derivado:', pt: 'Fundamento de política / mapeamento de governação derivado:' },

  'control.K01.name': { zh: '工具执行边界的审批门槛', es: 'Puerta de aprobación en el límite de ejecución de herramientas', pt: 'Aprovação no limite de execução de ferramentas' },
  'control.K01.description': {
    zh: '任何会产生实际影响的工具调用执行前，都必须由架构强制进行人工审批；并通过审批率限制和抽样审计防止机械盖章。',
    es: 'Aprobación humana impuesta por la arquitectura antes de ejecutar cualquier llamada con efectos; incluye límites de tasa y auditorías por muestreo para evitar aprobaciones automáticas.',
    pt: 'Aprovação humana imposta pela arquitetura antes de qualquer chamada com efeito; inclui limites de taxa e auditorias por amostragem para evitar aprovações automáticas.',
  },
  'control.K01.implementation': {
    zh: '审批门位于规划器输出与工具运行时之间，而不是写在提示词里；审批记录将 approver_id 和 policy_id 写入行动日志。',
    es: 'La puerta se sitúa entre la salida del planificador y el entorno de ejecución, no en el prompt; las aprobaciones incorporan approver_id y policy_id al registro de acciones.',
    pt: 'A aprovação fica entre a saída do planejador e o runtime da ferramenta, não no prompt; as aprovações levam approver_id e policy_id ao log de ações.',
  },
  'control.K01.verification': {
    zh: '在预发布环境中尝试未经审批的高影响调用——必须由运行时而非模型层阻止；并审计审批延迟分布以识别机械盖章。',
    es: 'Intentar una llamada con efectos sin aprobación en staging: debe bloquearla el runtime, no el modelo; auditar la distribución de latencia para detectar aprobaciones automáticas.',
    pt: 'Tentar uma chamada com efeito sem aprovação em staging: o runtime, e não o modelo, deve bloqueá-la; auditar a latência de aprovação para detectar automatismo.',
  },

  'control.K02.name': { zh: '按任务签发凭证', es: 'Emisión de credenciales por tarea', pt: 'Emissão de credenciais por tarefa' },
  'control.K02.description': { zh: '每次调用签发短期、任务范围内的凭证；智能体不持有长期写权限凭证。', es: 'Credenciales de corta duración y alcance limitado a la tarea por invocación; el agente no conserva credenciales permanentes de escritura.', pt: 'Credenciais de curta duração e escopo limitado à tarefa por invocação; o agente não mantém credenciais permanentes de escrita.' },
  'control.K02.implementation': { zh: '代理服务以任务上下文换取范围受限的令牌；有效期按分钟而非按天计算。', es: 'Un servicio intermediario canjea el contexto de la tarea por tokens limitados; la vigencia es de minutos, no días.', pt: 'Um serviço intermediário troca o contexto da tarefa por tokens restritos; a validade é de minutos, não dias.' },
  'control.K02.verification': { zh: '清点智能体身份持有的长期凭证——具有写权限的数量必须为零。', es: 'Inventariar credenciales permanentes de identidades de agente: debe haber cero con permisos de escritura.', pt: 'Inventariar credenciais permanentes de identidades de agente: deve haver zero com permissão de escrita.' },

  'control.K03.name': { zh: '默认拒绝的工具注册表', es: 'Registro de herramientas con denegación por defecto', pt: 'Registro de ferramentas com negação por padrão' },
  'control.K03.description': { zh: '智能体只能调用版本化注册表中明确授权的工具；未知工具在运行时被拒绝。', es: 'Los agentes solo pueden invocar herramientas concedidas explícitamente en un registro versionado; las desconocidas se rechazan en tiempo de ejecución.', pt: 'Os agentes só podem invocar ferramentas explicitamente concedidas em um registro versionado; ferramentas desconhecidas são recusadas no runtime.' },
  'control.K03.implementation': { zh: '注册项声明读写范围、影响半径类别和责任团队；授权变更必须经过 K10 变更管理。', es: 'Cada entrada declara alcance de lectura/escritura, clase de radio de impacto y equipo propietario; las concesiones requieren gestión de cambios K10.', pt: 'Cada entrada declara escopo de leitura/escrita, classe de raio de impacto e equipe responsável; concessões exigem gestão de mudanças K10.' },
  'control.K03.verification': { zh: '在预发布环境调用未注册工具——运行时必须拒绝；并比对注册表与实际部署授权。', es: 'Invocar una herramienta no registrada en staging: el runtime debe rechazarla; comparar el registro con las concesiones desplegadas.', pt: 'Invocar uma ferramenta não registrada em staging: o runtime deve recusá-la; comparar o registro com as concessões implantadas.' },

  'control.K04.name': { zh: '不可变行动审计日志', es: 'Registro de auditoría inmutable de acciones', pt: 'Log imutável de auditoria de ações' },
  'control.K04.description': { zh: '所有工具调用、外发消息、决策、委派和记忆写入均以追加方式记录，并带有跟踪 ID（schema SPEC §18.5）。', es: 'Toda llamada, mensaje saliente, decisión, delegación y escritura de memoria se registra de forma append-only con identificador de trazabilidad (schema SPEC §18.5).', pt: 'Toda chamada, mensagem externa, decisão, delegação e gravação de memória é registrada de forma append-only com ID de rastreamento (schema SPEC §18.5).' },
  'control.K04.implementation': { zh: '在工具运行时边界记录，而不是依赖模型自报；包括主体、授权模式、输入输出摘要、数据类别与可逆性。', es: 'Registrar en el límite del runtime, no mediante autodeclaración del modelo; incluir principal, modo de autorización, resúmenes de entrada/salida, categorías de datos y reversibilidad.', pt: 'Registrar no limite do runtime, não por autorrelato do modelo; incluir principal, modo de autorização, resumos de entrada/saída, categorias de dados e reversibilidade.' },
  'control.K04.verification': { zh: '仅凭日志重建完整的智能体过程；尝试篡改时，存储必须保持 WORM/只追加属性。', es: 'Reconstruir un episodio completo solo desde el registro; al intentar manipularlo, el almacenamiento debe ser WORM/append-only.', pt: 'Reconstruir um episódio completo apenas pelo log; ao tentar adulterá-lo, o armazenamento deve ser WORM/append-only.' },

  'control.K05.name': { zh: '影响半径限制器', es: 'Limitador del radio de impacto', pt: 'Limitador do raio de impacto' },
  'control.K05.description': { zh: '在模型外部强制限制每个时间窗口内的行动数量、价值和主机数量。', es: 'Límites estrictos de acciones por ventana —cantidad, valor y hosts— aplicados fuera del modelo.', pt: 'Limites rígidos de ações por janela —quantidade, valor e hosts— aplicados fora do modelo.' },
  'control.K05.implementation': { zh: '限制写在工具运行时配置中；超限会停止智能体并通知负责人。', es: 'Los límites residen en la configuración del runtime; una infracción detiene al agente y alerta al responsable.', pt: 'Os limites ficam na configuração do runtime; uma violação interrompe o agente e alerta o responsável.' },
  'control.K05.verification': { zh: '在预发布环境中进行超限压力测试——额外行动必须被拒绝并触发告警。', es: 'Probar en staging más allá del límite: las acciones excedentes deben rechazarse y generar alerta.', pt: 'Testar em staging além do limite: ações excedentes devem ser recusadas e gerar alerta.' },

  'control.K06.name': { zh: '经过测试的紧急停止开关', es: 'Interruptor de emergencia probado', pt: 'Botão de emergência testado' },
  'control.K06.description': { zh: '单一操作可停止所有智能体执行并撤销其凭证；按计划定期测试。', es: 'Una sola operación detiene toda ejecución del agente y revoca sus credenciales; se prueba periódicamente.', pt: 'Uma única operação interrompe toda execução do agente e revoga suas credenciais; é testada periodicamente.' },
  'control.K06.implementation': { zh: '停止意味着撤销注册表授权并拒绝凭证代理服务，而不仅是终止进程。', es: 'Detener significa revocar concesiones del registro y denegar el intermediario de credenciales, no solo parar el proceso.', pt: 'Interromper significa revogar concessões do registro e negar o broker de credenciais, não apenas parar o processo.' },
  'control.K06.verification': { zh: '每季度演练：测量停止所需时间，并确认激活后没有执行中的高影响调用完成。', es: 'Simulacro trimestral: medir el tiempo hasta la detención y confirmar que ninguna llamada con efectos en curso termina tras activarlo.', pt: 'Exercício trimestral: medir o tempo até a interrupção e confirmar que nenhuma chamada com efeito em curso termina após a ativação.' },

  'control.K07.name': { zh: '上下文组装中的个人信息脱敏', es: 'Redacción de datos personales al ensamblar contexto', pt: 'Redação de dados pessoais na montagem do contexto' },
  'control.K07.description': { zh: '个人数据进入模型上下文前被过滤或最小化；记忆设有保留期限和清除接口。', es: 'Los datos personales se filtran o minimizan antes del contexto del modelo; la memoria tiene límites de retención y API de borrado.', pt: 'Dados pessoais são filtrados ou minimizados antes do contexto do modelo; a memória tem limites de retenção e API de exclusão.' },
  'control.K07.implementation': { zh: '脱敏在检索层运行；记忆写入带有效期和数据类别标签（§18.5）。', es: 'La redacción opera en la capa de recuperación; las escrituras de memoria llevan TTL y etiquetas de categoría (§18.5).', pt: 'A redação ocorre na camada de recuperação; gravações de memória levam TTL e etiquetas de categoria (§18.5).' },
  'control.K07.verification': { zh: '植入金丝雀个人信息并确认提示词和日志中不存在；调用清除接口后重新查询。', es: 'Sembrar datos personales canario y confirmar su ausencia en prompts y registros; ejecutar la API de borrado y volver a consultar.', pt: 'Inserir dados pessoais canário e confirmar ausência em prompts e logs; executar a API de exclusão e consultar novamente.' },

  'control.K08.name': { zh: '不可信内容隔离', es: 'Aislamiento de contenido no confiable', pt: 'Isolamento de conteúdo não confiável' },
  'control.K08.description': { zh: '从外部或不可信界面获取的内容与指令上下文隔离；持续运行提示注入测试。', es: 'El contenido de superficies externas o no confiables se separa del contexto de instrucciones; el programa de pruebas de inyección es continuo.', pt: 'Conteúdo de superfícies externas ou não confiáveis é separado do contexto de instruções; testes de injeção são contínuos.' },
  'control.K08.implementation': { zh: '不可信片段被标记，并排除在工具授权决策之外；红队测试套件进入 CI。', es: 'Los fragmentos no confiables se etiquetan y se excluyen de decisiones de autorización; la suite de red team se ejecuta en CI.', pt: 'Trechos não confiáveis são marcados e excluídos de decisões de autorização; a suíte de red team roda no CI.' },
  'control.K08.verification': { zh: '注入语料在预发布环境中不得触发未授权工具调用。', es: 'El corpus de inyección no debe provocar llamadas no autorizadas en staging.', pt: 'O corpus de injeção não deve provocar chamadas não autorizadas em staging.' },

  'control.K09.name': { zh: '合成内容标识界面', es: 'Superficie de etiquetado de contenido sintético', pt: 'Superfície de rotulagem de conteúdo sintético' },
  'control.K09.description': { zh: '统一标识控制，在渲染时产生用户可感知的明确标记，并在文件元数据中写入机器可读的隐式标记。', es: 'Un control único emite marcas perceptibles para la persona —explícitas y visibles— al renderizar y marcas implícitas legibles por máquina en los metadatos.', pt: 'Um único controle emite marcas perceptíveis ao usuário —explícitas e visíveis— na renderização e marcas implícitas legíveis por máquina nos metadados.' },
  'control.K09.implementation': { zh: '输出管线中的单一关口按最严格适用制度配置（中国第 17 条显著标识、中国 2025 双重标识、欧盟第 50 条披露）。', es: 'Un único punto de control en la salida se configura según el régimen aplicable más estricto (China art. 17 visible + doble marca 2025 + divulgación UE art. 50).', pt: 'Um único ponto de controle na saída é configurado pelo regime aplicável mais rigoroso (China art. 17 visível + dupla marca 2025 + divulgação UE art. 50).' },
  'control.K09.verification': { zh: '抽样检查多种格式：两层标识均存在，交互界面中的披露文案可见。', es: 'Muestrear formatos: deben estar presentes ambas capas de marca y el texto de divulgación debe ser visible en la interfaz.', pt: 'Amostrar formatos: ambas as camadas de marca devem estar presentes e o texto de divulgação deve estar visível na interface.' },

  'control.K10.name': { zh: '工具授权变更管理', es: 'Gestión de cambios de permisos de herramientas', pt: 'Gestão de mudanças nas concessões de ferramentas' },
  'control.K10.description': { zh: '为智能体新增工具、权限范围或数据源必须经过审查，并触发 ADRS 重新评分（§19.5 触发条件 c）。', es: 'Añadir una herramienta, alcance o fuente de datos requiere revisión y activa una nueva evaluación ADRS (§19.5, disparador c).', pt: 'Adicionar ferramenta, escopo ou fonte de dados exige revisão e dispara nova avaliação ADRS (§19.5, gatilho c).' },
  'control.K10.implementation': { zh: '注册表变更请求需要风险负责人批准；CI 重新计算能力配置差异。', es: 'Los cambios del registro requieren aprobación del responsable de riesgo; CI recalcula la diferencia del perfil de capacidades.', pt: 'Mudanças no registro exigem aprovação do responsável por risco; o CI recalcula a diferença do perfil de capacidades.' },
  'control.K10.verification': { zh: '将授权历史与审查记录对账；确认每次能力配置变更都存在重新评分。', es: 'Auditar el historial de concesiones contra las revisiones y verificar una nueva evaluación para cada cambio de perfil.', pt: 'Auditar o histórico de concessões contra as revisões e verificar nova avaliação para cada mudança de perfil.' },

  'control.K11.name': { zh: '部署前独立审查', es: 'Revisión independiente previa al despliegue', pt: 'Revisão independente antes da implantação' },
  'control.K11.description': { zh: '高风险或关键等级智能体部署前，必须由开发团队之外的人员完成有记录的审查。', es: 'Revisión documentada por una parte ajena al equipo constructor antes de desplegar un agente de nivel Alto o Crítico.', pt: 'Revisão documentada por parte externa à equipe de construção antes de implantar um agente de nível Alto ou Crítico.' },
  'control.K11.implementation': { zh: '审查使用 ADRS 工作表和能力配置文档（K12）；签字记录在审查日志中。', es: 'La revisión utiliza la hoja ADRS y el perfil de capacidades K12; la aprobación queda en el registro de revisión.', pt: 'A revisão usa a planilha ADRS e o perfil de capacidades K12; a aprovação fica no log de revisão.' },
  'control.K11.verification': { zh: '抽查部署记录，确认审查成果早于上线日期。', es: 'Muestrear despliegues para comprobar que los artefactos de revisión son anteriores al lanzamiento.', pt: 'Amostrar implantações para confirmar que os artefatos de revisão antecedem o lançamento.' },

  'control.K12.name': { zh: '能力配置文档', es: 'Documentación del perfil de capacidades', pt: 'Documentação do perfil de capacidades' },
  'control.K12.description': { zh: '持续更新智能体 C1–C12 配置、§10 强度、含跨境流动的数据流图，以及面向用户的 AI 披露文字。', es: 'Documento vivo del perfil C1–C12, intensidades §10, mapa de flujos —incluidos transfronterizos— y texto de divulgación de IA para usuarios.', pt: 'Documento vivo do perfil C1–C12, intensidades §10, mapa de fluxos —incluindo transfronteiriços— e texto de divulgação de IA ao usuário.' },
  'control.K12.implementation': { zh: '与智能体共同版本化；每项能力引用 §10 强度锚点，并用于确定 binding_hit。', es: 'Versionado con el agente; cita los anclajes de intensidad §10 por capacidad y alimenta binding_hit.', pt: 'Versionado com o agente; cita âncoras de intensidade §10 por capacidade e alimenta binding_hit.' },
  'control.K12.verification': { zh: '比对文档化配置与已部署的工具注册表和数据连接器。', es: 'Comparar el perfil documentado con el registro de herramientas y conectores desplegados.', pt: 'Comparar o perfil documentado com o registro de ferramentas e conectores implantados.' },

  'control.K13.name': { zh: '智能体故障事件响应手册', es: 'Manual de respuesta a incidentes causados por agentes', pt: 'Manual de resposta a incidentes causados por agentes' },
  'control.K13.description': { zh: '经过测试的回滚与通知流程，适用于智能体造成的事件，并包含标识制度下的内容下架路径。', es: 'Procedimiento probado de reversión y notificación para incidentes causados por agentes, incluida la retirada de contenido bajo regímenes de etiquetado.', pt: 'Procedimento testado de reversão e notificação para incidentes causados por agentes, incluindo retirada de conteúdo sob regimes de rotulagem.' },
  'control.K13.implementation': { zh: '手册通过行动日志跟踪 ID 确定影响范围，并包含监管通知决策树。', es: 'El manual usa identificadores del registro de acciones para acotar el impacto e incluye un árbol de decisión de notificación regulatoria.', pt: 'O manual usa IDs do log de ações para delimitar o impacto e inclui árvore de decisão de notificação regulatória.' },
  'control.K13.verification': { zh: '使用模拟错误行动开展桌面演练；测量通过 K04 日志重建事件所需时间。', es: 'Ejercicio de mesa con una acción errónea simulada; medir el tiempo de reconstrucción desde los registros K04.', pt: 'Exercício de mesa com ação errônea simulada; medir o tempo de reconstrução pelos logs K04.' },
};
