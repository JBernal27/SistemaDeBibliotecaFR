import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/home.page";
import UserLayout from "./components/layout/user.layout";
import { Theme } from "./context/theme/theme";
import { RoutesWithNotFound } from "./components/utilities/routes-with-not-found.utility";
import { AuthPage } from "./components/pages/auth/auth.page";
import AuthGuard from "./components/guards/auth.guard";
import AdminLayout from "./components/layout/admin.layout";
import AuthorsPage from "./components/pages/private/authors/authors.page";
import MaterialsTable from "./components/pages/private/materials/materials.page";
import LoansPage from "./components/pages/private/loans/loans.page";
import Userspage from "./components/pages/private/users/users.page";
import DashboardPage from "./components/pages/private/dashboard/dashboard.page";
import ProfilePage from "./components/pages/private/profile/profile.page";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route element={<AuthGuard />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route element={<AuthGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/materials" element={<MaterialsTable />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/users" element={<Userspage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
