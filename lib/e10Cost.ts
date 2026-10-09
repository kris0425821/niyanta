// Numbers behind the E10 decision. Every figure comes from the data pack:
//  - escalations.json (E10) and the assignment brief: peers pay about Rs 380
//  - open_orders.csv, SO 4405100: note says peers pay about Rs 362  (CONFLICT)
//  - open_orders.csv: Finance's contribution estimate of Rs 28/kg
//  - accounts.csv: A05 Karnavati FY26 realised Rs 371/kg; other traders' FY26 kg
//  - lines.csv: L12 rated 1,800 kg/day, 11,340 kg idle in last 30 days, 0 days booked
//  - directions.json: D-01 threshold of 4% below peers, review by 4 Nov 2026

export const E10 = {
  kg: 18000,
  offerPrice: 352,
  peerPriceEscalation: 380,
  peerPriceOrderNote: 362,
  contributionPerKg: 28, // Finance estimate; ERP has no product-level cost
  karnavatiFy26Avg: 371,
  otherTradersFy26Kg: 3738134, // all other active trader accounts, accounts.csv
  l12RatedKgPerDay: 1800,
  l12IdleKg30d: 11340,
  l12BookedDaysAhead: 0,
  d01ThresholdPct: 4,
  d01ReviewBy: "2026-11-04",
};

const toLakh = (rupees: number) => rupees / 100000;

export function belowPeerPct(peerPrice: number) {
  return ((peerPrice - E10.offerPrice) / peerPrice) * 100;
}

// Rs 28 x 18,000 kg = Rs 5.04 lakh
export const estContributionLakh = toLakh(E10.kg * E10.contributionPerKg);

// Days of L12 the order would fill: 18,000 / 1,800 = 10
export const l12Days = E10.kg / E10.l12RatedKgPerDay;

// If the other traders each got Rs 1/kg off, per year
export const perRupeeExposureLakh = toLakh(E10.otherTradersFy26Kg * 1);