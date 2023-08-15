/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import cronstrue from "cronstrue/i18n";
import {
  metadata,
  loadHeaders,
  getTabFromValue,
  HEADER_VALUES,
  INITIAL_VALUES,
} from "./meta";
import "./cron-builder.css";

const Cron = ({
  value,
  translateFn,
  locale,
  onChange,
  options,
  showResultText,
  showResultCron,
  className,
  id,
}) => {
  const headers = loadHeaders(options);
  const [currentTab, setCurrentTab] = useState(headers[0]);
  const [values, setValues] = useState(null);
  const currentValue = useMemo(
    () => (values ? values[currentTab] : null),
    [values, currentTab]
  );

  const getVal = useCallback(() => {
    let val = cronstrue.toString(
      currentValue?.toString().replace(/,/g, " ").replace(/!/g, ","),
      { throwExceptionOnParseError: false, locale }
    );
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  }, [locale, currentValue]);

  const parentChange = useCallback(
    (val) => {
      onChange(val?.toString().replace(/,/g, " ").replace(/!/g, ","), getVal());
    },
    [getVal, onChange]
  );

  const updateValues = (tabName, val) => {
    setValues((prev) => ({
      ...prev,
      [tabName]: val,
    }));
    parentChange(val);
  };

  const setValue = useCallback(
    (value) => {
      let _value = value;
      if (_value && _value.split(" ").length === 6) {
        _value += " *";
      }
      if (!_value || _value.split(" ").length !== 7) {
        _value = INITIAL_VALUES[HEADER_VALUES.DAILY];
      } else {
        _value = _value.replace(/,/g, "!").split(" ");
      }
      const tabName = getTabFromValue(_value, headers);
      setCurrentTab(tabName);
      setValues({
        ...JSON.parse(JSON.stringify(INITIAL_VALUES)),
        [tabName]: _value,
      });
    },
    [headers, setCurrentTab, setValues]
  );

  const tabChanged = (event, tabIndex) => {
    const newTabName = headers[tabIndex];
    if (currentTab !== newTabName) {
      setCurrentTab(newTabName);
      updateValues(newTabName, values[newTabName]);
    }
  };

  const getHeaders = () =>
    headers.map((d) => <Tab key={d} label={translate(d)} />);

  const onValueChange = (val) => {
    if (!(val && val.length)) {
      val = INITIAL_VALUES[HEADER_VALUES.DAILY];
    }
    updateValues(currentTab, val);
  };

  const defaultValue = (tabName) => {
    let defaultValCron = metadata[tabName];
    if (!defaultValCron || !defaultValCron.initialCron) {
      return;
    }
    return defaultValCron.initialCron;
  };

  const getComponent = (tabName) => {
    if (!tabName || !values) return;

    let selectedMetaData = metadata[tabName];
    if (!selectedMetaData) {
      throw new Error("Value does not match any available headers.");
    }
    const CronComponent = selectedMetaData.component;
    return (
      <CronComponent
        translate={translate}
        value={values[tabName]}
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
    if (!id) return;
    setValues(null);
  }, [id, setValues]);

  useEffect(() => {
    if (translateFn && !locale) {
      console.warn("Warning !!! locale not set while using translateFn");
    }
  }, [translateFn, locale]);

  useEffect(() => {
    // dont do setValue again when values is all set
    if (values) return;
    setValue(value ? value : defaultValue(headers[0]));
  }, [value, values, headers, setValue]);

  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      className={`cronContainer ${className}`}
    >
      <Tabs
        value={headers.indexOf(currentTab)}
        onChange={tabChanged}
        aria-label="Time Header"
      >
        {getHeaders()}
      </Tabs>
      <div className="cron_builder_bordering">
        {currentTab ? getComponent(currentTab) : "Select a header"}
      </div>
      {showResultText && <div className="cron-builder-bg">{getVal()}</div>}
      {showResultCron && (
        <div className="cron-builder-bg">
          {currentValue?.toString().replace(/,/g, " ").replace(/!/g, ",")}
        </div>
      )}
    </Box>
  );
};

export default Cron;
