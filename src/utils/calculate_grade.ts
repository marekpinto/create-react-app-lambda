/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IStudentClass, IAssignmentClass } from "../types/api_types";
import {BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID} from "../globals";


// Returns a dictionary from assignment id to weight
export async function getAllAssignments(
    classId: string
  ): Promise<Record<string, number>> {
    const headers = GET_DEFAULT_HEADERS();
    const res = await fetch(BASE_API_URL + "/class/listAssignments/" + classId + "?buid=" + MY_BU_ID, {
      method: "GET",
      headers: headers,
    });
    const assignments: IAssignmentClass[] = await res.json();
    
    //Used GPT-3 to figure out how to work with dictionaries in javascript
    const assignmentDictionary: Record<string, number> = {};
    assignments.forEach((assignment) => {
      assignmentDictionary[assignment.assignmentId] = assignment.weight;
    });

    return assignmentDictionary;    
}

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: Record<string, number>,
  classId: string
): Promise<number> {

  const res = await fetch(BASE_API_URL + "/student/listGrades/" + studentID + "/" + classId + "?buid=" + MY_BU_ID, {
    method: "GET",
    headers: GET_DEFAULT_HEADERS(),
  });
  const gradeData = await res.json();
  const grades = gradeData.grades[0];
  console.log(grades);
  let finalGrade: number = 0;

  for (const assignment in classAssignments) {
    finalGrade += (classAssignments[assignment] * grades[assignment]);
  }

  return finalGrade;
}

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @param students A list of all students that we want to calculate the grades for
 * @returns Some data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string, students: IStudentClass[]): Promise<Record<string, number>> {
  const assignmentDictionary: Record<string, number> = await getAllAssignments(classID);


  //Need to use Promise.all to ensure all asynchronous calls finish (credit: GPT)
  const gradePromises = students.map(async (student) => {
    const grade = await calculateStudentFinalGrade(student.studentId, assignmentDictionary, classID);
    return { studentId: student.studentId, grade: grade };
  });

  const studentGradesArray = await Promise.all(gradePromises);


  const studentGrades: Record<string, number> = {};
  studentGradesArray.forEach(({ studentId, grade }) => {
    studentGrades[studentId] = grade;
  });

  return studentGrades;

}
