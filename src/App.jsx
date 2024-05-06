import styles from './App.module.css';
import Canvas from './canvas/Canvas';
import Settings from './settings/Settings';

function App() {
  return (
    <div class={styles.App}>
        <Canvas />
        <Settings />
    </div>
  );
}

export default App;
