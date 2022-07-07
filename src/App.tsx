import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Com from "./app.styles";
// import { Fixture } from "./components/fixture";
// import { Fixtures } from "./pages/fixtures/Fixtures";
import { Region } from "./pages/regions";

const App: React.FC<{}> = (props) => {
  return (
    <Com.Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Region />}>
            {/* <Route path="teams" element={<Fixtures />}>
              <Route path=":teamId" element={<Fixture />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Com.Wrapper>
  );
};

export default App;
