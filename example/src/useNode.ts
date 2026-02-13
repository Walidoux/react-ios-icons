import { useCallback, useEffect, useRef, useState } from 'react'

interface SvgPathInfo {
  path: SVGPathElement
  d: string
}

interface HistoryEntry {
  pathIndex: number
  previousD: string
  newD: string
}

export function useNode<T extends HTMLElement>() {
  const [svgPaths, setSvgPaths] = useState<SvgPathInfo[] | null>(null)
  const containerRef = useRef<T>(null)

  const draggedIdxRef = useRef<number | null>(null)
  const dragStartXRef = useRef<number | null>(null)
  const svgPathsRef = useRef<SvgPathInfo[] | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartDRef = useRef<string>('')

  // Undo/redo state
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const historyRef = useRef<HistoryEntry[]>([])
  const historyIndexRef = useRef<number>(-1)
  const isUndoingRef = useRef(false)

  useEffect(() => {
    svgPathsRef.current = svgPaths
  }, [svgPaths])

  useEffect(() => {
    historyRef.current = history
  }, [history])

  useEffect(() => {
    historyIndexRef.current = historyIndex
  }, [historyIndex])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const svgs = Array.from(container.querySelectorAll('svg'))
      const paths: SvgPathInfo[] = []

      for (const svg of svgs) {
        paths.push(
          ...Array.from(svg.querySelectorAll('path')).map((path) => ({
            path,
            d: path.getAttribute('d') || '',
          }))
        )
      }

      setSvgPaths(paths)
    }
  }, [])

  // Add entry to history
  const addToHistory = useCallback((entry: HistoryEntry) => {
    const currentIndex = historyIndexRef.current
    const newHistory = historyRef.current.slice(0, currentIndex + 1)
    newHistory.push(entry)
    historyRef.current = newHistory
    setHistory(newHistory)
    historyIndexRef.current = currentIndex + 1
    setHistoryIndex(currentIndex + 1)
  }, [])

  const undo = useCallback(() => {
    const currentIndex = historyIndexRef.current
    const currentHistory = historyRef.current

    if (currentIndex < 0 || currentIndex >= currentHistory.length) {
      return
    }

    const entry = currentHistory[currentIndex]
    if (!entry) {
      return
    }

    isUndoingRef.current = true

    setSvgPaths((prev) => {
      if (!prev) {
        return prev
      }
      return prev.map((info, i) => {
        if (i === entry.pathIndex) {
          info.path.setAttribute('d', entry.previousD)
          return { ...info, d: entry.previousD }
        }
        return info
      })
    })

    historyIndexRef.current = currentIndex - 1
    setHistoryIndex(currentIndex - 1)
    isUndoingRef.current = false
  }, [])

  const redo = useCallback(() => {
    const currentIndex = historyIndexRef.current
    const currentHistory = historyRef.current

    if (currentIndex >= currentHistory.length - 1) {
      return
    }

    const entry = currentHistory[currentIndex + 1]
    if (!entry) {
      return
    }

    isUndoingRef.current = true

    setSvgPaths((prev) => {
      if (!prev) {
        return prev
      }
      return prev.map((info, i) => {
        if (i === entry.pathIndex) {
          info.path.setAttribute('d', entry.newD)
          return { ...info, d: entry.newD }
        }
        return info
      })
    })

    historyIndexRef.current = currentIndex + 1
    setHistoryIndex(currentIndex + 1)
    isUndoingRef.current = false
  }, [])

  const canUndo = historyIndex >= 0
  const canRedo = historyIndex < history.length - 1

  const updatePathD = useCallback(
    (index: number, newD: string, skipHistory = false) => {
      setSvgPaths((prev) => {
        if (!prev) {
          return prev
        }

        const prevD = prev[index]?.d || ''

        // Only add to history if not currently undoing/redoing, not dragging, and value actually changed
        if (
          !(skipHistory || isUndoingRef.current || isDraggingRef.current) &&
          prevD !== newD
        ) {
          addToHistory({
            pathIndex: index,
            previousD: prevD,
            newD,
          })
        }

        return prev.map((info, i) => {
          if (i === index) {
            info.path.setAttribute('d', newD)
            return { ...info, d: newD }
          }
          return info
        })
      })
    },
    [addToHistory]
  )

  const onPathMouseDown = useCallback(
    (idx: number) => (e: React.MouseEvent) => {
      draggedIdxRef.current = idx
      dragStartXRef.current = e.clientX
      isDraggingRef.current = true

      const dragStartY = e.clientY
      const pathElem = svgPathsRef.current?.[idx]?.path
      const svgElem = pathElem?.ownerSVGElement

      if (svgElem && pathElem) {
        const svgRect = svgElem.getBoundingClientRect()
        const viewBox = svgElem.viewBox.baseVal
        const svgPixelWidth = svgRect.width
        const svgPixelHeight = svgRect.height
        const svgViewWidth = viewBox?.width
          ? viewBox.width
          : svgElem.width.baseVal.value
        const svgViewHeight = viewBox?.height
          ? viewBox.height
          : svgElem.height.baseVal.value
        const origD = pathElem.getAttribute('d')

        // Store the initial D value for history
        dragStartDRef.current = origD || ''

        const onMouseMove = (e: MouseEvent) => {
          // pixel delta
          const dxPx = e.clientX - (dragStartXRef.current ?? 0)
          const dyPx = e.clientY - dragStartY

          // converts pixel delta to viewBox units
          const dx = (dxPx / svgPixelWidth) * svgViewWidth
          const dy = (dyPx / svgPixelHeight) * svgViewHeight

          // command letters or numbers
          const tokens = origD?.match(/[a-zA-Z]|-?\d*\.?\d+/g)

          if (tokens) {
            let currentCommand = ''
            let coordIdx = 0

            const updatedTokens = tokens.map((token) => {
              // biome-ignore lint/performance/useTopLevelRegex: we don't care
              if (/^[a-zA-Z]$/.test(token)) {
                currentCommand = token
                coordIdx = 0
                return token
              }

              // only update coordinates for commands that use x/y pairs which are (M, L, T, S, Q, C)
              // V: only y, H: only x, A: rx ry x-axis-rotation large-arc-flag sweep-flag x y
              if ('MLTQCS'.includes(currentCommand)) {
                const num = Number.parseFloat(token)
                const updated = coordIdx % 2 === 0 ? num + dx : num + dy

                coordIdx++

                return updated
              }
              if (currentCommand === 'H') {
                return Number.parseFloat(token) + dx // Only x
              }
              if (currentCommand === 'V') {
                return Number.parseFloat(token) + dy // Only y
              }
              if (currentCommand === 'A') {
                // Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
                // Only update last two numbers (x, y)
                const num = Number.parseFloat(token)

                // coordIdx: 0=rx, 1=ry, 2=x-axis-rotation, 3=large-arc-flag, 4=sweep-flag, 5=x, 6=y
                let updated = num

                if (coordIdx === 5) {
                  updated = num + dx
                }
                if (coordIdx === 6) {
                  updated = num + dy
                }

                coordIdx = (coordIdx + 1) % 7

                return updated
              }
              return token // for Z or unknown just return as is
            })

            const newD = updatedTokens.join(' ')
            updatePathD(idx, newD, true) // Skip history during drag
          }
        }

        const onMouseUp = () => {
          const finalD = pathElem.getAttribute('d') || ''

          // Only add to history if the path actually changed
          if (dragStartDRef.current !== finalD) {
            addToHistory({
              pathIndex: idx,
              previousD: dragStartDRef.current,
              newD: finalD,
            })
          }

          isDraggingRef.current = false
          draggedIdxRef.current = null
          dragStartXRef.current = null
          dragStartDRef.current = ''
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
      }
    },
    [updatePathD, addToHistory]
  )

  return {
    containerRef,
    svgPaths,
    updatePathD,
    onPathMouseDown,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
