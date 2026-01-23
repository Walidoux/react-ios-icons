import { type PropsWithChildren, useEffect, useRef } from 'react'

import { Shoe } from 'react-ios-icons'
import { useNode } from './useNode'

const IconConstraints: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative border border-red-600/20">
    <div className="pointer-events-none absolute top-0 right-0 left-0 h-2 bg-blue-500/30" />
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-2 bg-blue-500/30" />
    {children}
  </div>
)

export default () => {
  const { containerRef, svgPaths, updatePathD, onPathMouseDown } =
    useNode<HTMLDivElement>()

  const originalDsRef = useRef<string[] | null>(null)

  useEffect(() => {
    if (svgPaths && !originalDsRef.current) {
      originalDsRef.current = svgPaths.map((info) => info.d)
    }
  }, [svgPaths])

  useEffect((): void => {
    if (svgPaths) {
      svgPaths.forEach((info, idx) => {
        info.path.style.cursor = 'grab'
        info.path.onmousedown = onPathMouseDown(idx)
      })
    }
  }, [svgPaths, onPathMouseDown])

  const handleReset = () => {
    if (!(svgPaths && originalDsRef.current)) return
    originalDsRef.current.forEach((d, idx) => {
      updatePathD(idx, d)
    })
  }

  function minifyPath(d: string): string {
    return d
      .replace(/\s+/g, ' ')
      .replace(/ ?([,-]) ?/g, '$1')
      .replace(/([a-zA-Z]) /g, '$1')
      .replace(/ ([a-zA-Z])/g, '$1')
      .trim()
  }

  return (
    <main
      className="flex min-h-screen w-screen flex-col items-center justify-center gap-4"
      ref={containerRef}>
      <button
        className="mb-4 rounded border border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
        onClick={handleReset}
        type="button">
        Reset Path Positions
      </button>
      <IconConstraints>
        <Shoe />
      </IconConstraints>
      {svgPaths && (
        <div className="space-y-2 rounded p-2 shadow">
          {svgPaths.map((info): React.ReactNode => {
            const idx = svgPaths.indexOf(info)
            return (
              <div key={idx}>
                <div className="mb-1 text-xs">Path {idx + 1}:</div>
                <textarea
                  className="w-80 border p-1"
                  onChange={(e): void => updatePathD(idx, e.target.value)}
                  rows={2}
                  value={minifyPath(info.d)}
                />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
