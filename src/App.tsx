import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/home.page";
import UserLayout from "./components/layout/user.layout";
import { Theme } from "./context/theme/theme";
import { RoutesWithNotFound } from "./components/utilities/routes-with-not-found.utility";
import { AuthPage } from "./components/pages/auth/auth.page";
import AuthGuard from "./components/guards/auth.guard";
import AdminLayout from "./components/layout/admin.layout";
import LoansPage from "./components/pages/private/loans/loans.page";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route element={<AdminLayout />}>
              {/* <Route path="/materials" element={<HomePage />} /> */}
              {/* <Route path="/authors" element={<HomePage />} /> */}
              {/* <Route path="/users" element={<HomePage />} /> */}
              <Route path="/loans" element={<LoansPage />} />
              {/* <Route path="/roles" element={<HomePage />} /> */}
            </Route>
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Theme>
  );
}

export default App;