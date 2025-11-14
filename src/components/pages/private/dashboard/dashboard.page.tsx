import { Box } from "@mui/material";
import RolesTable from "./components/role-table.component";
import MaterialTypeTable from "./components/material-type-table.component";
import GetLoansByDateGraphic from "./components/get-loans-by-date-graphic.component";
import GetLoansTypesBorrowedGraphic from "./components/get-loans-types-borrowed.graphic";

const DashboardPage = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="flex-start"
      gap={4}
      flexWrap="wrap"
      p={4}
    >
      <Box
        sx={{
          p: 2,
          maxWidth: "45%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <GetLoansByDateGraphic />
      </Box>
      <Box
        sx={{
          p: 2,
          maxWidth: "45%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <GetLoansTypesBorrowedGraphic />
      </Box>
      <Box
        sx={{
          p: 2,
          maxWidth: "45%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <RolesTable />
      </Box>
      <Box
        sx={{
          p: 2,
          maxWidth: "45%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <MaterialTypeTable />
      </Box>
    </Box>
  );
};

export default DashboardPage;
