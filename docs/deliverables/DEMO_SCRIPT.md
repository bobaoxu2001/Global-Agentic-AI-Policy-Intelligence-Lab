# THREE-MINUTE INTERVIEW DEMO — SCRIPT v1

> Runs against the **fixtures build** (banner visible — that's a feature: say why). Every beat names the on-screen page. It references Pass-1 policy research that remains unpublished; the reconciled production corpus is 17 sources, 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog records. A 90-second cut is marked ◆.

---

**0:00–0:20 — Frame** · *screen: `/` Dashboard* ◆
"Agents don't just generate — they act: read data, call tools, send messages, execute decisions. I built a system that maps what four jurisdictions require of systems like that, with every claim typed as fact, inference, or recommendation, every fact cited to a primary source I actually verified, and a banner that tells you when you're looking at fixture data — the system refuses to blur that line, because the whole product is about not blurring lines."

**0:20–0:50 — Rigor** · *screen: `/instruments`, filter jurisdiction=US, open SB 24-205*
"A bill is not a law, and — here's the case nobody's tracker handles — a law is not necessarily ever *applicable*. Colorado's AI Act: enacted 2024, delayed, then repealed and replaced this May **before its duties ever took effect**. Enacted → superseded, never applicable. Type, bindingness, and lifecycle are three independent axes here, each with its dated primary source — I verified these against the legislature's own bill pages."

**0:50–1:30 — Translation** · *screen: `/provisions/cn-deep-synthesis-provisions:art17`* ◆
"This is the typed chain. ■ Fact: China's deep-synthesis rules, Article 17, quoted verbatim in Chinese — the authoritative language — from the CAC text I fetched: 智能对话, intelligent dialogue, is *named* in the labeling duty. ▲ Inference, confidence medium — capped because the English is my translation: a conversational agent's chat surface has been in scope in China since January 2023. ● Recommendation: one labeling control — K09 in the catalog — satisfies this, China's 2025 dual-mark rules, and the EU's Article 50 disclosure duty that lands in three weeks. One control, three obligations, three labels on the reasoning."

**1:30–2:20 — Judgment** · *screen: `/scenarios/aria` → click "open in calculator"* ◆
"Aria, a hypothetical support agent with $100 refund authority, scored across four markets. Same system everywhere — the invariance is machine-enforced — only jurisdictional exposure differs. Watch: the worksheet deep-links into the calculator with every input pre-filled. I toggle the human-in-the-loop gate — M1 — and all four markets drop from High to Moderate, live, full-precision, tier from the raw score. And if I stack every mitigation, credit caps at 40% — the formula refuses to let controls launder inherent risk. Selecting a jurisdiction over here changes *reference material only* — it never sets the multiplier for me. The score is arithmetic you can argue with, which is the point."

**2:20–2:50 — Trust** · *screen: `/changelog`, then `/methodology`*
"Three weeks before this demo, the EU deferred its high-risk deadlines to late 2027 — but kept the AI-disclosure date. That asymmetry is in the changelog with its source, and the affected records carry *medium* confidence with the reason stated: the amending act wasn't yet in the Official Journal when I verified. Where a government site blocked my fetch, the record says so. Policy moved while I was building — the system is designed to be corrected in public, not to pretend it was always right."

**2:50–3:00 — Close** · *screen: `/` with memo + brief* ◆
"Primary-source rigor, agentic-AI technical fluency, and translation into decisions teams can act on — the memo and one-page brief are clearly marked working drafts built from an in-review corpus. The publication queue shows exactly what still needs human verification. That's the job, demonstrated honestly end to end."

---

**Hedges:** offline fixtures build pre-started (`BUILD_PROFILE=fixtures npm run dev`); the five demo pages pre-visited; ◆ beats = 90-second cut (0:20 + 0:40 + 0:50 + 0:10). If asked "is this real data?": "Scenario scores are labeled fixtures pending second-pass review — the policy records behind them are first-pass verified against the sources on screen; the review protocol requires a second pass on a different day before anything publishes, and the production build physically refuses to ship until then."
