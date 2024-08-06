import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.scss";
import { Home } from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
