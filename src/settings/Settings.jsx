import { Show, createSignal } from 'solid-js'
import { height, setHeight, setWidth, width } from '../canvas/Canvas'
import styles from './settings.module.css'

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

export const [ canvasColor, setCanvasColor ] = createSignal('white')
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



export default function Settings() {

  return (
    <div class={styles.settings}>
      <h1>Settings</h1>

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
        

        <p>Grid</p>

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
            step={3}
            min={3}
            max={24}
            onchange={(e) => setColumnCount(e.target.value)}
          />
        </label>

        <label for="rowCount">Rows: {rowCount()}
          <input 
            type="range" 
            id="rowCount"
            step={3}
            min={3}
            max={24}
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

        
        <p>Pattern</p>

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

          <label for="patternSeed">Seed: {patternSeed()}
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

      </div>
    </div>
  )
}