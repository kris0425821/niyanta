# Anantha Filament Works: data pack

Fictional company. Every name and number here is invented. As of 5 October 2026.

| File | What is in it | Kept by |
|---|---|---|
| `company.json` | Headline numbers, segments, changeover costs, the owners' mandate and its bridge | Finance and the board |
| `people.json` | The six people you build for, and the four regional managers | |
| `accounts.csv` | Every account that bought in FY24, FY25 or FY26: revenue by year, kilos, price paid against peers buying the same construction, and how much of the account that comparison covers | Sales ledger |
| `open_orders.csv` | Every open order line: what, how much, which line, where it is now, promised date, predicted date with a range, priority flags | Plant planning, with Aditya's predictions added |
| `lines.csv` | Last 30 days per extrusion line, texturising and twisting machine: rated capacity, output, and where the rest went | Plant |
| `delivery_model.json` | How good Aditya's predicted dates are | Aditya |
| `funnel.csv` | Every live, lost and disqualified pursuit, with stage, owner and how long the plant took to answer the brief | Ritika and the sales team |
| `prospects.csv`, `scoring_rubric.json` | Companies Anantha does not sell to yet, scored out of 100, and how much the score can be trusted | Ritika |
| `escalations.json` | What Ritika and Aditya have sent up for a decision | Ritika, Aditya |
| `directions.json` | Directions the two owners have already set, and how the two V4s responded | Kartik, Pranav |

## Words used in the files

- **Premium vs peers**: what an account pays per kg against other customers buying the same construction. **Peer coverage** is the share of that account's kilos for which such peers exist. A premium on low coverage describes a corner of the account.
- **Segment**: commodity, semi (semi-specialty), specialty. Contribution rates per segment are Finance's annual estimate; nothing in the ERP holds a cost per kg.
- **Route**: the stages an order passes through. EXT is extrusion (spinning), TX texturising, TW twisting.
- **Shade family MX**: mixed lustre. These orders cannot share a changeover with anything.
- **Idle, no orders**: the line was ready and had nothing to run.
- **Order kinds** (Kartik's words): good margin; strategic, taken below margin to win or keep an account; filler, taken to keep a line running.
- **Funnel stages**: Lead, MQL, SQL, Opportunity (the plant has committed time to a sample), Quote sent, Quote approved, PO received. A pursuit can also end Lost or Disqualified.

Not every file agrees with every other file. That is normal in a real company.
