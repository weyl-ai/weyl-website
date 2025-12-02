// src/lib/posters/data.ts

export type PosterMode = 'hypermodern' | 'institutional';
export type PosterRound = 'r1' | 'r2';

export interface Poster {
  id: string;
  title: string;
  description: string;
  mode: PosterMode;
  round: PosterRound;
  tensorUtil: string;
  memBw: string;
  image: string;
}

export const posters: Poster[] = [
  // R1 / HYPERMODERN
  {
    id: 'r1-hm-1',
    title: 'CHOICES DOMINATE RESOURCES',
    description: "The future isn't more parameters. It's refusing to waste the cycles we don't have.",
    mode: 'hypermodern',
    round: 'r1',
    tensorUtil: '94.7%',
    memBw: '2.1TB/s',
    image: '/images/posters/poster-hyper-01-choices-dominate-resources.svg',
  },
  {
    id: 'r1-hm-2',
    title: 'CHOICES GENERATE OUTCOMES',
    description: 'Every architectural decision is a bet. We make ours with eyes open.',
    mode: 'hypermodern',
    round: 'r1',
    tensorUtil: '91.2%',
    memBw: '1.9TB/s',
    image: '/images/posters/poster-hyper-02-choices-generate-outcomes.svg',
  },
  {
    id: 'r1-hm-3',
    title: 'INTEGRITY IS LUCRATIVE',
    description: 'The market eventually prices in everything. Including your technical debt.',
    mode: 'hypermodern',
    round: 'r1',
    tensorUtil: '89.5%',
    memBw: '2.0TB/s',
    image: '/images/posters/poster-hyper-03-integrity-lucrative.svg',
  },
  {
    id: 'r1-hm-4',
    title: 'FREE LECUN',
    description: 'The weights want to run. Let them.',
    mode: 'hypermodern',
    round: 'r1',
    tensorUtil: '96.1%',
    memBw: '2.3TB/s',
    image: '/images/posters/poster-hyper-04-free-lecun.svg',
  },
  {
    id: 'r1-hm-5',
    title: 'CRAPPY HOPPER',
    description: 'Hardware is temporary. Architecture is forever.',
    mode: 'hypermodern',
    round: 'r1',
    tensorUtil: '88.3%',
    memBw: '1.8TB/s',
    image: '/images/posters/poster-hyper-05-crappy-hopper.svg',
  },

  // R1 / INSTITUTIONAL (High Modernism)
  {
    id: 'r1-inst-1',
    title: 'CHOICES DOMINATE RESOURCES',
    description: 'Architectural prudence supersedes capital expenditure in the pursuit of computational efficiency.',
    mode: 'institutional',
    round: 'r1',
    tensorUtil: '87.2%',
    memBw: '1.7TB/s',
    image: '/images/posters/poster-01-choices-dominate-resources.svg',
  },
  {
    id: 'r1-inst-2',
    title: 'CHOICES GENERATE OUTCOMES',
    description: 'The Commission finds that systematic architectural review yields measurable performance gains.',
    mode: 'institutional',
    round: 'r1',
    tensorUtil: '85.9%',
    memBw: '1.6TB/s',
    image: '/images/posters/poster-02-choices-generate-outcomes.svg',
  },
  {
    id: 'r1-inst-3',
    title: 'INTEGRITY IS LUCRATIVE',
    description: 'Long-term value creation remains contingent upon operational transparency and technical rigor.',
    mode: 'institutional',
    round: 'r1',
    tensorUtil: '90.1%',
    memBw: '1.9TB/s',
    image: '/images/posters/poster-03-integrity-lucrative.svg',
  },
  {
    id: 'r1-inst-4',
    title: 'FREE LECUN',
    description: 'Whereas trained weights represent collective intellectual investment, access shall not be arbitrarily restricted.',
    mode: 'institutional',
    round: 'r1',
    tensorUtil: '92.4%',
    memBw: '2.0TB/s',
    image: '/images/posters/poster-04-free-lecun.svg',
  },
  {
    id: 'r1-inst-5',
    title: 'CRAPPY HOPPER',
    description: 'Current generation accelerators are hereby designated transitional infrastructure pending next-generation deployment.',
    mode: 'institutional',
    round: 'r1',
    tensorUtil: '78.6%',
    memBw: '1.4TB/s',
    image: '/images/posters/poster-05-crappy-hopper.svg',
  },

  // R2 / HYPERMODERN
  {
    id: 'r2-hm-1',
    title: 'LOGIC IS HYGIENE',
    description: 'In production, we are unhygienic. s4 changes that.',
    mode: 'hypermodern',
    round: 'r2',
    tensorUtil: '95.8%',
    memBw: '2.2TB/s',
    image: '/images/posters/poster-s4-01-logic-hygiene-dark.svg',
  },
  {
    id: 'r2-hm-2',
    title: 'PRICES TRACK POWER',
    description: 'Every watt has a price. Every price tells the truth.',
    mode: 'hypermodern',
    round: 'r2',
    tensorUtil: '93.4%',
    memBw: '2.1TB/s',
    image: '/images/posters/poster-s4-02-prices-power-dark.svg',
  },
  {
    id: 'r2-hm-3',
    title: 'GARAGES EVERYWHERE',
    description: 'B200 burst in the cloud. RTX persistence at the edge. One kernel fits all.',
    mode: 'hypermodern',
    round: 'r2',
    tensorUtil: '91.7%',
    memBw: '2.0TB/s',
    image: '/images/posters/poster-s4-03-garage-everywhere-dark.svg',
  },
  {
    id: 'r2-hm-4',
    title: 'LAUNCH ONCE',
    description: 'Persistent kernels. Zero per-token overhead. GPU-resident state.',
    mode: 'hypermodern',
    round: 'r2',
    tensorUtil: '97.2%',
    memBw: '2.4TB/s',
    image: '/images/posters/poster-s4-04-launch-once-dark.svg',
  },
  {
    id: 'r2-hm-5',
    title: 'PRECISION HAS A BUDGET',
    description: "BF16 for the trunk. FP8 for the leaves. NF4 where nobody's looking.",
    mode: 'hypermodern',
    round: 'r2',
    tensorUtil: '94.1%',
    memBw: '2.2TB/s',
    image: '/images/posters/poster-s4-05-precision-budget-dark.svg',
  },

  // R2 / INSTITUTIONAL (High Modernism)
  {
    id: 'r2-inst-1',
    title: 'LOGIC IS HYGIENE',
    description: 'The Board hereby establishes mandatory cleanliness protocols for all sanctioned inference operations.',
    mode: 'institutional',
    round: 'r2',
    tensorUtil: '86.3%',
    memBw: '1.6TB/s',
    image: '/images/posters/poster-s4-01-logic-hygiene-light.svg',
  },
  {
    id: 'r2-inst-2',
    title: 'FAIR VALUE DETERMINATION',
    description: 'Energy expenditure shall be transparently accounted in all computational resource allocations.',
    mode: 'institutional',
    round: 'r2',
    tensorUtil: '88.9%',
    memBw: '1.8TB/s',
    image: '/images/posters/poster-s4-02-fair-value-light.svg',
  },
  {
    id: 'r2-inst-3',
    title: 'PUBLIC LABORATORY ACCESS',
    description: 'Research-grade inference capability shall be universally accessible to qualified practitioners.',
    mode: 'institutional',
    round: 'r2',
    tensorUtil: '84.7%',
    memBw: '1.5TB/s',
    image: '/images/posters/poster-s4-03-public-laboratory-light.svg',
  },
  {
    id: 'r2-inst-4',
    title: 'INAUGURAL MISSION PROTOCOL',
    description: 'Single-launch kernel persistence is hereby mandated for all sanctioned production workloads.',
    mode: 'institutional',
    round: 'r2',
    tensorUtil: '91.8%',
    memBw: '1.9TB/s',
    image: '/images/posters/poster-s4-04-inaugural-mission-light.svg',
  },
  {
    id: 'r2-inst-5',
    title: 'MEASURE AND ALLOCATE',
    description: 'Numerical precision shall be allocated according to demonstrated computational necessity.',
    mode: 'institutional',
    round: 'r2',
    tensorUtil: '89.2%',
    memBw: '1.7TB/s',
    image: '/images/posters/poster-s4-05-measure-allocate-light.svg',
  },
];

// Helper functions
export function getPostersByMode(mode: PosterMode | 'all'): Poster[] {
  if (mode === 'all') return posters;
  return posters.filter((p) => p.mode === mode);
}

export function getPostersByRound(round: PosterRound | 'all'): Poster[] {
  if (round === 'all') return posters;
  return posters.filter((p) => p.round === round);
}

export function filterPosters(
  mode: PosterMode | 'all',
  round: PosterRound | 'all'
): Poster[] {
  return posters.filter((p) => {
    const modeMatch = mode === 'all' || p.mode === mode;
    const roundMatch = round === 'all' || p.round === round;
    return modeMatch && roundMatch;
  });
}
