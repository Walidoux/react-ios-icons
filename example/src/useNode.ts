import { useRef, useState, useEffect, useCallback } from 'react'

type SvgPathInfo = { path: SVGPathElement; d: string }

export function useNode<T extends HTMLElement>() {
  const [svgPaths, setSvgPaths] = useState<SvgPathInfo[] | null>(null)
  const containerRef = useRef<T>(null)

  const draggedIdxRef = useRef<number | null>(null)
  const dragStartXRef = useRef<number | null>(null)
  const svgPathsRef = useRef<SvgPathInfo[] | null>(null)

  useEffect(() => {
    svgPathsRef.current = svgPaths
  }, [svgPaths])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const svgs = Array.from(container.querySelectorAll('svg'))
    const paths: SvgPathInfo[] = []
    svgs.forEach((svg) => {
      paths.push(
        ...Array.from(svg.querySelectorAll('path')).map((path) => ({
          path,
          d: path.getAttribute('d') || ''
        }))
      )
    })
    setSvgPaths(paths)
  }, [])

  const updatePathD = useCallback((index: number, newD: string) => {
    setSvgPaths((prev) =>
      prev
        ? prev.map((info, i) => {
            if (i === index) {
              info.path.setAttribute('d', newD)
              return { ...info, d: newD }
            }
            return info
          })
        : prev
    )
  }, [])

  const onPathMouseDown = useCallback(
    (idx: number) => (e: React.MouseEvent) => {
      draggedIdxRef.current = idx
      dragStartXRef.current = e.clientX
      const dragStartY = e.clientY

      const pathElem = svgPathsRef.current?.[idx]?.path
      const svgElem = pathElem?.ownerSVGElement
      if (!svgElem) return

      const svgRect = svgElem.getBoundingClientRect()
      const viewBox = svgElem.viewBox.baseVal
      const svgPixelWidth = svgRect.width
      const svgPixelHeight = svgRect.height
      const svgViewWidth = viewBox && viewBox.width ? viewBox.width : svgElem.width.baseVal.value
      const svgViewHeight = viewBox && viewBox.height ? viewBox.height : svgElem.height.baseVal.value

      // Store initial path data and mouse position
      const origD = pathElem.getAttribute('d') || ''
      // Extract first M x y (move to) command for simplicity
      const match = origD.match(/M\s*([-\d.]+)[ ,]([-\d.]+)/i)
      if (!match) return
      const origX = parseFloat(match[1])
      const origY = parseFloat(match[2])

      const onMouseMove = (e: MouseEvent) => {
        // Calculate pixel delta
        const dxPx = e.clientX - dragStartXRef.current!
        const dyPx = e.clientY - dragStartY

        // Convert pixel delta to viewBox units
        const dx = (dxPx / svgPixelWidth) * svgViewWidth
        const dy = (dyPx / svgPixelHeight) * svgViewHeight

        // Parse all coordinates and update them
        // This regex matches command letters or numbers (including decimals and negatives)
        const tokens = origD.match(/[a-zA-Z]|-?\d*\.?\d+/g)
        if (!tokens) return

        let isCoord = false
        let coordIdx = 0
        const updatedTokens = tokens.map((token) => {
          if (/^[a-zA-Z]$/.test(token)) {
            // If it's a command, reset coordinate index
            // For commands that take coordinates, set isCoord = true
            // M, L, T, S, Q, C, A, etc.
            if ('MLTQCS'.includes(token)) {
              isCoord = true
              coordIdx = 0
            } else if (token === 'Z' || token === 'z') {
              isCoord = false
            } else {
              isCoord = false
            }
            return token
          } else if (isCoord) {
            // Even index: x, Odd index: y
            const num = parseFloat(token)
            const updated = coordIdx % 2 === 0 ? num + dx : num + dy
            coordIdx++
            return updated
          } else {
            return token
          }
        })

        // Reconstruct path string
        const newD = updatedTokens.join(' ')
        updatePathD(idx, newD)
      }

      const onMouseUp = () => {
        draggedIdxRef.current = null
        dragStartXRef.current = null
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    },
    [updatePathD]
  )

  return {
    containerRef,
    svgPaths,
    updatePathD,
    onPathMouseDown
  }
}
