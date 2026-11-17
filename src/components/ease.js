// Motion system, shared by every animated component (CSS mirrors it in index.css):
//   EASE     one signature ease-out curve, never linear or a bare "ease"
//   DUR      micro (hover, press, toggles) 0.2s · base (panels, swaps) 0.3s · reveal 0.7s
//   STAGGER  80ms between items in a sequence
//   RISE     16px travel for scroll reveals
export const EASE = [0.22, 1, 0.36, 1]
export const DUR = { micro: 0.2, base: 0.3, reveal: 0.7 }
export const STAGGER = 0.08
export const RISE = 16
