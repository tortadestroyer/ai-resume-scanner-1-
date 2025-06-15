import * as React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "theme" }: ThemeProviderProps) {
  return <>{children}</>
}
