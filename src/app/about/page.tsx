import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About and Evidence Limits',
  description: 'Purpose, profile boundaries, and evidence limits for the independent AI Policy Atlas portfolio.',
};

export default function AboutPage() {
  return <>
    <h1>About AI Policy Atlas</h1>
    <p>AI Policy Atlas is an independent research portfolio for translating global policy instruments into an engineering- and business-relevant view of agentic AI governance.</p>
    <p className="status-note">It is not legal advice, a compliance certification, real-time monitoring, or an affiliation with any company. Production routes publish only approved structured records. The separately labeled interview preview intentionally shows an AI-assisted, manifest-scoped subset and portfolio work samples whose production records remain <code>in_review</code>.</p>
    <h2>What the project demonstrates</h2>
    <p>Primary-source monitoring, international comparison, executive synthesis, business implications, policy positions, meeting preparation, policy-to-control translation, and transparent quantitative reasoning.</p>
    <h2>What it does not claim</h2>
    <p>No company endorsement, stakeholder relationship, submitted consultation, completed legal review, product launch authorization, operating-control proof, or empirical calibration is implied.</p>
    <p>Read the <a href="/methodology">methodology</a>, <a href="/bibliography">bibliography</a>, and <a href="/downloads">downloads</a> for the underlying evidence and working materials.</p>
  </>;
}
