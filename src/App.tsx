import "./App.css";
import AppProviders from "./AppProviders";
import Button from "./components/Button";

function App() {
  return (
    <AppProviders>
      <Button />
    </AppProviders>
  );
}

export default App;

/**
 * Show the clipboard text above button
 *  - it can be clicked to copy
 * show more button lists previous acquisition names
 *  - clicking on them will copy to clipboard
 * Background flashes green when successfull, then dims
 */
