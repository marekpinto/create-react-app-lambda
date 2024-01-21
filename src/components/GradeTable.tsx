import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */

//Citation: This code based on example code at https://mui.com/x/react-data-grid/

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

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = () => {
  return (
    <Box sx={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={dummyData()}
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

