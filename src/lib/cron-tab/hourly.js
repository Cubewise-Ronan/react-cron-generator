import React from "react";
import EveryText from "../components/Text/EveryText";
import { TextField } from "@mui/material";

const HourlyCron = ({ onChange, translate, value }) => {
  const onHourChange = (e) => {
    if ((e.target.value > 0 && e.target.value < 24) || e.target.value === "") {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = value[1];
      val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
      val[3] = "1/1";
      onChange(val);
    }
  };

  const onMinuteChange = (e) => {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value === "") {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = e.target.value;
      val[2] = value[2];
      val[3] = "1/1";
      onChange(val);
    }
  };

  return (
    <>
      <EveryText>{translate("Every")} </EveryText>
      <TextField
        label=""
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={onHourChange}
        value={value[2].split("/")[1] ? value[2].split("/")[1] : ""}
      />
      <EveryText>{translate("hour")}</EveryText>
      <TextField
        label=""
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={onMinuteChange}
        value={value[1]}
      />
      <EveryText>{translate("minutes(s)")}</EveryText>
    </>
  );
};

export default HourlyCron;
