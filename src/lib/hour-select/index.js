import React, { useMemo } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

const Hour = ({ disabled, onChange, value }) => {
  const buildOptions = useMemo(() => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      options.push(
        <MenuItem key={i} id={i} value={i}>
          {(i < 10 ? "0" : "") + i}
        </MenuItem>
      );
    }
    return options;
  }, []);

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
      <Select
        disabled={disabled === true ? true : false}
        onChange={onChange ? onChange : () => {}}
        value={Number(value)}
      >
        {buildOptions}
      </Select>
    </FormControl>
  );
};

export default Hour;
