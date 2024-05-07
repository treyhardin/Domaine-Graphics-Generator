import p5 from "p5";
import { createEffect, createSignal, onMount } from "solid-js";
import styles from './canvas.module.css'
import { canvasColor, colors, columnCount, gridColor, gridOpacity, gridOrientation, gridStrokeWidth, gridStyle, gridStyles, height, patternColor, patternColorOpacity, patternDensity, patternSeed, rowCount, showGrid, transparentCanvas, width } from "../settings/Settings";

export const [ currentCanvas, setCurrentCanvas ] = createSignal(null)
export const [ savePending, setSavePending ] = createSignal(false)

export default function Canvas() {

  let canvasWrapper
  let canvas
  let sketch

  const s = ( sketch ) => {

    const drawRectangles = () => {

      const baseWidth = width() / columnCount()
      const baseHeight = height() / rowCount()

      let positionX = 0
      let positionY = 0
      let rowIndex = 0

      let shapeWidth = baseWidth
      let shapeHeight = baseHeight

      sketch.randomSeed(patternSeed())

      let currentRatios = [ gridStyles.base.value[0], gridStyles.base.value[1], gridStyles.base.value[2] ]

      const currentStyle = gridStyles[gridStyle()].value

      // Flip Grids
      if (gridOrientation() == "right" || gridOrientation() == "bottom") currentRatios = [ currentStyle[0], currentStyle[1], currentStyle[2] ]
      if (gridOrientation() == "left" || gridOrientation() == "top") currentRatios = [ currentStyle[2], currentStyle[1], currentStyle[0] ]

      const rectangleCount = columnCount() * rowCount()

      const getShapeSize = (baseSize, subdivisions, index) => {
        let ratio = 1
        if (index < subdivisions / 3) ratio = currentRatios[0]
        if (index >= subdivisions / 3 && index < (subdivisions / 3) * 2) ratio = currentRatios[1]
        if (index >= (subdivisions / 3) * 2) ratio = currentRatios[2]
        return baseSize * ratio
      }

      for (let i = 0; i < rectangleCount; i++) {

        const columnIndex = i % columnCount()

        if (gridOrientation() == "left" || gridOrientation() == "right") {
          shapeWidth = getShapeSize(baseWidth, columnCount(), columnIndex)
        }

        if (gridOrientation() == "top" || gridOrientation() == "bottom") {
          shapeHeight = getShapeSize(baseHeight, rowCount(), rowIndex)
        }

        const randomNumber = sketch.random()

        let filledShape = false

        if (randomNumber < patternDensity() / 100) filledShape = true



        let fillAlpha = 0
        if (filledShape) {
          fillAlpha = patternColorOpacity() / 100 * 255
        }


        sketch.noStroke()
        let strokeAlpha = 0

        if (showGrid()) {
          strokeAlpha = gridOpacity() / 100 * 255
          const stroke = [...colors[gridColor()].value, strokeAlpha]
          sketch.strokeWeight(gridStrokeWidth())
          sketch.stroke(stroke)
        } 

        const fill = [...colors[patternColor()].value, fillAlpha]
        sketch.fill(fill)

        sketch.rect(positionX, positionY, shapeWidth, shapeHeight)

        if (columnIndex == columnCount() - 1) {
            positionX = 0
            positionY += shapeHeight
            rowIndex += 1
        } else {
          positionX += shapeWidth
        }
      }
      
    }
  
    sketch.setup = () => {
      sketch.createCanvas(width(), height(), canvas);
    };
  
    sketch.draw = () => {

      sketch.clear()
      let canvasAlpha = 255
      if (transparentCanvas()) {
        canvasAlpha = 0
      }
      
      sketch.background([...colors[canvasColor()].value, canvasAlpha]);

      // sketch.background([0, 0, 0, 0.0]);

      drawRectangles()
      setCurrentCanvas(canvas)

      if (savePending()) {
        sketch.saveCanvas('DomaineGraphic.png')
        setSavePending(false)
      }
      // if (showGrid()) drawGrid()
      // sketch.fill(255);

      // sketch.rect(width() / 2, height() / 2,50,50);
    };


  };

  sketch = new p5(s, canvas)

  const updateSize = (width, height) => {
    sketch.resizeCanvas(width, height)

    const widthRatio = width / canvasWrapper.offsetWidth
    const heightRatio = height / canvasWrapper.offsetHeight

    if (widthRatio > 1 || heightRatio > 1) {
      if (widthRatio > heightRatio) {
        canvas.style.scale = 1 / widthRatio
      } else {
        canvas.style.scale = 1 / heightRatio
      }
    } else {
      canvas.style.scale = 1
    }
  }

  window.addEventListener("resize", () => {
    updateSize(width(), height())
  })

  createEffect(() => {

    if (sketch) {
      updateSize(width(), height())
    }

    
  })

  return (
    <div ref={canvasWrapper} class={styles.canvasContainer}>
      <canvas ref={canvas}></canvas>
    </div>
  )
}