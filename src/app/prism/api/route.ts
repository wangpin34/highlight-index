import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'

export async function GET(request: Request) {
  const themes: Array<{ name: string; uri: String; cdn: string }> = await fs
    .readFile('data/prism-themes.json', 'utf-8')
    .then((r) => JSON.parse(r))
  return NextResponse.json({ themes })
}
