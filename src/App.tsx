import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/home.page";
import UserLayout from "./components/layout/user.layout";
import { Theme } from "./context/theme/theme";
import { RoutesWithNotFound } from "./components/utilities/routes-with-not-found.utility";

function App() {
  return (
    <Theme>
      <BrowserRouter>
          <RoutesWithNotFound>
            <Route element={<UserLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </RoutesWithNotFound>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
