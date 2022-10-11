import React from "react";

const CustomCron = ({ onChange, translate, value }) => {
  const onChangeHandle = (e) => {
    onChange(e.target.value.replace(/,/g, "!").split(" "));
  };

  return (
    <div className="well">
      {translate("Expression")}{" "}
      <input
        type="text"
        onChange={onChangeHandle}
        value={value.toString().replace(/,/g, " ").replace(/!/g, ",")}
      />
    </div>
  );
};

export default CustomCron;
