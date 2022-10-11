import React, { useEffect, useState } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";

const HourlyCron = ({ onChange, translate, value }) => {
  const [every, setEvery] = useState(false);

  useEffect(() => {
    if (value[2].split("/")[1] || value[2] === "*") {
      setEvery(true);
    }
  }, [value]);

  const onHourChange = (e) => {
    if (
      every &&
      ((e.target.value > 0 && e.target.value < 24) || e.target.value === "")
    ) {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = value[1];
      val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
      val[3] = "1/1";
      onChange(val);
    }
  };

  const onMinuteChange = (e) => {
    if (
      every &&
      ((e.target.value > 0 && e.target.value < 60) || e.target.value === "")
    ) {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = e.target.value;
      val[2] = value[2];
      val[3] = "1/1";
      onChange(val);
    }
  };

  const onAtHourChange = (e) => {
    let val = ["0", value[1], "*", "1/1", "*", "?", "*"];
    val[2] = `${e.target.value}`;
    onChange(val);
  };

  const onAtMinuteChange = (e) => {
    let val = ["0", "*", value[2], "1/1", "*", "?", "*"];
    val[1] = `${e.target.value}`;
    onChange(val);
  };

  return (
    <div className="tab-content">
      <div className="tab-pane active">
        <div className="well well-small">
          <input
            type="radio"
            onChange={(e) => {
              setEvery(true);
              onChange(["0", "0", "0/1", "1/1", "*", "?", "*"]);
            }}
            checked={every}
          />
          <span>{translate("Every")} </span>
          <input
            disabled={!every}
            type="Number"
            onChange={onHourChange}
            value={value[2].split("/")[1] ? value[2].split("/")[1] : ""}
          />
          <span>{translate("hour")}</span>
          <input
            disabled={!every}
            type="Number"
            onChange={onMinuteChange}
            value={value[1]}
          />
          <span>{translate("minutes(s)")}</span>
        </div>
        <div className="well well-small margin-right-0 margin-left-0">
          <div className="text_align_right" style={{ width: "100%" }}>
            <input
              type="radio"
              onChange={(e) => {
                setEvery(false);
                onChange();
              }}
              checked={!every}
            />
            <span className="">{translate("At")}</span>
            <Hour disabled={every} onChange={onAtHourChange} value={value[2]} />
            <Minutes
              disabled={every}
              onChange={onAtMinuteChange}
              value={value[1]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyCron;
