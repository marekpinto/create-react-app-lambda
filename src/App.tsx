import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {} from "./globals";
import { IUniversityClass } from "./types/api_types";

import { GradeTable } from "./components/GradeTable";
import { Dropdown } from "./components/Dropdown";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */
  const fetchSomeData = async () => {
    const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
      method: "GET",
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Dropdown />
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
