import { Show, createSignal } from 'solid-js'
import styles from './settings.module.css'
import { setSavePending } from '../canvas/Canvas'

export const colors = {
  black: {
    name: "Black",
    value: [0, 0, 0]
  },
  grey600: {
    name: "Grey 600",
    value: [30, 30, 33]
  },
  grey500: {
    name: "Grey 500",
    value: [72, 74, 76]
  },
  grey400: {
    name: "Grey 400",
    value: [104, 108, 109]
  },
  grey300:{
    name: "Grey 300",
    value: [165, 167, 168]
  },
  grey200: {
    name: "Grey 200",
    value: [219, 219, 219]
  },
  grey100: {
    name: "Grey 100",
    value: [237, 237, 237]
  },
  white:{
    name: "White",
    value: [255, 255, 255]
  },
  blue:{
    name: "Blue",
    value: [39, 73, 255]
  },
  lightBlue:{
    name: "Light Blue",
    value: [210, 238, 252]
  },
  red:{
    name: "Red",
    value: [255, 88, 49]
  },
  lightRed:{
    name: "Light Red",
    value: [255, 231, 182]
  },
}

export const [ width, setWidth ] = createSignal(1024)
export const [ height, setHeight ] = createSignal(760)
export const [ canvasColor, setCanvasColor ] = createSignal('white')
export const [ transparentCanvas, setTransparentCanvas ] = createSignal(false)

export const [ gridColor, setGridColor ] = createSignal('blue')
export const [ columnCount, setColumnCount ] = createSignal(9)
export const [ rowCount, setRowCount ] = createSignal(9)

export const [ showGrid, setShowGrid ] = createSignal(true)
export const [ gridStyle, setGridStyle ] = createSignal('extreme1')
export const [ gridStrokeWidth, setGridStrokeWidth ] = createSignal(1)
export const [ gridOpacity, setGridOpacity ] = createSignal(100)
export const [ gridOrientation, setGridOrientation ] = createSignal("top")

export const [ patternColor, setPatternColor ] = createSignal('grey200')
export const [ patternColorOpacity, setPatternColorOpacity ] = createSignal(100)
export const [ patternSeed, setPatternSeed ] = createSignal(50)
export const [ patternDensity, setPatternDensity ] = createSignal(50)

export const gridStyles = {
  base: {
    name: 'Base',
    value: [1, 1, 1]
  },
  extreme1: {
    name: 'Extreme 1',
    value: [1.33333, 1, 0.66666]
  },
  extreme2: {
    name: 'Extreme 2',
    value: [1.66666, 1, 0.33333]
  },
  extreme3: {
    name: 'Extreme 3',
    value: [1.83333, 1, 0.16666]
  },
}

export const gridOrientationEnum = {
  top: 'Top',
  right: 'Right',
  bottom: 'Bottom',
  left: 'Left'
}

// export const gridStyles = {
//   base: [1.5, 1.5, 1.5],
//   extreme1: [2, 1.5, 1],
//   extreme2: [2.5, 1.5, 0.5],
//   extreme3: [2.75, 1.5, 0.25],
// }

const minColumns = 3
const maxColumns = 24

const minRows = 3
const maxRows = 24

