# XVARY Stock Research

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-orange)](./SKILL.md)
[![xvary.com](https://img.shields.io/badge/Full%20Deep%20Dives-xvary.com-black)](https://xvary.com)

Type `/analyze NVDA` in Claude Code and get a thesis-driven equity report with conviction scoring, kill criteria, and an EDGAR-backed financial snapshot -- in under two minutes, from public data, for free.

This is the open skill layer of [XVARY Research](https://xvary.com). We run a 21-stage pipeline to produce institutional-depth stock analysis. This repo gives you the methodology framework, the data tools, and the scoring models. The full 22-section deep dives live at [xvary.com](https://xvary.com).

## What you get that raw data tools don't

- **A verdict, not a spreadsheet** -- "Constructive at 74/100 conviction"
- **Named kill criteria** -- exactly what would break the thesis
- **Composite scores across four dimensions**, not just price ratios
- **Analysis that reads like a research desk**, not a terminal dump

## Quick Start

### Clone and verify

```bash
git clone git@github.com:xvary-research/stock-research.git
cd stock-research
python3 tools/edgar.py AAPL    # pulls SEC XBRL data
python3 tools/market.py AAPL   # pulls price + ratios
```

### Install as a Claude Code skill

```bash
mkdir -p ~/.claude/skills/xvary-stock-research
cp SKILL.md ~/.claude/skills/xvary-stock-research/SKILL.md
cp -R references tools examples ~/.claude/skills/xvary-stock-research/
```

Or skip the install entirely -- open Claude Code in this repo and say:

```
Read SKILL.md and run /analyze AAPL
```

### Commands

| Command | What it does |
|---|---|
| `/analyze {ticker}` | 1-page thesis + scorecard + risks + EDGAR-backed financial snapshot |
| `/score {ticker}` | Momentum, Stability, Financial Health, and Upside Estimate |
| `/compare {A} vs {B}` | Side-by-side score, thesis, and risk differential |

## Example: `/analyze NVDA`

Full example: [examples/nvda-analysis.md](./examples/nvda-analysis.md)

```
Verdict: CONSTRUCTIVE (Conviction 74/100)

┌─────────────────┬───────┬──────────────────────────────────────────────┐
│ Score           │ Value │ Read                                         │
├─────────────────┼───────┼──────────────────────────────────────────────┤
│ Momentum        │  88   │ Demand + operating leverage remain strong    │
│ Stability       │  70   │ Strong execution, non-zero cyclicality risk  │
│ Financial Health│  84   │ Robust balance sheet vs obligations          │
│ Upside Estimate │  64   │ Positive setup, expectations already high    │
└─────────────────┴───────┴──────────────────────────────────────────────┘

Thesis pillars:
  1. AI infrastructure spend durability
  2. CUDA ecosystem lock-in + pricing power
  3. Operating leverage on incremental revenue
  4. Balance-sheet capacity through cycle volatility

Kill criteria: hyperscaler capex pullback + export control
escalation + gross-margin break with rising capex intensity

Financial snapshot (public, 10-K 2026-01-25):
  Revenue $215.9B · Net income $120.1B · OCF $102.7B
  Assets $206.8B / Liabilities $49.5B
  Price $172.70 · Market cap ~$4.20T · P/E 35.23 · Beta 2.34
```

**This is the free layer.** The full pipeline produces 22-section reports with DCF models, competitive matrices, risk scenarios, and adversarial challenge gates.

**See a complete deep dive (no signup):** [NVDA on xvary.com](https://xvary.com/stock/nvda/deep-dive/)

## How this compares

|  | Raw data MCPs | Screener APIs | **This repo** |
|---|---|---|---|
| Free | Varies | Usually no | **Yes** |
| Thesis with verdict | No | No | **Yes** |
| Named kill criteria | No | No | **Yes** |
| Composite scoring (4 dimensions) | No | Partial | **Yes** |
| Works locally, no API key | N/A | No | **Yes** |
| Methodology published | N/A | No | **Yes** |

## Architecture

```mermaid
flowchart TD
    A["/analyze NVDA"] --> B["tools/edgar.py\nSEC XBRL + filings"]
    A --> C["tools/market.py\nYahoo → Finviz → Stooq"]
    B --> D["references/methodology.md\n21-stage framework"]
    C --> E["references/scoring.md\n4-score model"]
    D --> F["Structured analysis output"]
    E --> F
    F --> G["Local result\n+ link to full deep dive"]
```

## XVARY Scores

Definitions: [references/scoring.md](./references/scoring.md)

| Score | What it measures |
|---|---|
| **Momentum** | Direction and persistence of operating + market trajectory |
| **Stability** | Earnings durability, cyclicality resilience, variance control |
| **Financial Health** | Balance-sheet strength and cash-flow solvency |
| **Upside Estimate** | Asymmetry vs. current implied expectations |

## Methodology (Published Framework)

Full framework: [references/methodology.md](./references/methodology.md)

What's published:
- 21-stage research DAG with stage purposes
- 23 module map and what each module produces
- Quality gate names and validation criteria
- Conviction scoring and variant-perception philosophy
- Kill-file risk discipline

What stays proprietary:
- LLM prompts and chain-of-thought templates
- Threshold tables and scoring formulas
- Triangulation and convergence algorithms
- Sector-specific prompt libraries

## Data Sources

| Source | Access | Used for |
|---|---|---|
| **SEC EDGAR** | Public, free | Company facts (XBRL) + filing metadata |
| **Yahoo Finance** | No API key | Quote, valuation, ratio fields |
| **Finviz / Stooq** | Fallback | Resilience when Yahoo is unavailable |

EDGAR patterns: [references/edgar-guide.md](./references/edgar-guide.md)

## Full Deep Dives

| Ticker | Link |
|---|---|
| NVDA | [xvary.com/stock/nvda/deep-dive/](https://xvary.com/stock/nvda/deep-dive/) |
| All coverage (3,325 names) | [xvary.com/discover](https://xvary.com/discover) |
| Methodology narrative | [xvary.com/methodology](https://xvary.com/methodology) |

## Roadmap

- [ ] MCP server for on-demand full deep dives
- [ ] Earnings-season auto-refresh triggers
- [ ] Additional scoring models (earnings quality, capital allocation)
- [ ] Cursor / Windsurf / Codex plugin distribution

## Contributing

PRs welcome for:
- EDGAR taxonomy coverage and normalization
- Market-data fallback robustness
- Documentation clarity and examples

## License

MIT. See [LICENSE](./LICENSE).
