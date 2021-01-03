<template>
  <canvas
    :id="'plate-canvas-' + color.number + '-' + (color.amount % 140)"
  ></canvas>
</template>
<script>
export default {
  name: "ColorPlate",
  props: {
    color: {
      type: Object,
      required: true,
    },
    withCuttingLine: {
      type: Boolean,
      default: false,
    },
    usedPixels: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.drawPlateCanvas();
  },
  methods: {
    isDarkContrast(hexcolor) {
      let color = hexcolor.substring(1, hexcolor.length - 1); // remove #
      let r = parseInt(color.substring(0, 2), 16); // hexToR
      let g = parseInt(color.substring(2, 4), 16); // hexToG
      let b = parseInt(color.substring(4, 6), 16); // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? true : false;
    },
    calculateCutting(amountPixels) {
      const n = 12;
      const set = new Array(n);
      for (let x = 0; x < n; x++) {
        set[x] = new Array(n);
        for (let y = 0; y < n; y++) {
          set[x][y] = false;
        }
      }
      const amountRestPixels = amountPixels % 140;
      let pixelCounter = amountRestPixels;

      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          // Abort when all pixels are set
          if (pixelCounter < 1) return set;
          // Circle in the middle
          if (x >= 5 && x <= 6 && y >= 5 && y <= 6) {
            set[x][y] = true;
            // Continue without reducing the counter
            continue;
          }
          // If one pixel is left and the amount of pixels is even
          if (pixelCounter == 1 && amountRestPixels % 2 == 0) {
            set[x][n - 1] = true;
          } else {
            set[x][y] = true;
          }
          pixelCounter--;
        }
      }
      return set;
    },
    drawPlateCanvas() {
      let c = document.getElementById(
        "plate-canvas-" + this.color.number + "-" + (this.color.amount % 140)
      );
      if (this.isDarkContrast(this.color.hex_place)) {
        c.parentElement.parentElement.classList += " modal-content-dark";
      }
      c.width = 1000;
      c.height = 1000;
      let ctx = c.getContext("2d");

      let amountColumns = 6;
      let amountRows = amountColumns;
      let amountPixelsPerSquareRow = 2;
      let amountPixelsPerSquareColumn = amountPixelsPerSquareRow;

      let mainStrokeWidth = Math.min(c.height, c.width) / 37;
      let smallStrokeWidth = mainStrokeWidth / 2;
      let mainColor = this.color.hex_place;
      let cuttingColor = this.color.number == 155 ? "black" : "red";
      let cuttingLineDash = [30];
      let mainFont = "Arial";
      let mainFontSize = Math.min(c.height, c.width) / 20;
      let mainFontHorizontalAlignment = "center";
      let mainFontVerticalAlignment = "middle";

      ctx.lineWidth = mainStrokeWidth;
      ctx.strokeStyle = mainColor;
      ctx.fillStyle = mainColor;
      ctx.font = mainFontSize + "px " + mainFont;
      ctx.textBaseline = mainFontVerticalAlignment;
      ctx.textAlign = mainFontHorizontalAlignment;

      ctx.save();

      // Horizontal Lines
      let rowHeight = (c.height - mainStrokeWidth) / amountRows;
      for (let i = 0; i < amountRows + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(0, mainStrokeWidth / 2 + i * rowHeight);
        ctx.lineTo(c.width - 1, mainStrokeWidth / 2 + i * rowHeight);
        ctx.stroke();
      }

      // Vertical Lines
      let columnWidth = (c.width - mainStrokeWidth) / amountColumns;
      for (let i = 0; i < amountColumns + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(mainStrokeWidth / 2 + i * columnWidth, 0);
        ctx.lineTo(mainStrokeWidth / 2 + i * columnWidth, c.height - 1);
        ctx.stroke();
      }

      // Cirlce in the middle
      ctx.beginPath();
      ctx.arc(
        c.width / 2,
        c.height / 2,
        Math.min(rowHeight, columnWidth) / 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();

      // Text in the circle
      if (this.isDarkContrast(this.color.hex_place)) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillText(this.color.number, c.width / 2, c.height / 2);
      ctx.restore();

      // The pixels itself
      let innerColumnWidth = columnWidth - mainStrokeWidth;
      let innerRowHeight = rowHeight - mainStrokeWidth;
      let pixelWidth = (innerColumnWidth / amountPixelsPerSquareRow) * (3 / 5);
      let pixelHeight =
        (innerRowHeight / amountPixelsPerSquareColumn) * (3 / 5);
      let marginX =
        (innerColumnWidth - amountPixelsPerSquareRow * pixelWidth) /
        (2 * amountPixelsPerSquareRow);
      let marginY =
        (innerRowHeight - amountPixelsPerSquareColumn * pixelHeight) /
        (2 * amountPixelsPerSquareColumn);
      ctx.lineWidth = smallStrokeWidth;
      let amountPixelsPerRow = amountColumns * amountPixelsPerSquareRow;
      let amountPixelsPerColumn = amountRows * amountPixelsPerSquareColumn;
      for (let outerX = 0; outerX < amountColumns; outerX++) {
        for (let outerY = 0; outerY < amountRows; outerY++) {
          for (let innerX = 0; innerX < amountPixelsPerSquareRow; innerX++) {
            for (
              let innerY = 0;
              innerY < amountPixelsPerSquareColumn;
              innerY++
            ) {
              let fullX = outerX * amountPixelsPerSquareRow + innerX;
              let fullY = outerY * amountPixelsPerSquareColumn + innerY;
              let middlePixelX = amountPixelsPerRow / 2 - 1;
              let middlePixelY = amountPixelsPerColumn / 2 - 1;

              if (
                fullX >= Math.ceil(middlePixelX) &&
                fullX <=
                  (amountPixelsPerRow % 2 == 0
                    ? middlePixelX + 1
                    : Math.floor(middlePixelX)) &&
                fullY >= Math.ceil(middlePixelY) &&
                fullY <=
                  (amountPixelsPerColumn % 2 == 0
                    ? middlePixelY + 1
                    : Math.floor(middlePixelY))
              ) {
                continue;
              }

              let squareX = mainStrokeWidth + outerX * columnWidth;
              let squareY = mainStrokeWidth + outerY * rowHeight;
              let squareColumnWidth = 2 * marginX + pixelWidth;
              let squareRowHeight = 2 * marginY + pixelHeight;
              ctx.fillRect(
                squareX + innerX * squareColumnWidth + marginX,
                squareY + innerY * squareRowHeight + marginY,
                pixelWidth,
                pixelHeight
              );
              ctx.beginPath();
              let lineX =
                squareX + innerX * squareColumnWidth + marginX + pixelWidth / 2;
              let lineY =
                squareY + innerY * squareRowHeight + marginY + pixelHeight / 2;
              ctx.moveTo(lineX, lineY);
              // Line to top
              if (innerY <= amountPixelsPerSquareColumn / 2 - 1) {
                ctx.lineTo(lineX, lineY - pixelHeight / 2 - 2 * marginY);
              }
              // Line to bottom
              else {
                ctx.lineTo(lineX, lineY + pixelHeight / 2 + 2 * marginY);
              }
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();

      // The cutting Line
      ctx.strokeStyle = cuttingColor;
      ctx.setLineDash(cuttingLineDash);

      const info = this.calculateCutting(this.color.amount);
      for (let xCoordinate = 0; xCoordinate < info.length; xCoordinate++) {
        for (
          let yCoordinate = 0;
          yCoordinate < info[xCoordinate].length;
          yCoordinate++
        ) {
          const currentPixel = info[xCoordinate][yCoordinate];
          // Check bottom pixel
          if (yCoordinate < info[xCoordinate].length - 1) {
            const bottomPixel = info[xCoordinate][yCoordinate + 1];
            if (currentPixel != bottomPixel) {
              ctx.beginPath();
              ctx.moveTo(
                mainStrokeWidth / 2 +
                  xCoordinate * (columnWidth / amountPixelsPerSquareRow),
                mainStrokeWidth / 2 +
                  (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
              );
              ctx.lineTo(
                mainStrokeWidth / 2 +
                  (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
                mainStrokeWidth / 2 +
                  (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
              );
              ctx.stroke();
            }
          }
          // Check right pixel
          if (xCoordinate < info.length - 1) {
            const rightPixel = info[xCoordinate + 1][yCoordinate];
            if (currentPixel != rightPixel) {
              ctx.beginPath();
              ctx.moveTo(
                mainStrokeWidth / 2 +
                  (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
                mainStrokeWidth / 2 +
                  yCoordinate * (rowHeight / amountPixelsPerSquareColumn)
              );
              ctx.lineTo(
                mainStrokeWidth / 2 +
                  (xCoordinate + 1) * (columnWidth / amountPixelsPerSquareRow),
                mainStrokeWidth / 2 +
                  (yCoordinate + 1) * (rowHeight / amountPixelsPerSquareColumn)
              );
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();
    },
  },
};
</script>
<style lang="scss" scoped>
canvas {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;

  width: 100%;
}
</style>

<style lang="scss">
@import "bootstrap";

.modal-content-dark {
  background: #1e1e1e;
  color: white;
  .btn-close {
    @extend .btn-close-white;
  }
}
</style>