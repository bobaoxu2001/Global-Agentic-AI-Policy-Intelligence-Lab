import type { Metadata } from 'next';
import { LocalizedText } from '@/components/LocalizedText';

export const metadata: Metadata = {
  title: 'About and Evidence Limits',
  description: 'Purpose, profile boundaries, and evidence limits for the independent AI Policy Atlas portfolio.',
};

export default function AboutPage() {
  return <>
    <h1><LocalizedText id="support.about.title" fallback="About AI Policy Atlas" /></h1>
    <p><LocalizedText id="support.about.intro" fallback="AI Policy Atlas is an independent research portfolio for translating global policy instruments into an engineering- and business-relevant view of agentic AI governance." /></p>
    <p className="status-note"><LocalizedText id="support.about.boundary.beforeStatus" fallback="It is not legal advice, a compliance certification, real-time monitoring, or an affiliation with any company. Production routes publish only approved structured records. The separately labeled research preview intentionally shows an AI-assisted, manifest-scoped subset and portfolio work samples whose production records remain" /> <code>in_review</code><LocalizedText id="support.about.boundary.afterStatus" fallback="." /></p>
    <h2><LocalizedText id="support.about.demonstrates.title" fallback="What the project demonstrates" /></h2>
    <p><LocalizedText id="support.about.demonstrates.text" fallback="Primary-source monitoring, international comparison, executive synthesis, business implications, policy positions, meeting preparation, policy-to-control translation, and transparent quantitative reasoning." /></p>
    <h2><LocalizedText id="support.about.notClaim.title" fallback="What it does not claim" /></h2>
    <p><LocalizedText id="support.about.notClaim.text" fallback="No company endorsement, stakeholder relationship, submitted consultation, completed legal review, product launch authorization, operating-control proof, or empirical calibration is implied." /></p>
    <p><LocalizedText id="support.about.read.open" fallback="Read the" /> <a href="/methodology"><LocalizedText id="support.about.read.methodology" fallback="methodology" /></a><LocalizedText id="support.about.read.afterMethodology" fallback=", " /><a href="/bibliography"><LocalizedText id="support.about.read.bibliography" fallback="bibliography" /></a><LocalizedText id="support.about.read.afterBibliography" fallback=", and " /><a href="/downloads"><LocalizedText id="support.about.read.downloads" fallback="downloads" /></a><LocalizedText id="support.about.read.suffix" fallback=" for the underlying evidence and working materials." /></p>
  </>;
}
