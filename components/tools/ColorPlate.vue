<template>
  <canvas :id="'plate-canvas-' + color.number_pixelhobby" class="img-pixelated" />
</template>
<script setup lang="ts">
const props = defineProps({
  color: {
    type: Object,
    required: true
  }
})

const amount = computed(() => props.color.amount)
const cutInfo = computed(() => {
  const n = 12
  const set: boolean[][] = new Array(n)
  for (let x = 0; x < n; x++) {
    set[x] = new Array(n)
    for (let y = 0; y < n; y++) {
      set[x][y] = false
    }
  }
  const amountRestPixels = amount.value % 140
  let pixelCounter = amountRestPixels

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      // Abort when all pixels are set
      if (pixelCounter < 1) return set
      // Circle in the middle
      if (x >= 5 && x <= 6 && y >= 5 && y <= 6) {
        set[x][y] = true
        // Continue without reducing the counter
        continue
      }
      // If one pixel is left and the amount of pixels is even
      if (pixelCounter == 1 && amountRestPixels % 2 == 0) {
        set[x][n - 1] = true
      } else {
        set[x][y] = true
      }
      pixelCounter--
    }
  }
  return set
})

watch(amount, () => drawPlateCanvas())

onMounted(() => drawPlateCanvas())

function isDarkContrast(hexcolor: string): boolean {
  const color: string = hexcolor.substring(1, hexcolor.length - 1) // remove #
  const r: number = parseInt(color.substring(0, 2), 16) // hexToR
  const g: number = parseInt(color.substring(2, 4), 16) // hexToG
  const b: number = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? true : false
}

