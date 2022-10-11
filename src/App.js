import React, { useState } from "react";
import Cron from "./lib";
//import { HEADER } from "./lib";
import packageConf from "../package.json";

/*
const cronOptions = {
  headers: [HEADER.DAILY, HEADER.WEEKLY, HEADER.MONTHLY],
};
*/

const App = () => {
  const [value, setValue] = useState("* * * * *");
  return (
    <div>
      <div>React cron generator: V {packageConf.version}</div>
      <div>
        <Cron
          onChange={(e, text) => {
            setValue(e);
            console.log(e, text);
          }}
          value={value}
          showResultText={true}
          showResultCron={true}
          //options={cronOptions}
        />
      </div>
    </div>
  );
};

export default App;
