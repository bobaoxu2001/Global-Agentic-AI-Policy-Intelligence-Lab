import { AdrsCalculator } from '@/components/AdrsCalculator';
import { LocalizedText } from '@/components/LocalizedText';

export default function RiskScorePage() {
  return (
    <>
      <h1><LocalizedText id="research.riskScore.title" fallback="Agent Deployment Risk Score (ADRS)" /></h1>
      <p><b><LocalizedText id="research.riskScore.warning" fallback="This is not a compliance determination." /></b> <LocalizedText id="research.riskScore.intro" fallback="ADRS is a transparent analytical communication tool for comparing hypothetical deployment conditions." /></p>
      <p className="status-note"><LocalizedText id="research.riskScore.note" fallback="The calculator is deterministic: analysts set capability anchors, supported mitigations, and the four jurisdictional J components manually. Selecting a jurisdiction never changes the score automatically." /></p>
      <AdrsCalculator />
    </>
  );
}
