export type ConsistencyFeatures = { weekday: number; priorTahajjud: boolean; lateNightActivity: boolean; streak7: number }

export function forecast(features: ConsistencyFeatures) {
  let risk = 0.18
  if (features.weekday === 0 || features.weekday === 6) risk += 0.05
  if (!features.priorTahajjud) risk += 0.08
  if (features.lateNightActivity) risk += 0.28
  risk -= Math.min(features.streak7, 7) * 0.025
  const probability = Math.max(0.04, Math.min(0.94, risk))
  return { probability, confidence: Math.min(0.94, 0.58 + features.streak7 * 0.04), intervention: probability > 0.6 ? 'Set a gentle sleep boundary tonight and place your alarm across the room.' : 'Your rhythm is steady. Protect it with a calm, early wind-down.' }
}
