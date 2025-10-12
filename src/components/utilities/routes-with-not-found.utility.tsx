import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404/404.page";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const RoutesWithNotFound = ({ children }: IProps) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

