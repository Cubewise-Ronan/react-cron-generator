import { styled } from "@mui/material/styles";
import Typography, { typographyClasses } from "@mui/material/Typography";

const EveryText = styled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    display: "inline-block",
    padding: "3px 3px 0px 0px",
  },
}));

export default EveryText;
