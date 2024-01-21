import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID} from "../globals";


// This component was inspired by code from GPT-3.5
export const Dropdown = () => {
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
        const headers = GET_DEFAULT_HEADERS();
        const res = await fetch(BASE_API_URL + "/class/listBySemester/fall2022?buid=" + , {
          method: "GET",
        });
        const json = await res.json();
        setClasses(json);
      };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass(event.target.value as string);
  };

  return (
    <Select value={selectedClass} onChange={handleChange} fullWidth={true} label="Class">
      {classes.map((course: string) => (
        <MenuItem key={course} value={course}>
          {course}
        </MenuItem>
      ))}
    </Select>
  );
};
