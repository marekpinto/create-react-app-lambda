import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID} from "../globals";
import { IUniversityClass } from "../types/api_types";



// This component was inspired by code from GPT-3.5
export const Dropdown = () => {
  const [classes, setClasses] = useState<IUniversityClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
        const headers = GET_DEFAULT_HEADERS();
        const res = await fetch(BASE_API_URL + "/class/listBySemester/fall2022?buid=" + MY_BU_ID, {
          method: "GET",
          headers: headers,
        });
        const json: IUniversityClass[] = await res.json();
        console.log(json);
        setClasses(json);
      };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass((event.target.value));
  };

  return (
    <Select value={selectedClass} onChange={handleChange} fullWidth={true} label="Class">
      {classes.map((course) => (
        <MenuItem key={course.classId} value={course.classId}>
          {course.title}
        </MenuItem>
      ))}
    </Select>
  );
};
