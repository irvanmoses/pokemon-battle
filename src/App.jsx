import { pokemon as items } from "./pokemon";
import Page from "./components/Page";

function App() {
  return (
    <>
      <Page items={items} />
    </>
  );
}

export default App;
