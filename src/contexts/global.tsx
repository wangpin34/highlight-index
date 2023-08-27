"use client";
import React, { createContext, useState, useMemo, useCallback } from "react";
import { Category } from '@/types/filter'

export interface ContextType {
  value: {
     filter: {
      category?: Category,
      keyword?: string
    }
  },
  setter: {
    setFilterCategory: (category: Category) => void
    setFilterKeyword: (keyword: string) => void
  }
 
}

const Context = createContext<ContextType>({} as ContextType)


export function Provider({children}: {children: React.ReactNode}) {
  const [category, setFilterCategory] = useState<Category>(Category.All)
  const [keyword, setFilterKeyword] = useState<string>()
  const value = useMemo(() => ({
    filter: {
      category,
      keyword
    }
  }), [category, keyword])
  const setter = useMemo(() => ({
    setFilterCategory,
   setFilterKeyword
  }), [])
  return <Context.Provider value={{value, setter}}>
    {children}
  </Context.Provider>
}

export default Context