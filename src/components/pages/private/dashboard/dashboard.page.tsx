import { Box } from "@mui/material";
import RolesTable from "./components/role-table.component";
import MaterialTypeTable from "./components/material-type-table.component";
import GetLoansByDateGraphic from "./components/get-loans-by-date-graphic.component";
import GetLoansTypesBorrowedGraphic from "./components/get-loans-types-borrowed.graphic";

const DashboardPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      gap={3}
      flexWrap="wrap"
      p={2}
      sx={{
        "@media (max-width: 1300px)": {
          gap: 2,
          p: 1.5,
        },
        "@media (max-width: 1200px)": {
          gap: 2,
          p: 1,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          minWidth: "100%",
          "@media (min-width: 1448px)": {
            minWidth: "calc(50% - 12px)",
            maxWidth: "calc(50% - 12px)",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: "30vh",
          borderRadius: 1,
        }}
      >
        <GetLoansByDateGraphic />
      </Box>
      <Box
        sx={{
          p: 2,
          minWidth: "100%",
          "@media (min-width: 1448px)": {
            minWidth: "calc(50% - 12px)",
            maxWidth: "calc(50% - 12px)",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: "30vh",
          borderRadius: 1,
        }}
      >
        <GetLoansTypesBorrowedGraphic />
      </Box>
      <Box
        sx={{
          p: 2,
          minWidth: "100%",
          "@media (min-width: 1448px)": {
            minWidth: "calc(50% - 12px)",
            maxWidth: "calc(50% - 12px)",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: "30vh",
          borderRadius: 1,
        }}
      >
        <RolesTable />
      </Box>
      <Box
        sx={{
          p: 2,
          minWidth: "100%",
          "@media (min-width: 1448px)": {
            minWidth: "calc(50% - 12px)",
            maxWidth: "calc(50% - 12px)",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: "30vh",
          borderRadius: 1,
        }}
      >
        <MaterialTypeTable />
      </Box>
    </Box>
  );
};

export default DashboardPage;
