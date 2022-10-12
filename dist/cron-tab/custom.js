import React from "react";
import { TextField } from "@mui/material";

const CustomCron = ({ onChange, translate, value }) => {
  const onChangeHandle = (e) => {
    onChange(e.target.value.replace(/,/g, "!").split(" "));
  };

  return (
    <div className="well">
      {translate("Expression")}{" "}
      <TextField
        label=""
        variant="standard"
        onChange={onChangeHandle}
        value={value.toString().replace(/,/g, " ").replace(/!/g, ",")}
      />
    </div>
  );
};

export default CustomCron;
