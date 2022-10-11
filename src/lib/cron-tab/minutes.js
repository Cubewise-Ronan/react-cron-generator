import React from "react";
import { TextField } from "@mui/material";
import EveryText from "../components/Text/EveryText";

const MinutesCron = ({ onChange, translate, value }) => {
  const onChangeHandle = (e) => {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value === "") {
      let val = ["0", "*", "*", "*", "*", "?", "*"];
      val[1] = e.target.value ? `0/${e.target.value}` : val[1];
      onChange(val);
    }
  };

  return (
    <>
      <EveryText>{translate("Every")}</EveryText>{" "}
      <TextField
        label=""
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={onChangeHandle}
        value={value && value.length > 1 ? value[1].split("/")[1] : value}
        min={1}
        max={60}
      />{" "}
      <EveryText>{translate("minute(s)")}</EveryText>
    </>
  );
};

export default MinutesCron;
