import React, { useMemo } from "react";

const Minutes = ({ disabled, onChange, value }) => {
  const buildOptions = useMemo(() => {
    let options = [];
    for (let i = 0; i < 60; i++) {
      options.push(
        <option key={i} id={i}>
          {(i < 10 ? "0" : "") + i}
        </option>
      );
    }
    return options;
  }, []);

  return (
    <select
      disabled={disabled === true ? true : false}
      className="minutes"
      onChange={onChange ? onChange : () => {}}
      value={value}
    >
      {buildOptions}
    </select>
  );
};

export default Minutes;
