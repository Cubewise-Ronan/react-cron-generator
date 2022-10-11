import React from "react";

const MinutesCron = ({ onChange, translate, value }) => {
  const onChangeHandle = (e) => {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value === "") {
      let val = ["0", "*", "*", "*", "*", "?", "*"];
      val[1] = e.target.value ? `0/${e.target.value}` : val[1];
      onChange(val);
    }
  };

  return (
    <div className="well">
      {translate("Every")}{" "}
      <input
        type="Number"
        onChange={onChangeHandle}
        value={value && value.length > 1 ? value[1].split("/")[1] : value}
        min={1}
        max={60}
      />{" "}
      {translate("minute(s)")}
    </div>
  );
};

export default MinutesCron;
