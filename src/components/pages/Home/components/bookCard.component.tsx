import { Box, Card, CardContent, Typography } from "@mui/material";
import { IMaterial } from "../../../../common/interfaces/material.interface";
import noImageAvailable from "../../../../assets/images/image-not-found.jpg";
import { Dispatch, SetStateAction } from "react";

interface MaterialCardProps {
  material: IMaterial;
  setViewOpen: Dispatch<SetStateAction<boolean>>
  setViewMaterial: Dispatch<SetStateAction<IMaterial | null>>
}

export default function MaterialCard({ material, setViewOpen, setViewMaterial }: MaterialCardProps) {
  return (
    <Card
      sx={{
        height: 525,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-24px) scale(1.05)",
          boxShadow: 3,
        },
        position: "relative",
        cursor: "pointer",
      }}
      elevation={1}
      onClick={() => {
        setViewMaterial(material);
        setViewOpen(true);
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#f4f4f4",
          }}
        >
          <img
            src={material.img || noImageAvailable}
            alt={material.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            padding: "8px 0px",
          }}
        >
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              color: "primary.dark",
            }}
          >
            {material.title}
          </Typography>
          <Typography color="text.secondary">{material.author.name}</Typography>
          <Box
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "secondary.main",
              color: "white",
              px: 1,
              borderRadius: 1,
              zIndex: 2,
            }}
          >
            <Typography color="text.secondary">{material.material_type.description}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
