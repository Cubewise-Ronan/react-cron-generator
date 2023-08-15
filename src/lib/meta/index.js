import Minutes from "../cron-tab/minutes";
import Daily from "../cron-tab/daily";
import Hourly from "../cron-tab/hourly";
import Weekly from "../cron-tab/weekly";
import Monthly from "../cron-tab/monthly";
import Custom from "../cron-tab/custom";

export const HEADER = {
  MINUTES: "MINUTES",
  HOURLY: "HOURLY",
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  CUSTOM: "CUSTOM",
};

export const HEADER_VALUES = {
  MINUTES: "Minutes",
  HOURLY: "Hourly",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  CUSTOM: "Custom",
};

const defaultTabs = [
  HEADER_VALUES.MINUTES,
  HEADER_VALUES.HOURLY,
  HEADER_VALUES.DAILY,
  HEADER_VALUES.WEEKLY,
  HEADER_VALUES.MONTHLY,
  HEADER_VALUES.CUSTOM,
];

export const INITIAL_VALUES = {
  [HEADER_VALUES.MINUTES]: ["0", "0/1", "*", "*", "*", "?", "*"],
  [HEADER_VALUES.HOURLY]: ["0", "0", "0/1", "1/1", "*", "?", "*"],
  [HEADER_VALUES.DAILY]: ["0", "0", "00", "1/1", "*", "?", "*"],
  [HEADER_VALUES.WEEKLY]: ["0", "0", "00", "?", "*", "*", "*"],
  [HEADER_VALUES.MONTHLY]: ["0", "0", "00", "1", "1/1", "?", "*"],
  [HEADER_VALUES.CUSTOM]: ["*", "*", "*", "*", "*", "*", "*"],
};

export const metadata = {
  [HEADER_VALUES.MINUTES]: {
    component: Minutes,
    initialCron: INITIAL_VALUES[HEADER_VALUES.MINUTES].join(" "),
  },
  [HEADER_VALUES.HOURLY]: {
    component: Hourly,
    initialCron: INITIAL_VALUES[HEADER_VALUES.HOURLY].join(" "),
  },
  [HEADER_VALUES.DAILY]: {
    component: Daily,
    initialCron: INITIAL_VALUES[HEADER_VALUES.DAILY].join(" "),
  },
  [HEADER_VALUES.WEEKLY]: {
    component: Weekly,
    initialCron: INITIAL_VALUES[HEADER_VALUES.WEEKLY].join(" "),
  },
  [HEADER_VALUES.MONTHLY]: {
    component: Monthly,
    initialCron: INITIAL_VALUES[HEADER_VALUES.MONTHLY].join(" "),
  },
  [HEADER_VALUES.CUSTOM]: {
    component: Custom,
    initialCron: INITIAL_VALUES[HEADER_VALUES.CUSTOM].join(" "),
  },
};

const validateHeaders = (headers) => {
  const validatedHeaders = [];
  headers.forEach((header) => {
    if (!HEADER_VALUES[header]) {
      throw new Error("Invalid header " + header);
      // Avoid duplicates
    } else if (validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
      validatedHeaders.push(HEADER_VALUES[header]);
    }
  });
  return validatedHeaders;
};

/**
 * Validate and load headers
 * @param {*} options
 */
export const loadHeaders = (options) => {
  if (options) {
    if (options.headers) {
      if (!options.headers.length) {
        throw new Error("At least one header is required.");
      }
      return validateHeaders(options.headers);
    }
  }
  return defaultTabs;
};

export const getTabFromValue = (value, headers) => {
  const allHeaders = loadHeaders();
  let _values = value;
  let tabName;

  if (
    _values[1].search("/") !== -1 &&
    _values[2] === "*" &&
    _values[3] === "1/1"
  ) {
    tabName = allHeaders[0];
  } else if (_values[2].search("0/") !== -1) {
    tabName = allHeaders[1];
  } else if (_values[3].search("1/") !== -1 || _values[5] === "MON-FRI") {
    tabName = allHeaders[2];
  } else if (_values[3] === "?") {
    tabName = allHeaders[3];
  } else if (_values[3].startsWith("L") || _values[4] === "1/1") {
    tabName = allHeaders[4];
  } else {
    tabName = headers[0];
  }

  return tabName;
};
