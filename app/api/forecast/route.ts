import { NextResponse } from 'next/server'
import { forecast } from '@/lib/ml/consistency'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const features = { weekday: Number(body.weekday), priorTahajjud: Boolean(body.priorTahajjud), lateNightActivity: Boolean(body.lateNightActivity), streak7: Number(body.streak7) }
    if (!Number.isInteger(features.weekday) || features.weekday < 0 || features.weekday > 6 || !Number.isFinite(features.streak7) || features.streak7 < 0 || features.streak7 > 7) return NextResponse.json({ error: 'Invalid forecast features' }, { status: 400 })
    return NextResponse.json(forecast(features))
  } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
}
