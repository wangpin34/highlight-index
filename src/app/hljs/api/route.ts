import { listHljsThemes } from '@/utils/server-helper'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const themes = await listHljsThemes()
  return NextResponse.json({ themes })
}
