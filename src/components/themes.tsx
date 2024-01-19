import React from 'react'

export default function Themes<T>({
  loading,
  onReload,
  error,
  themes,
  themeRender,
}: {
  loading: boolean
  onReload: () => void
  error: any
  themes: T[]
  themeRender: (theme: T) => React.ReactNode
}) {
  if (loading) {
    return (
      <div className="px-6 flex flex-col items-center">
        <div className="">Loading...</div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="px-6 flex flex-col items-center">
        <span>error</span>
        <button onClick={onReload}>Reload</button>
      </div>
    )
  }

  return (
    <div className="px-6 flex flex-col items-center">
      <div className="flex flex-col items-start w-full lg:w-4/5">
        <div className="flex gap-4 flex-wrap mt-4">{themes?.map(themeRender)}</div>
      </div>
    </div>
  )
}
