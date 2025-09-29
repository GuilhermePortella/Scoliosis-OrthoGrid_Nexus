import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    return NextResponse.json({ ok: true, data })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}