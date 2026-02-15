import { Button } from '@docs-ui/button'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { optimize } from 'svgo'
import { Airpod } from '../../src'
import { useNode } from './useNode'

const IconConstraints: React.FC<PropsWithChildren> = ({ children }) => (
  <div className='relative h-[200px] w-[200px] border border-red-600/20'>
    <div className='pointer-events-none absolute top-0 right-0 left-0 h-1/4 bg-blue-500/10' />
    <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-1/4 bg-blue-500/10' />
    {children}
  </div>
)

export default () => {
  const {
    containerRef,
    svgPaths,
    updatePathD,
    onPathMouseDown,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useNode<HTMLDivElement>()

  const originalDsRef = useRef<string[] | null>(null)
  const [sizeInfo, setSizeInfo] = useState<string>('')
  const [copiedPathIndex, setCopiedPathIndex] = useState<number | null>(null)

  useEffect(() => {
    if (svgPaths && !originalDsRef.current) {
      originalDsRef.current = svgPaths.map((info) => info.d)
    }
  }, [svgPaths])

  useEffect((): void => {
    if (svgPaths) {
      svgPaths.forEach((info, idx) => {
        info.path.style.cursor = 'grab'
        // @ts-expect-error - TODO: fix this
        info.path.onmousedown = onPathMouseDown(idx)
      })
    }
  }, [svgPaths, onPathMouseDown])

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const isCtrl = isMac ? e.metaKey : e.ctrlKey

      if (isCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      } else if (isCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const handleReset = () => {
    if (svgPaths && originalDsRef.current) {
      originalDsRef.current.forEach((d, idx) => {
        updatePathD(idx, d)
      })
    }
  }

  const handleOptimize = () => {
    if (!(svgPaths && originalDsRef.current)) {
      return
    }

    try {
      const originalSize = originalDsRef.current.reduce(
        (sum, d) => sum + d.length,
        0
      )

      const svgString = `<svg xmlns="http://www.w3.org/2000/svg">${svgPaths
        .map((info) => `<path d="${info.d}"/>`)
        .join('')}</svg>`

      const result = optimize(svgString, {
        multipass: true,
      })

      const parser = new DOMParser() // parse optimized svg to extract path d attributes
      const optimizedSvg = parser.parseFromString(result.data, 'image/svg+xml')
      const optimizedPaths = optimizedSvg.querySelectorAll('path')

      let optimizedSize = 0
      optimizedPaths.forEach((path, idx) => {
        const d = path.getAttribute('d') || ''
        optimizedSize += d.length
        updatePathD(idx, d)
      })

      setSizeInfo(
        `Optimized: ${originalSize} → ${optimizedSize} bytes (${((originalSize - optimizedSize) / 1024).toFixed(2)} KB saved)`
      )
    } catch (error) {
      console.error('Optimization failed:', error)
      setSizeInfo('Optimization failed. Check console for details.')
    }
  }

  function minifyPath(d: string): string {
    return d
      .replace(/\s+/g, ' ')
      .replace(/ ?([,-]) ?/g, '$1')
      .replace(/([a-zA-Z]) /g, '$1')
      .replace(/ ([a-zA-Z])/g, '$1')
      .trim()
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedPathIndex(index)
        setTimeout(() => setCopiedPathIndex(null), 2000) // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <main
      className='flex min-h-screen w-screen flex-col items-center justify-center gap-4'
      ref={containerRef}>
      <div className='flex flex-wrap gap-2'>
        <Button
          variant="outline"
          disabled={!canUndo}
          onClick={undo}
          title='Undo (Ctrl/Cmd+Z)'>
          Undo
        </Button>
        <Button
          className={`rounded border border-gray-400 px-4 py-2 ${
            canRedo
              ? 'bg-gray-200 hover:bg-gray-300'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'
          }`}
          disabled={!canRedo}
          onClick={redo}
          title='Redo (Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z)'>
          Redo
        </Button>
        <Button
          className='rounded border border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={handleReset}>
          Reset Path Positions
        </Button>
        <Button
          className='rounded border border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={handleOptimize}>
          Optimize
        </Button>
      </div>
      {sizeInfo && (
        <div className='mb-4 text-green-600 text-sm'>{sizeInfo}</div>
      )}
      <IconConstraints>
        <Airpod className='h-full w-full' />
      </IconConstraints>
      {svgPaths && (
        <div className='space-y-2 rounded p-2 shadow'>
          {svgPaths.map((info, idx): React.ReactNode => {
            return (
              <div key={idx}>
                <div className='mb-1 text-xs'>Path {idx + 1}:</div>
                <div className='flex items-center gap-2'>
                  <textarea
                    className='w-80 border p-1'
                    onChange={(e): void => updatePathD(idx, e.target.value)}
                    rows={2}
                    value={minifyPath(info.d).trim()}
                  />
                  <button
                    className='rounded border border-gray-400 bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300'
                    onClick={() => handleCopy(minifyPath(info.d).trim(), idx)}
                    type='button'>
                    {copiedPathIndex === idx ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
