/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import cronstrue from "cronstrue/i18n";
import { metadata, loadHeaders } from "./meta";
import "./cron-builder.css";

const Cron = ({
  value,
  translateFn,
  locale,
  onChange,
  options,
  showResultText,
  showResultCron,
}) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [thisValue, setThisValue] = useState(value);
  const headers = useMemo(() => loadHeaders(options), [options]);

  const getVal = useCallback(() => {
    let val = cronstrue.toString(
      thisValue?.toString().replace(/,/g, " ").replace(/!/g, ","),
      { throwExceptionOnParseError: false, locale }
    );
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  }, [locale, thisValue]);

  const parentChange = useCallback(
    (val) => {
      onChange(val?.toString().replace(/,/g, " ").replace(/!/g, ","), getVal());
    },
    [getVal, onChange]
  );

  const setValue = useCallback(
    (value) => {
      const allHeaders = loadHeaders();
      let _value = value;
      let _selectedTab = selectedTab;
      if (_value && _value.split(" ").length === 6) {
        _value += " *";
      }
      if (!_value || _value.split(" ").length !== 7) {
        _value = ["0", "0", "00", "1/1", "*", "?", "*"];
        _selectedTab = allHeaders[0];
        parentChange(_value);
      } else {
        _value = _value.replace(/,/g, "!").split(" ");
      }
      let _values = _value;
      if (
        _values[1].search("/") !== -1 &&
        _values[2] === "*" &&
        _values[3] === "1/1"
      ) {
        _selectedTab = allHeaders[0];
      } else if (_values[3] === "1/1") {
        _selectedTab = allHeaders[1];
      } else if (_values[3].search("/") !== -1 || _values[5] === "MON-FRI") {
        _selectedTab = allHeaders[2];
      } else if (_values[3] === "?") {
        _selectedTab = allHeaders[3];
      } else if (_values[3].startsWith("L") || _values[4] === "1/1") {
        _selectedTab = allHeaders[4];
      } else {
        _selectedTab = allHeaders[0];
      }
      if (!headers.includes(_selectedTab)) {
        _selectedTab = headers[0];
      }

      setSelectedTab(_selectedTab);
      setThisValue(_value);
    },
    [headers, parentChange, selectedTab]
  );

  const tabChanged = (tab) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
      setThisValue(defaultValue(tab));
    }
  };

  const getHeaders = () =>
    headers.map((d, index) => (
      <li className="nav-item" key={index}>
        <a
          href="/#"
          className={`nav-link ${selectedTab === d ? "active" : ""}`}
          onClick={() => {
            tabChanged(d);
          }}
        >
          {translate(d)}
        </a>
      </li>
    ));

  const onValueChange = (val) => {
    if (!(val && val.length)) {
      val = ["0", "0", "00", "1/1", "*", "?", "*"];
    }
    setThisValue(val);
    parentChange(val);
  };

  const defaultValue = (tab) => {
    let defaultValCron = metadata.find((m) => m.name === tab);
    if (!defaultValCron || !defaultValCron.initialCron) {
      return;
    }
    return defaultValCron.initialCron;
  };

  const getComponent = (tab) => {
    const index = headers.indexOf(tab);
    if (metadata[index] === -1) {
      return;
    }
    let selectedMetaData = metadata.find((data) => data.name === tab);
    if (!selectedMetaData) {
      selectedMetaData = metadata[index];
    }
    if (!selectedMetaData) {
      throw new Error("Value does not match any available headers.");
    }
    const CronComponent = selectedMetaData.component;
    return (
      <CronComponent
        translate={translate}
        value={thisValue}
        onChange={onValueChange}
      />
    );
  };

  const translate = (key) => {
    let translatedText = key;
    if (translateFn) {
      translatedText = translateFn(key);
      if (typeof translatedText !== "string") {
        throw new Error("translateFn expects a string translation");
      }
    }
    return translatedText;
  };

  useEffect(() => {
    if (translateFn && !locale) {
      console.log("Warning !!! locale not set while using translateFn");
    }
  }, [translateFn, locale]);

  useEffect(() => {
    parentChange(thisValue);
  }, [thisValue, parentChange]);

  useEffect(() => {
    if (value) {
      const newVal = value.toString().replace(/,/g, " ").replace(/!/g, ",");
      if (value !== newVal) {
        setValue(value);
      }
    } else {
      setValue(defaultValue(null));
    }
    // dependency setValue will cause infinite render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="cron_builder">
      <ul className="nav nav-tabs">{getHeaders()}</ul>
      <div className="cron_builder_bordering">
        {selectedTab ? getComponent(selectedTab) : "Select a header"}
      </div>
      {showResultText && <div className="cron-builder-bg">{getVal()}</div>}
      {showResultCron && (
        <div className="cron-builder-bg">
          {thisValue?.toString().replace(/,/g, " ").replace(/!/g, ",")}
        </div>
      )}
    </div>
  );
};

export default Cron;
