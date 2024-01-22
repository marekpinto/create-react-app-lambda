import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, SelectChangeEvent, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID} from "./globals";
import { IUniversityClass, IStudentClass } from "./types/api_types";

import { GradeTable } from "./components/GradeTable";

interface Row {
  id: string;
  name: string;
  classId: string;
  className: string;
  semester: string;
  finalGrade: number;
}

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [rows, setRows] = useState<Row[]>([]);



  useEffect(() => {
    const fetchData = async () => {
        const headers = GET_DEFAULT_HEADERS();
        const res = await fetch(BASE_API_URL + "/class/listBySemester/fall2022?buid=" + MY_BU_ID, {
          method: "GET",
          headers: headers,
        });
        const json: IUniversityClass[] = await res.json();
        setClassList(json);
      };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrClassId((event.target.value));
    populateTable(event.target.value);
  };

  const fetchStudentIds = async (classId: string) => {
    const headers = GET_DEFAULT_HEADERS();
    const res = await fetch(BASE_API_URL + "/class/listStudents/" + classId + "?buid=" + MY_BU_ID, {
      method: "GET",
      headers: headers,
    });
    const students: string[] = await res.json();
    return students;
  };
  
  
  const fetchStudents = async (classId: string) => {
    const headers = GET_DEFAULT_HEADERS();
    const students: string[] = await fetchStudentIds(classId);

    
    return Promise.all ( students.map(async (studentId) => {
      const res = await fetch(BASE_API_URL + "/student/GetById/" + studentId + "?buid=" + MY_BU_ID, {
        method: "GET",
        headers: headers,
      });
      const studentData = await res.json();
      const student: IStudentClass = {
        ...studentData[0],
        studentId: studentId,
      };

  
      return student;
    })
    );
  }
  
  const getClassById = async (classId: string) => {
    const res = await fetch(BASE_API_URL + "/class/GetById/" + classId + "?buid=" + MY_BU_ID, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS()
    });
    return await res.json();
  }
  

  async function populateTable (classId: string) {
    const students: IStudentClass[] = await fetchStudents(classId);
    const course : IUniversityClass = await getClassById(classId);
    setRows(students.map((student) => (
      { id: student.studentId, name: student.name, classId: classId, className: course.title, semester: 'fall2022', finalGrade: 0 }
    )
    ));
  
  }
  

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
            <Select value={currClassId} onChange={handleChange} fullWidth={true} label="Class">
              {classList.map((course) => (
                <MenuItem key={course.classId} value={course.classId}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable rows={rows} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
