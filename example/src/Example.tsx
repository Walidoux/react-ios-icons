import { useEffect, useRef, type PropsWithChildren } from 'react'

import { Bookmark } from '../../src/icons/Bookmark'
import { useNode } from './useNode'

const IconConstraints: React.FC<PropsWithChildren> = ({ children }) => (
  <div className='relative border border-red-600/20'>
    <div className='absolute h-2 top-0 left-0 right-0 pointer-events-none bg-blue-500/30' />
    <div className='absolute h-2 bottom-0 left-0 right-0 pointer-events-none bg-blue-500/30' />
    {children}
  </div>
)

export default () => {
  const { containerRef, svgPaths, updatePathD, onPathMouseDown } = useNode<HTMLDivElement>()

  const originalDsRef = useRef<string[] | null>(null)

  useEffect(() => {
    if (svgPaths && !originalDsRef.current) {
      originalDsRef.current = svgPaths.map((info) => info.d)
    }
  }, [svgPaths])

  useEffect((): void => {
    if (!svgPaths) return
    svgPaths.forEach((info, idx) => {
      info.path.style.cursor = 'grab'
      info.path.onmousedown = onPathMouseDown(idx) as any
    })
  }, [svgPaths, onPathMouseDown])

  const handleReset = () => {
    if (!svgPaths || !originalDsRef.current) return
    originalDsRef.current.forEach((d, idx) => updatePathD(idx, d))
  }

  function minifyPath(d: string): string {
    return d
      .replace(/\s+/g, ' ')
      .replace(/ ?([,\-]) ?/g, '$1')
      .replace(/([a-zA-Z]) /g, '$1')
      .replace(/ ([a-zA-Z])/g, '$1')
      .trim()
  }

  return (
    <main ref={containerRef} className='flex flex-col min-h-screen w-screen items-center justify-center gap-4'>
      <button
        onClick={handleReset}
        className='mb-4 px-4 py-2 bg-gray-200 rounded border border-gray-400 hover:bg-gray-300'>
        Reset Path Positions
      </button>
      <IconConstraints>
        <Bookmark />
      </IconConstraints>
      {svgPaths && (
        <div className='p-2 rounded shadow space-y-2'>
          {svgPaths.map(
            (info, idx): React.ReactNode => (
              <div key={idx}>
                <div className='text-xs mb-1'>Path {idx + 1}:</div>
                <textarea
                  value={minifyPath(info.d)}
                  onChange={(e): void => updatePathD(idx, e.target.value)}
                  rows={2}
                  className='w-80 border p-1'
                />
              </div>
            )
          )}
        </div>
      )}
    </main>
  )
}
