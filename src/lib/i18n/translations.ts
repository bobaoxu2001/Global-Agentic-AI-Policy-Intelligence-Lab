import type { LanguageCode } from './config';
import { CONTROLS_TRANSLATIONS } from './controlsTranslations';
import { EVIDENCE_TRANSLATIONS } from './evidenceTranslations';
import { METHODOLOGY_TRANSLATIONS } from './methodologyTranslations';
import { WORK_SAMPLES_TRANSLATIONS } from './workSamplesTranslations';
import { CORE_PAGE_TRANSLATIONS } from './corePageTranslations';
import { A11Y_TRANSLATIONS } from './a11yTranslations';
import { INSTRUMENT_TRANSLATIONS } from './instrumentTranslations';
import { SUPPORT_TRANSLATIONS } from './supportTranslations';
import { RESEARCH_ROUTES_TRANSLATIONS } from './researchRoutesTranslations';
import { RISK_MANAGEMENT_TRANSLATIONS } from './riskManagementTranslations';

type TranslationSet = Record<Exclude<LanguageCode, 'en'>, string>;

export const TRANSLATIONS: Record<string, TranslationSet> = {
  'shell.skip': { zh: '跳到主要内容', es: 'Saltar al contenido principal', pt: 'Ir para o conteúdo principal' },
  'shell.brandTagline': { zh: '全球智能体 AI 政策情报', es: 'Inteligencia global sobre políticas de IA agéntica', pt: 'Inteligência global de políticas para IA agêntica' },
  'shell.languageLabel': { zh: '语言', es: 'Idioma', pt: 'Idioma' },
  'shell.nav.overview': { zh: '概览', es: 'Resumen', pt: 'Visão geral' },
  'shell.nav.latest': { zh: '最新更新', es: 'Última actualización', pt: 'Atualização' },
  'shell.nav.executive': { zh: '高管简报', es: 'Informe ejecutivo', pt: 'Resumo executivo' },
  'shell.nav.samples': { zh: '作品样本', es: 'Muestras', pt: 'Amostras' },
  'shell.nav.instruments': { zh: '政策文件', es: 'Instrumentos', pt: 'Instrumentos' },
  'shell.nav.compare': { zh: '市场比较', es: 'Comparar', pt: 'Comparar' },
  'shell.nav.controls': { zh: '控制措施', es: 'Controles', pt: 'Controles' },
  'shell.nav.methodology': { zh: '研究方法', es: 'Metodología', pt: 'Metodologia' },
  'shell.footer.statement': { zh: '政策变化 → 商业影响 → 可问责行动。', es: 'Cambio normativo → impacto empresarial → acción responsable.', pt: 'Mudança de política → impacto empresarial → ação responsável.' },
  'shell.footer.note': { zh: '独立作品集研究。所有结论均受已核查且来源有限的研究范围约束。', es: 'Investigación independiente de portafolio. Las conclusiones se limitan al alcance comprobado y a sus fuentes.', pt: 'Pesquisa independente de portfólio. As conclusões permanecem limitadas ao escopo e às fontes verificadas.' },
  'shell.footer.research': { zh: '研究', es: 'Investigación', pt: 'Pesquisa' },
  'shell.footer.evidence': { zh: '证据', es: 'Evidencia', pt: 'Evidências' },
  'shell.footer.jurisdictions': { zh: '司法辖区', es: 'Jurisdicciones', pt: 'Jurisdições' },
  'shell.footer.scenarios': { zh: '场景', es: 'Escenarios', pt: 'Cenários' },
  'shell.footer.riskManagement': { zh: 'AI 风险管理', es: 'Gestión de riesgos de IA', pt: 'Gestão de riscos de IA' },
  'shell.footer.adrs': { zh: 'ADRS 方法', es: 'Método ADRS', pt: 'Método ADRS' },
  'shell.footer.taxonomy': { zh: '政策分类', es: 'Taxonomía normativa', pt: 'Taxonomia de políticas' },
  'shell.footer.changelog': { zh: '变更记录', es: 'Registro de cambios', pt: 'Registro de mudanças' },
  'shell.footer.bibliography': { zh: '参考文献', es: 'Bibliografía', pt: 'Bibliografia' },
  'shell.footer.downloads': { zh: '下载', es: 'Descargas', pt: 'Downloads' },
  'shell.footer.glossary': { zh: '术语表', es: 'Glosario', pt: 'Glossário' },
  'shell.footer.about': { zh: '关于与限制', es: 'Acerca de y límites', pt: 'Sobre e limites' },
  'shell.translationBoundary': {
    zh: '界面翻译仅用于阅读辅助。官方标题、原文引文、来源 ID、法规编号和下载证据保持其已核验语言。',
    es: 'La traducción de la interfaz es solo una ayuda de lectura. Los títulos oficiales, citas textuales, identificadores, números legales y descargas conservan su idioma verificado.',
    pt: 'A tradução da interface é apenas um auxílio de leitura. Títulos oficiais, citações, IDs de fonte, números legais e downloads permanecem no idioma verificado.',
  },
  'banner.preview.title': { zh: 'AI 辅助研究预览', es: 'VISTA PREVIA DE INVESTIGACIÓN ASISTIDA POR IA', pt: 'PRÉVIA DE PESQUISA ASSISTIDA POR IA' },
  'banner.preview.detail': {
    zh: 'AI 辅助的一手来源核查 · 独立人工发布审查尚未完成 · 非法律建议 · 与任何公司无关联',
    es: 'Revisión de fuentes primarias asistida por IA · Revisión humana independiente pendiente · No es asesoramiento legal · Sin afiliación empresarial',
    pt: 'Revisão de fontes primárias assistida por IA · Revisão humana independente pendente · Não é aconselhamento jurídico · Sem afiliação empresarial',
  },
  'banner.fixtures.title': { zh: '虚构测试数据', es: 'DATOS DE PRUEBA FICTICIOS', pt: 'DADOS DE TESTE FICTÍCIOS' },
  'banner.fixtures.detail': {
    zh: '虚构测试数据 · 并非政策研究 · 不构成法律建议 · 绝不作为生产证据界面',
    es: 'Datos de prueba ficticios · No es investigación de políticas · No es asesoramiento legal · Nunca es una superficie de evidencia de producción',
    pt: 'Dados de teste fictícios · Não são pesquisa de políticas · Não constituem aconselhamento jurídico · Nunca são uma superfície de evidência de produção',
  },
  'banner.production.detail': {
    zh: '独立研究 · 仅展示已批准的结构化记录 · 不构成法律建议 · 与任何公司无关联',
    es: 'Investigación independiente · Solo se muestran registros estructurados aprobados · No es asesoramiento legal · Sin afiliación empresarial',
    pt: 'Pesquisa independente · Apenas registos estruturados aprovados são apresentados · Não é aconselhamento jurídico · Sem afiliação empresarial',
  },
  'common.fact': { zh: '事实', es: 'Hecho', pt: 'Fato' },
  'common.implication': { zh: '影响', es: 'Implicación', pt: 'Implicação' },
  'common.owner': { zh: '负责人', es: 'Responsable', pt: 'Responsável' },
  'common.action': { zh: '下一步行动', es: 'Acción', pt: 'Ação' },
  'common.evidenceGate': { zh: '证据门槛', es: 'Umbral de evidencia', pt: 'Critério de evidência' },
  'common.sources': { zh: '来源', es: 'Fuentes', pt: 'Fontes' },
  'common.escalate': { zh: '升级条件', es: 'Escalar', pt: 'Escalar' },
  ...CONTROLS_TRANSLATIONS,
  ...EVIDENCE_TRANSLATIONS,
  ...METHODOLOGY_TRANSLATIONS,
  ...WORK_SAMPLES_TRANSLATIONS,
  ...CORE_PAGE_TRANSLATIONS,
  ...A11Y_TRANSLATIONS,
  ...INSTRUMENT_TRANSLATIONS,
  ...SUPPORT_TRANSLATIONS,
  ...RESEARCH_ROUTES_TRANSLATIONS,
  ...RISK_MANAGEMENT_TRANSLATIONS,
};

export function translatedText(language: LanguageCode, id: string, fallback: string) {
  if (language === 'en') return fallback;
  return TRANSLATIONS[id]?.[language] ?? fallback;
}
