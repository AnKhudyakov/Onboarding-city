import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  background?: string
  onInit?: (app: PIXI.Application) => void
  onResize?: (app: PIXI.Application) => void
}

export const PixiCanvas = ({ className, background = '#0f1218', onInit, onResize }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onInitRef = useRef(onInit)
  const onResizeRef = useRef(onResize)

  useEffect(() => {
    onInitRef.current = onInit
    onResizeRef.current = onResize
  }, [onInit, onResize])

  useEffect(() => {
    const element = containerRef.current

    if (!element) return

    let app: PIXI.Application | null = null
    let observer: ResizeObserver | null = null
    let cancelled = false

    const init = async () => {
      const pixiApp = new PIXI.Application()

      await pixiApp.init({
        width: element.clientWidth || 1,
        height: element.clientHeight || 1,
        background,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio, 2),
        autoDensity: true,
      })

      if (cancelled) {
        pixiApp.destroy(true, { children: true })
        return
      }

      app = pixiApp
      element.appendChild(pixiApp.canvas)

      onInitRef.current?.(pixiApp)

      const resize = () => {
        pixiApp.renderer.resize(element.clientWidth, element.clientHeight)
        onResizeRef.current?.(pixiApp)
      }

      resize()

      observer = new ResizeObserver(resize)
      observer.observe(element)
    }

    init()

    return () => {
      cancelled = true
      observer?.disconnect()
      app?.destroy(true, { children: true })
    }
  }, [background])

  return <div ref={containerRef} className={className} />
}
