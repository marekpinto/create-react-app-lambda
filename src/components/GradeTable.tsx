import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID} from "../globals";
import { IStudentClass, IUniversityClass } from "../types/api_types";
import { PowerInput } from '@mui/icons-material';


/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */

//Citation: This code based on example code at https://mui.com/x/react-data-grid/

interface Row {
  id: string;
  name: string;
  classId: string;
  className: string;
  semester: string;
  finalGrade: number;
}

export function dummyData() {
  return [
    { id: "U125", name:"Hirluin", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 395.8 },
    { id: "U127", name:"Marek", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 128.7 },
    { id: "U130", name:"Bard", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 458.3 },
    { id: "U131", name:"Charlie", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 523.4 },
    { id: "U132", name:"David", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 633.3 },
    { id: "U133", name:"Fargo", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 553.2 },
    { id: "U134", name:"Joyce", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 400 },
    { id: "U135", name:"Brown", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 458.2 },
    { id: "U136", name:"Jimmy", classId: 'C125', className: 'ST 519', semester: 'fall2022', finalGrade: 390.2 },
  ];
}

const fetchStudentIds = async (classId: string) => {
  const headers = GET_DEFAULT_HEADERS();
  const res = await fetch(BASE_API_URL + "/class/listStudents/" + classId + "?buid=" + MY_BU_ID, {
    method: "GET",
    headers: headers,
  });
  const students: string[] = await res.json();
  return students;
};

//Promise.all to wait for all promises to be resolved before returning (credit: ChatGPT)
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
      ...studentData,
      studentId: studentId,
    };

    return student;
  })
  );
}

const getClassById = async (classId: string) => {
  const res = await fetch(BASE_API_URL + "/class/GetById" + classId + "?buid=" + MY_BU_ID, {
    method: "GET",
    headers: GET_DEFAULT_HEADERS()
  });
  return await res.json();
}



const columns: GridColDef[] = [
  { field: 'id', headerName: 'Student ID', width: 90 },
  {
    field: 'name',
    headerName: 'Student Name',
    width: 150,
  },
  {
    field: 'classId',
    headerName: 'Class ID',
    width: 100,
  },
  {
    field: 'className',
    headerName: 'Class Name',
    width: 120,
  },
  {
    field: 'semester',
    headerName: 'Semester',
    width: 130,
  },
  {
    field: 'finalGrade',
    headerName: 'Final Grade',
    width: 90,
    type: 'number',

  },
];

interface Props {
  classId: string;
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable: React.FC<Props> = ({classId}) => {
  const [rows, setRows] = useState<Row[]>([]);

  async function populateTable (classId: string) {
    const students: IStudentClass[] = await fetchStudents(classId);
    const course : IUniversityClass = await getClassById(classId);
    setRows(students.map((student) => (
      { id: student.studentId, name: student.name, classId: classId, className: course.title, semester: 'fall2022', finalGrade: 0 }
    )
    ));
  
  }

  useEffect(() => {
    populateTable(classId);
  }, []);

  return (
    <Box sx={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              page: 0, pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10,20,50,100]}

      />
    </Box>
  );
};

