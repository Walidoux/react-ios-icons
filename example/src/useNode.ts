import { useCallback, useEffect, useRef, useState } from 'react'

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
          d: path.getAttribute('d') || '',
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
      const svgViewWidth =
        viewBox && viewBox.width ? viewBox.width : svgElem.width.baseVal.value
      const svgViewHeight =
        viewBox && viewBox.height
          ? viewBox.height
          : svgElem.height.baseVal.value
      const origD = pathElem.getAttribute('d')!

      const onMouseMove = (e: MouseEvent) => {
        // pixel delta
        const dxPx = e.clientX - dragStartXRef.current!
        const dyPx = e.clientY - dragStartY

        // converts pixel delta to viewBox units
        const dx = (dxPx / svgPixelWidth) * svgViewWidth
        const dy = (dyPx / svgPixelHeight) * svgViewHeight

        // command letters or numbers
        const tokens = origD.match(/[a-zA-Z]|-?\d*\.?\d+/g)
        if (!tokens) return

        let currentCommand = ''
        let coordIdx = 0
        const updatedTokens = tokens.map((token) => {
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

            if (coordIdx === 5) updated = num + dx
            if (coordIdx === 6) updated = num + dy

            coordIdx = (coordIdx + 1) % 7

            return updated
          }
          return token // for Z or unknown just return as is
        })

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
    onPathMouseDown,
  }
}
