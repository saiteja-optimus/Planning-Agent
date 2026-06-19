# FreightBrain — Project Summary

**Team:** Lone Rangers | **Event:** GenAI Buildathon 2026 | **Date:** June 2026

**Live Demo:** https://lone-rangers-genai-cqmk6earfsgp89kd5m496x.streamlit.app/
**GitHub:** https://github.com/saiteja-optimus/Lone-Rangers-GenAI

---

## Problem

95% of US trucking carriers run fewer than 10 trucks and operate on 3–6% margins.
15–20% of miles are driven empty (deadhead), generating zero revenue.
Existing load boards show **gross rate only** — not true net profit after fuel, driver pay, insurance, maintenance, tolls, and the hidden cost of being dropped in a dead freight market.

---

## Solution

**FreightBrain** is an AI agent that recommends the single most profitable load available to a driver right now, backed by a 6-component cost model and a Market Liquidity Score (MLS) that quantifies how easy it is to find a *next* load from the delivery city.

### Four Core Innovations

| Innovation | Description |
|---|---|
| **Dual Deadhead Engine** | Prices cost TO pick-up AND repositioning FROM delivery city. Most tools only count the first leg. |
| **Market Liquidity Score (MLS)** | 0–100 score quantifying "escape-ability" of a destination. Cities below 40 incur an automatic repositioning penalty. |
| **6-Component Net Profit Model** | Fuel · Driver Pay · Insurance · Maintenance · Tolls · Deadhead. Actual pocket money, not gross. |
| **NVIDIA NIM AI Agent** | LLaMA-3.1-70B explains WHY load #1 beats load #2 in plain English with risk flags and market insight. |

---

## Architecture — Medallion on Databricks Delta Lake

```
Raw CSV (104K loads)
      |
  [BRONZE]   Delta table — raw ingestion, schema enforcement
      |
  [SILVER]   Delta table — Haversine distance, 6-cost PySpark UDFs, dual deadhead
      |
  [GOLD]     net_profit_loads + market_quality_index tables
      |
  [AI AGENT] NVIDIA NIM (LLaMA-3.1-70B, OpenAI-compatible SDK)
      |
  [DASHBOARD] Streamlit — 4 screens, Plotly + pydeck maps
```

---

## Net Profit Formula

```
NET_PROFIT = GROSS_RATE - (
    fuel_cost           = miles / 6.5 * 3.85
    driver_pay          = miles * 0.55
    insurance           = miles * 0.085
    maintenance         = miles * 0.18
    toll_cost           = corridor_lookup(origin_state, dest_state)
    deadhead_cost       = (dh_miles / 6.5 * 3.85) + (dh_miles * 0.55)
    repositioning_cost  = (1 - dest_mls / 100) * 150
)
NET_RPM = NET_PROFIT / load_miles
```

Benchmark: **~$1.00/mile** fully loaded (all 6 components combined).

---

## Market Liquidity Score (MLS)

```
MLS(city) = outbound_load_density * 0.40
          + lane_balance_score    * 0.30
          + avg_rate_per_mile     * 0.20
          + destination_diversity * 0.10
```

Score range: 0–100. Cities below 40 incur a $150 repositioning penalty in the net profit calculation.

### Top 10 Carrier-Start Markets

| Rank | City | MLS |
|------|------|-----|
| 1 | Chicago, IL | 92 |
| 2 | Dallas, TX | 88 |
| 3 | Atlanta, GA | 85 |
| 4 | Los Angeles, CA | 82 |
| 5 | Memphis, TN | 79 |
| 6 | Columbus, OH | 76 |
| 7 | Kansas City, MO | 73 |
| 8 | Charlotte, NC | 71 |
| 9 | Indianapolis, IN | 68 |
| 10 | Nashville, TN | 65 |

---

## Demo Scenario — Why Atlanta Beats Laredo

| | Memphis -> Laredo, TX | Memphis -> Atlanta, GA |
|---|---|---|
| Gross Rate | $3,700 | $3,500 |
| Miles | 920 | 395 |
| All Costs | -$1,715 | -$888 |
| Repositioning (MLS penalty) | -$150 (MLS 31) | -$23 (MLS 85) |
| **NET PROFIT** | **$1,835** | **$2,589** |
| Net RPM | $2.00/mi | $6.55/mi |

FreightBrain recommends Atlanta: **+$754 net profit** despite $200 lower gross.

---

## Dashboard — 4 Screens

1. **Load Finder** — Driver enters city/state + equipment → top 10 loads by net profit, cost breakdown chart, map
2. **AI Recommendation** — NVIDIA LLaMA-3.1-70B explains WHY the top load wins, with risk flags
3. **Top 10 Markets** — Choropleth map + ranked table of best carrier-start cities by MLS
4. **Lane Heat Map** — Bubble map of outbound load volume, color = avg net RPM

---

## Tech Stack

| Layer | Tool |
|---|---|
| Data Warehouse | Databricks Community Edition + Delta Lake |
| Pipeline | PySpark (Databricks Notebooks) |
| AI Agent | NVIDIA NIM — LLaMA-3.1-70B — OpenAI Python SDK |
| Dashboard | Streamlit + Plotly + pydeck |
| Data | 104K synthetic loads, 50 US markets |
| Hosting | Streamlit Community Cloud (free) |
| Version Control | Git + GitHub |

---

## Key Results

- **104K loads** parsed from raw unstructured text (3 formats)
- **50 US markets** covered
- **6 cost components** in profit model
- **+$754** extra net profit vs gross-rate-only selection in demo scenario
- Live AI reasoning via NVIDIA LLaMA-3.1-70B
- Zero infrastructure cost deployment

---

## Repository Structure

```
ProblemStatement6-FreightBrain/
├── data/
│   ├── synthetic_loads.csv
│   └── toll_corridors.json
├── notebooks/
│   ├── 01_bronze_ingestion.py
│   ├── 02_silver_enrichment.py
│   ├── 03_gold_analytics.py
│   └── 04_agent_demo.py
├── src/
│   ├── data_generator.py
│   ├── parser.py
│   ├── cost_model.py
│   ├── market_scorer.py
│   ├── agent.py
│   ├── dashboard.py
│   └── requirements.txt
├── screenshots/
│   └── screen1_load_finder.png
├── FreightBrain_Presentation.pptx
├── SUMMARY.md
└── README.md
```
