import { listThemes } from "@/utils/list-prism.js-themes.mjs";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const themes = await listThemes()
   return NextResponse.json({ themes })
}