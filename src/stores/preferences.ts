'use client'

import { Theme } from '@/types/preferences'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    if (theme === Theme.Dark) {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }
  }
}

export const useTheme = create<ThemeState>(
  persist(
    (set) => ({
      theme: Theme.Undefined,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'preferences.theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state: ThemeState | undefined, error: unknown) => {
        // Trigger a state update after the state is loaded
        state?.setTheme(state.theme)
        // Follow the guide to trigger change but the subscriber did get executed, so manually apply theme as below as workaround
        state?.theme && applyTheme(state!.theme)
      },
    }
  ) as any // Add this line to remove the type error
)

useTheme.subscribe((state) => {
  const theme = state.theme
  applyTheme(theme)
})