export default function Settings() {


  

  const getRandomObjectEntry = (enumObject) => {
    const randomFloat = Math.random()
    const randomIndex = Math.floor(randomFloat * Object.keys(enumObject).length)
    const randomKey = Object.keys(enumObject)[randomIndex]
    // const randomItem = enumObject[randomKey]
    return randomKey
  }

  const getRandomBoolean = () => {
    const randomFloat = Math.random()
    return randomFloat >= 0.5
  }

  const getRandomInteger = (min, max) => {
    const randomFloat = Math.random()
    const randomInteger = Math.round( randomFloat * (max - min) + min )
    return randomInteger
  }

  const getRandomInterval = (min, max, interval) => {
    const randomInteger = getRandomInteger(min, max)
    const roundedInteger = Math.round(randomInteger / interval) * interval
    return roundedInteger
  }

  const randomizeSettings = () => {

    // Canvas
    setCanvasColor(getRandomObjectEntry(colors))

    // Grid
    setGridStyle(getRandomObjectEntry(gridStyles))
    setGridOrientation(getRandomObjectEntry(gridOrientationEnum))
    setColumnCount(getRandomInterval(minColumns, maxColumns, 3))
    setRowCount(getRandomInterval(minRows, maxRows, 3))

    setShowGrid(getRandomBoolean())
    setGridStrokeWidth(getRandomInteger(1, 10))
    setGridColor(getRandomObjectEntry(colors))

    // Pattern
    setPatternColor(getRandomObjectEntry(colors))
    setPatternDensity(getRandomInteger(0, 100))
    setPatternSeed(getRandomInteger(0, 100))
    // console.log('randomize')
    // console.log(getRandomInteger(12, 20))
    // console.log(getRandomObjectEntry(gridStyles))
    // console.log(getRandomInterval(minColumns, maxColumns, 3))
  }

  randomizeSettings()

  const downloadPNG = (canvas) => {
    setSavePending(true)
    console.log('download')
  }

  return (
    <div class={styles.settings}>

      <div class={styles.sectionTitle}>
        <svg class={styles.logo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 352 141">
          <path fill="currentColor" d="M93.979 46.91V0H.159v46.91h93.82ZM.159 93.82v46.91h93.82V93.82H.159Zm258-46.91h-46.91v46.91h46.91V46.91Zm-117.27 0h-46.91v46.91h46.91V46.91ZM211.249 0h-70.36v46.91h70.36V0Zm0 93.82h-70.36v46.91h70.36V93.82Zm140.73-46.91h-46.91v46.91h46.91V46.91ZM305.069 0h-46.91v46.91h46.91V0Zm0 93.82h-46.91v46.91h46.91V93.82Z"/>
        </svg>
        <h1>Graphics Generator</h1>
      </div>


      <div class={styles.settingsForm}>

        <div class="inline-fields">
          <label for="width">Width
            <input 
              type='number'
              value={width()}
              id="width"
              max="1920"
              min="400"
              oninput={(e) => {
                setWidth(parseInt(e.target.value))
              }} 
            />
          </label>

          <label for="height">Height
            <input 
              type='number'
              value={height()}
              id="height"
              max="1920"
              min="400"
              oninput={(e) => {
                setHeight(parseInt(e.target.value))
              }} 
            />
          </label>
        </div>

        <label for="canvasColor">Canvas Color:
          <select 
            id="canvasColor"
            // onchange={(e) => console.log(e)}
            oninput={(e) => {
              console.log(e.target.value)
              setCanvasColor(e.target.value)
            }}
          >
            {Object.keys(colors).map((option) => (
              <option value={option} selected={canvasColor() == option}>{colors[option].name}</option>
            ))}
          </select>
        </label>

        <label for="transparentCanvas">Transparent Canvas
          <input 
            type="checkbox"
            id="transparentCanvas"
            checked={transparentCanvas()}
            onchange={(e) => setTransparentCanvas(e.target.checked)}
          />
        </label>

        <button onclick={() => randomizeSettings()} class="button-secondary">Randomize</button>

        <div class={styles.sectionSubtitle}>
          <p>Grid</p>
        </div>

        <label for="gridStyle">Grid Style:
          <select 
            id="gridStyle"
            onchange={(e) => setGridStyle(e.target.value)}
          >
            {Object.keys(gridStyles).map((option) => (
              <option value={option} selected={gridStyle() == option}>{gridStyles[option].name}</option>
            ))}
          </select>
        </label>

        <label for="gridOrientation">Grid Orientation:
          <select 
            id="gridOrientation"
            onchange={(e) => setGridOrientation(e.target.value)}
          >
            {Object.keys(gridOrientationEnum).map((option) => (
              <option value={option} selected={gridOrientation() == option}>{gridOrientationEnum[option]}</option>
            ))}
          </select>
        </label>


        <label for="columnCount">Columns: {columnCount()}
          <input 
            type="range" 
            id="columnCount"
            value={columnCount()}
            step={3}
            min={minColumns}
            max={maxColumns}
            onchange={(e) => setColumnCount(e.target.value)}
          />
        </label>

        <label for="rowCount">Rows: {rowCount()}
          <input 
            type="range" 
            id="rowCount"
            value={rowCount()}
            step={3}
            min={minRows}
            max={maxRows}
            onchange={(e) => setRowCount(e.target.value)}
          />
        </label>



        <label for="showGrid">Show Grid
          <input 
            type="checkbox"
            id="showGrid"
            checked={showGrid()}
            onchange={(e) => setShowGrid(e.target.checked)}
          />
        </label>

        <Show when={showGrid()}>
          <label for="gridStrokeWidth">Grid Stroke:
            <input 
              type='number'
              value={gridStrokeWidth()}
              id="gridStrokeWidth"
              oninput={(e) => {
                setGridStrokeWidth(parseInt(e.target.value))
              }} 
            />
          </label>

          <label for="gridColor">Grid Color:
            <select 
              id="gridColor"
              oninput={(e) => setGridColor(e.target.value)}
            >
              {Object.keys(colors).map((option) => (
                <option value={option} selected={gridColor() == option}>{colors[option].name}</option>
              ))}
            </select>
          </label>

          <label for="gridOpacity">Grid Opacity: {gridOpacity()}
            <input 
              type="range" 
              id="gridOpacity"
              step={1}
              min={0}
              max={100}
              value={gridOpacity()}
              onchange={(e) => setGridOpacity(parseInt(e.target.value))}
            />
          </label>

        </Show>

        <div class={styles.sectionSubtitle}>
          <p>Pattern</p>
        </div>

        <label for="patternColor">Pattern Color:
            <select 
              id="patternColor"
              oninput={(e) => setPatternColor(e.target.value)}
            >
              {Object.keys(colors).map((option) => (
                <option value={option} selected={patternColor() == option}>{colors[option].name}</option>
              ))}
            </select>
          </label>

          <label for="fillOpacity">Opacity: {patternColorOpacity()}
            <input 
              type="range" 
              id="fillOpacity"
              step={1}
              min={0}
              max={100}
              value={patternColorOpacity()}
              onchange={(e) => setPatternColorOpacity(parseInt(e.target.value))}
            />
          </label>

          <label for="patternDensity">Density: {patternDensity()}
            <input 
              type="range" 
              id="patternDensity"
              step={1}
              min={0}
              max={100}
              value={patternDensity()}
              onchange={(e) => setPatternDensity(parseInt(e.target.value))}
            />
          </label>

          <label for="patternSeed">Random Seed: {patternSeed()}
            <input 
              type="range" 
              id="patternSeed"
              step={1}
              min={0}
              max={100}
              value={patternSeed()}
              onchange={(e) => setPatternSeed(parseInt(e.target.value))}
            />
          </label>


          <button onclick={() => downloadPNG()}>Download PNG</button>

      </div>
    </div>
  )
}