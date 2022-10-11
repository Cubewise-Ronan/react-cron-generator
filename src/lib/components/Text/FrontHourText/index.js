import { styled } from "@mui/material/styles";
import Typography, { typographyClasses } from "@mui/material/Typography";

const FrontHourText = styled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    display: "inline-block",
    paddingTop: "12px",
  },
}));

export default FrontHourText;
