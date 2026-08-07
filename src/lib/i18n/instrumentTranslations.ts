export const INSTRUMENT_TRANSLATIONS: Record<string, { zh: string; es: string; pt: string }> = {
  'instrument.list.title': {
    zh: '政策文件追踪器',
    es: 'Seguimiento de instrumentos normativos',
    pt: 'Monitor de instrumentos normativos',
  },
  'instrument.list.empty': {
    zh: '此配置中没有已发布的政策文件。',
    es: 'No hay instrumentos publicados en este perfil.',
    pt: 'Não há instrumentos publicados neste perfil.',
  },
  'instrument.filters.title': {
    zh: '筛选条件',
    es: 'Filtros',
    pt: 'Filtros',
  },
  'instrument.filters.logic': {
    zh: '同一维度内使用“或”，不同维度之间使用“且”（FR-2）',
    es: 'O dentro de un eje, Y entre ejes (FR-2)',
    pt: 'OU dentro de um eixo, E entre eixos (FR-2)',
  },
  'instrument.filter.axis.jur': {
    zh: '司法辖区',
    es: 'Jurisdicción',
    pt: 'Jurisdição',
  },
  'instrument.filter.axis.type': {
    zh: '文件类型',
    es: 'Tipo',
    pt: 'Tipo',
  },
  'instrument.filter.axis.binding': {
    zh: '约束力',
    es: 'Carácter vinculante',
    pt: 'Caráter vinculativo',
  },
  'instrument.filter.axis.lifecycle': {
    zh: '生命周期',
    es: 'Ciclo de vida',
    pt: 'Ciclo de vida',
  },
  'instrument.filter.jurisdiction.us': {
    zh: '美国',
    es: 'Estados Unidos',
    pt: 'Estados Unidos',
  },
  'instrument.filter.jurisdiction.eu': {
    zh: '欧盟',
    es: 'Unión Europea',
    pt: 'União Europeia',
  },
  'instrument.filter.jurisdiction.sg': {
    zh: '新加坡',
    es: 'Singapur',
    pt: 'Singapura',
  },
  'instrument.filter.jurisdiction.cn': {
    zh: '中国',
    es: 'China',
    pt: 'China',
  },
  'instrument.results': {
    zh: '共 {total} 项政策文件，当前显示 {visible} 项',
    es: '{visible} de {total} instrumentos',
    pt: '{visible} de {total} instrumentos',
  },
  'instrument.filters.clearAll': {
    zh: '清除全部（{count}）',
    es: 'Borrar todo ({count})',
    pt: 'Limpar tudo ({count})',
  },
  'instrument.filters.empty': {
    zh: '没有符合这些筛选条件的记录。',
    es: 'No hay registros que coincidan con estos filtros.',
    pt: 'Nenhum registo corresponde a estes filtros.',
  },
  'instrument.filters.clear': {
    zh: '清除筛选',
    es: 'Limpiar filtros',
    pt: 'Limpar filtros',
  },
  'instrument.header.instrument': {
    zh: '政策文件',
    es: 'Instrumento',
    pt: 'Instrumento',
  },
  'instrument.header.type': {
    zh: '类型',
    es: 'Tipo',
    pt: 'Tipo',
  },
  'instrument.header.bindingness': {
    zh: '约束力',
    es: 'Carácter vinculante',
    pt: 'Caráter vinculativo',
  },
  'instrument.header.lifecycle': {
    zh: '生命周期',
    es: 'Ciclo de vida',
    pt: 'Ciclo de vida',
  },
  'instrument.header.statusDate': {
    zh: '状态日期',
    es: 'Fecha de estado',
    pt: 'Data do estado',
  },
  'instrument.header.lastVerified': {
    zh: '最近核验',
    es: 'Última verificación',
    pt: 'Última verificação',
  },
  'instrument.detail.notFound': {
    zh: '未找到该政策文件。',
    es: 'No se encontró el instrumento.',
    pt: 'Instrumento não encontrado.',
  },
  'instrument.detail.asOf': {
    zh: '截至',
    es: 'fecha de referencia',
    pt: 'data de referência',
  },
  'instrument.detail.lastVerified': {
    zh: '最近核验',
    es: 'última verificación',
    pt: 'última verificação',
  },
  'instrument.detail.officialSources': {
    zh: '官方来源',
    es: 'Fuentes oficiales',
    pt: 'Fontes oficiais',
  },
  'instrument.detail.tier': {
    zh: '来源等级',
    es: 'Nivel',
    pt: 'Nível',
  },
  'instrument.detail.keyDates': {
    zh: '关键日期',
    es: 'Fechas clave',
    pt: 'Datas-chave',
  },
  'instrument.detail.provisions': {
    zh: '智能体相关条款',
    es: 'Disposiciones relevantes para la IA agéntica',
    pt: 'Disposições relevantes para a IA agêntica',
  },
  'instrument.detail.contextOnly': {
    zh: '背景政策文件——当前预览中没有条款级映射。',
    es: 'Instrumento de contexto: no existe un mapeo a nivel de disposición en la vista previa actual.',
    pt: 'Instrumento de contexto: não existe mapeamento ao nível da disposição na prévia atual.',
  },
  'instrument.detail.previewPartial': {
    zh: '此政策文件已纳入预览，但部分相关条款仍不在已批准的预览范围内。',
    es: 'Este instrumento está incluido en la vista previa. Algunas disposiciones relacionadas permanecen fuera del conjunto aprobado para la vista previa.',
    pt: 'Este instrumento está incluído na prévia. Algumas disposições relacionadas permanecem fora do conjunto aprovado para a prévia.',
  },
  'instrument.detail.provisionOverride': {
    zh: '条款级约束力覆盖：',
    es: 'excepción de carácter vinculante a nivel de disposición:',
    pt: 'substituição do caráter vinculativo ao nível da disposição:',
  },
};
