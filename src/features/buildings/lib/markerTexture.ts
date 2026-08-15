import * as PIXI from 'pixi.js'

const WIDTH = 34
const HEIGHT = 108
const RESOLUTION = 4
const SCREEN_HEIGHT = 40

const STEM_TOP = 6
const STEM_BOTTOM = 70
const STEM_HALF_TOP = 13
const STEM_HALF_BOTTOM = 11.5
const DOT_CENTRE = 89
const DOT_RADIUS = 14

const TOP_COLOR = '#ffdc8c'
const BOTTOM_COLOR = '#f0a02c'
const DEEP_COLOR = '#d9821a'

const roundedTaper = (ctx: CanvasRenderingContext2D, cx: number) => {
  const corners: [number, number][] = [
    [cx - STEM_HALF_TOP, STEM_TOP],
    [cx + STEM_HALF_TOP, STEM_TOP],
    [cx + STEM_HALF_BOTTOM, STEM_BOTTOM],
    [cx - STEM_HALF_BOTTOM, STEM_BOTTOM],
  ]
  const radii = [7, 7, 6, 6]

  ctx.beginPath()
  ctx.moveTo(cx, STEM_TOP)

  for (let i = 0; i < corners.length; i++) {
    const from = corners[i]
    const to = corners[(i + 1) % corners.length]

    ctx.arcTo(from[0], from[1], to[0], to[1], radii[i])
  }

  ctx.closePath()
}

const body = (ctx: CanvasRenderingContext2D, cx: number) => {
  const gradient = ctx.createLinearGradient(0, STEM_TOP, 0, DOT_CENTRE + DOT_RADIUS)

  gradient.addColorStop(0, TOP_COLOR)
  gradient.addColorStop(0.55, BOTTOM_COLOR)
  gradient.addColorStop(1, DEEP_COLOR)

  ctx.fillStyle = gradient

  roundedTaper(ctx, cx)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, DOT_CENTRE, DOT_RADIUS, 0, Math.PI * 2)
  ctx.fill()
}

const gloss = (ctx: CanvasRenderingContext2D, cx: number) => {
  ctx.save()

  roundedTaper(ctx, cx)
  ctx.clip()

  const sheen = ctx.createLinearGradient(cx + STEM_HALF_TOP, STEM_TOP, cx - STEM_HALF_TOP, STEM_BOTTOM)

  sheen.addColorStop(0, 'rgba(255,255,255,0.72)')
  sheen.addColorStop(0.45, 'rgba(255,255,255,0.12)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = sheen
  ctx.filter = 'blur(3px)'
  ctx.beginPath()
  ctx.ellipse(cx + 3.5, STEM_TOP + 22, 6.5, 20, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, DOT_CENTRE, DOT_RADIUS, 0, Math.PI * 2)
  ctx.clip()
  ctx.filter = 'blur(2px)'
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.beginPath()
  ctx.ellipse(cx + 3.5, DOT_CENTRE - 4.5, 5, 3.4, 0.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export const markerTexture = () => {
  const canvas = document.createElement('canvas')

  canvas.width = WIDTH * RESOLUTION
  canvas.height = HEIGHT * RESOLUTION

  const ctx = canvas.getContext('2d')

  if (!ctx) return { texture: PIXI.Texture.EMPTY, scale: 1 }

  ctx.scale(RESOLUTION, RESOLUTION)

  const cx = WIDTH / 2

  ctx.shadowColor = 'rgba(40,22,0,0.35)'
  ctx.shadowBlur = 5
  ctx.shadowOffsetY = 3
  body(ctx, cx)

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0
  body(ctx, cx)
  gloss(ctx, cx)

  return { texture: PIXI.Texture.from(canvas), scale: SCREEN_HEIGHT / (HEIGHT * RESOLUTION) }
}