function drawPlateCanvas() {
  const canvas: HTMLElement | null = document.getElementById(
    `plate-canvas-${props.color.number_pixelhobby}`
  )
  if (!canvas) return
  const c: HTMLCanvasElement = canvas as HTMLCanvasElement
  if (isDarkContrast(props.color.hex_place)) {
    c.parentElement?.parentElement?.classList.add('modal-content-dark')
  }
  c.width = 1000
  c.height = 1000
  const ctx: CanvasRenderingContext2D = c.getContext('2d') as CanvasRenderingContext2D
  if (!ctx) return
  ctx.clearRect(0, 0, c.width, c.height)

  const amountColumns = 6
  const amountRows: number = amountColumns
  const amountPixelsPerSquareRow = 2
  const amountPixelsPerSquareColumn: number = amountPixelsPerSquareRow

  const mainStrokeWidth: number = Math.min(c.height, c.width) / 37
  const smallStrokeWidth: number = mainStrokeWidth / 2
  const mainColor: string = props.color.hex_place
  const cuttingColor: string = props.color.number_pixelhobby == 155 ? 'black' : 'red'
  const unusedColor: string = mainColor + '66'
  const cuttingLineDash: number[] = [30]
  const mainFont = 'Arial'
  const mainFontSize: number = Math.min(c.height, c.width) / 20
  // eslint-disable-next-line no-undef
  const mainFontHorizontalAlignment: CanvasTextAlign = 'center'
  // eslint-disable-next-line no-undef
  const mainFontVerticalAlignment: CanvasTextBaseline = 'middle'

  ctx.lineWidth = mainStrokeWidth
  ctx.strokeStyle = mainColor
  ctx.fillStyle = mainColor
  ctx.font = mainFontSize + 'px ' + mainFont
  ctx.textBaseline = mainFontVerticalAlignment
  ctx.textAlign = mainFontHorizontalAlignment

  ctx.save()

  // Horizontal Lines
  const rowHeight: number = (c.height - mainStrokeWidth) / amountRows
  for (let i = 0; i < amountRows + 1; i++) {
    ctx.beginPath()
    ctx.moveTo(0, mainStrokeWidth / 2 + i * rowHeight)
    ctx.lineTo(c.width - 1, mainStrokeWidth / 2 + i * rowHeight)
    ctx.stroke()
  }

  // Vertical Lines
  const columnWidth: number = (c.width - mainStrokeWidth) / amountColumns
  for (let i = 0; i < amountColumns + 1; i++) {
    ctx.beginPath()
    ctx.moveTo(mainStrokeWidth / 2 + i * columnWidth, 0)
    ctx.lineTo(mainStrokeWidth / 2 + i * columnWidth, c.height - 1)
    ctx.stroke()
  }

  // Cirlce in the middle
  ctx.beginPath()
  ctx.arc(c.width / 2, c.height / 2, Math.min(rowHeight, columnWidth) / 2, 0, 2 * Math.PI, false)
  ctx.fill()

  // Text in the circle
  if (isDarkContrast(props.color.hex_place)) {
    ctx.fillStyle = 'black'
  } else {
    ctx.fillStyle = 'white'
  }
  ctx.fillText(props.color.number_pixelhobby, c.width / 2, c.height / 2)
  ctx.restore()

  // The pixels itself
  const innerColumnWidth: number = columnWidth - mainStrokeWidth
  const innerRowHeight: number = rowHeight - mainStrokeWidth
  const pixelWidth: number = (innerColumnWidth / amountPixelsPerSquareRow) * (3 / 5)
  const pixelHeight: number = (innerRowHeight / amountPixelsPerSquareColumn) * (3 / 5)
  const marginX: number =
    (innerColumnWidth - amountPixelsPerSquareRow * pixelWidth) / (2 * amountPixelsPerSquareRow)
  const marginY: number =
    (innerRowHeight - amountPixelsPerSquareColumn * pixelHeight) / (2 * amountPixelsPerSquareColumn)
  ctx.lineWidth = smallStrokeWidth
  const amountPixelsPerRow: number = amountColumns * amountPixelsPerSquareRow
  const amountPixelsPerColumn: number = amountRows * amountPixelsPerSquareColumn
  for (let outerX = 0; outerX < amountColumns; outerX++) {
    for (let outerY = 0; outerY < amountRows; outerY++) {
      for (let innerX = 0; innerX < amountPixelsPerSquareRow; innerX++) {
        for (let innerY = 0; innerY < amountPixelsPerSquareColumn; innerY++) {
          const fullX: number = outerX * amountPixelsPerSquareRow + innerX
          const fullY: number = outerY * amountPixelsPerSquareColumn + innerY
          const middlePixelX: number = amountPixelsPerRow / 2 - 1
          const middlePixelY: number = amountPixelsPerColumn / 2 - 1

          if (
            fullX >= Math.ceil(middlePixelX) &&
            fullX <= (amountPixelsPerRow % 2 == 0 ? middlePixelX + 1 : Math.floor(middlePixelX)) &&
            fullY >= Math.ceil(middlePixelY) &&
            fullY <= (amountPixelsPerColumn % 2 == 0 ? middlePixelY + 1 : Math.floor(middlePixelY))
          ) {
            continue
          }

          const squareX: number = mainStrokeWidth + outerX * columnWidth
          const squareY: number = mainStrokeWidth + outerY * rowHeight
          const squareColumnWidth: number = 2 * marginX + pixelWidth
          const squareRowHeight: number = 2 * marginY + pixelHeight
          ctx.fillRect(
            squareX + innerX * squareColumnWidth + marginX,
            squareY + innerY * squareRowHeight + marginY,
            pixelWidth,
            pixelHeight
          )
          ctx.beginPath()
          const lineX: number = squareX + innerX * squareColumnWidth + marginX + pixelWidth / 2
          const lineY: number = squareY + innerY * squareRowHeight + marginY + pixelHeight / 2
          ctx.moveTo(lineX, lineY)
          // Line to top
          if (innerY <= amountPixelsPerSquareColumn / 2 - 1) {
            ctx.lineTo(lineX, lineY - pixelHeight / 2 - 2 * marginY)
          }
          // Line to bottom
          else {
            ctx.lineTo(lineX, lineY + pixelHeight / 2 + 2 * marginY)
          }
          ctx.stroke()
        }
      }
    }
  }
  ctx.restore()

  // The unused pixels
  ctx.fillStyle = unusedColor

  for (let xCoordinate = 0; xCoordinate < cutInfo.value.length; xCoordinate++) {
    for (let yCoordinate = 0; yCoordinate < cutInfo.value[xCoordinate].length; yCoordinate++) {
      const currentPixel: boolean = cutInfo.value[xCoordinate][yCoordinate]
      // Black out only the not used pixels (false)
      if (currentPixel) continue
      ctx.fillRect(
        mainStrokeWidth / 2 + xCoordinate * (columnWidth / amountPixelsPerSquareRow),
        mainStrokeWidth / 2 + yCoordinate * (rowHeight / amountPixelsPerSquareColumn),
        columnWidth / amountPixelsPerSquareRow,
        rowHeight / amountPixelsPerSquareColumn
      )
    }
  }
  ctx.restore()

  // The cutting Line
  ctx.strokeStyle = cuttingColor
  ctx.setLineDash(cuttingLineDash)

  for (let xCoordinate = 0; xCoordinate < cutInfo.value.length; xCoordinate++) {
    for (let yCoordinate = 0; yCoordinate < cutInfo.value[xCoordinate].length; yCoordinate++) {
      const currentPixel: boolean = cutInfo.value[xCoordinate][yCoordinate]
      // Check bottom pixel
      if (yCoordinate < cutInfo.value[xCoordinate].length - 1) {
        const bottomPixel: boolean = cutInfo.value[xCoordinate][yCoordinate + 1]
        if (currentPixel != bottomPixel) {
          ctx.beginPath()
          ctx.moveTo(
            mainStrokeWidth / 2 + xCoordinate * (columnWidth / amountPixelsPerSquareRow),
            mainStrokeWidth / 2 + (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
          )
          ctx.lineTo(
            mainStrokeWidth / 2 + (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
            mainStrokeWidth / 2 + (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
          )
          ctx.stroke()
        }
      }
      // Check right pixel
      if (xCoordinate < cutInfo.value.length - 1) {
        const rightPixel: boolean = cutInfo.value[xCoordinate + 1][yCoordinate]
        if (currentPixel != rightPixel) {
          ctx.beginPath()
          ctx.moveTo(
            mainStrokeWidth / 2 + (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
            mainStrokeWidth / 2 + yCoordinate * (rowHeight / amountPixelsPerSquareColumn)
          )
          ctx.lineTo(
            mainStrokeWidth / 2 + (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
            mainStrokeWidth / 2 + (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
          )
          ctx.stroke()
        }
      }
    }
  }
  ctx.restore()
}
</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
}
</style>
<style lang="scss">
@import 'bootstrap';

.modal-content-dark {
  background: $dark;
  color: $light;
  .btn-close {
    @extend .btn-close-white;
  }
}
</style>
