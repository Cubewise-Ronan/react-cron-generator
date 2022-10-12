import React from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";
import FrontHourText from "../components/Text/FrontHourText";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";

const WeeklyCron = ({ onChange, translate, value }) => {
  const onAtHourChange = (e) => {
    let val = value;
    val[0] = "0";
    val[2] = `${e.target.value}`;
    onChange(val);
  };

  const onAtMinuteChange = (e) => {
    let val = value;
    val[0] = "0";
    val[1] = `${e.target.value}`;
    onChange(val);
  };

  const onCheck = (e) => {
    let val = value;
    val[0] = "0";
    if (e.target.checked) {
      onDayChecked(val, e);
    } else {
      onDayUnChecked(val, e);
    }
    onChange(val);
  };

  const onDayChecked = (val, e) => {
    val[2] = `${val[2]}`.split("/").length > 1 ? "0" : val[2].toString();
    val[3] = "?";
    val[4] = "*";
    if (val[5] === "*" || val[5] === "?" || val[5] === "MON-FRI") {
      val[5] = e.target.value;
    } else {
      val[5] = val[5] + "!" + e.target.value;
    }
  };

  const onDayUnChecked = (val, e) => {
    val[5] = val[5].split("!");
    if (val[5].length > 1) {
      val[5].splice(val[5].indexOf(e.target.value), 1);
      val[5] = val[5].toString().replace(/,/g, "!");
    } else {
      val[5] = "*";
    }
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("MON") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="MON"
                />
              }
              label={translate("Monday")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("WED") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="WED"
                />
              }
              label={translate("Wednesday")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("FRI") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="FRI"
                />
              }
              label={translate("Friday")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("SUN") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="SUN"
                />
              }
              label={translate("Sunday")}
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("TUE") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="TUE"
                />
              }
              label={translate("Tuesday")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("THU") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="THU"
                />
              }
              label={translate("Thursday")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={value[5].search("SAT") !== -1 ? true : false}
                  onChange={(e) => onCheck(e)}
                  value="SAT"
                />
              }
              label={translate("Saturday")}
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        <FrontHourText>{translate("Start time")}</FrontHourText>
        <Hour onChange={onAtHourChange} value={value[2]} />
        <Minutes onChange={onAtMinuteChange} value={value[1]} />
      </Box>
    </>
  );
};

export default WeeklyCron;
