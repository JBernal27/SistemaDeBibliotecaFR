import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/home.page";
import UserLayout from "./components/layout/user.layout";
import { Theme } from "./context/theme/theme";
import { RoutesWithNotFound } from "./components/utilities/routes-with-not-found.utility";
import { AuthPage } from "./components/pages/auth/auth.page";
import AuthGuard from "./components/guards/auth.guard";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route element={<UserLayout />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<AuthGuard />}></Route>
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
