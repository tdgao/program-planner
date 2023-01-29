import { atom } from "jotai";
import courses from "../assets/courses.json";
import programs from "../assets/programs.json";

export interface courseObjType {
  courseId: string;
  title: string;
  pid: string;
  parsedRequirements: any;
  url: string;
}
export type coursesObjType = Record<string, courseObjType>;
export const coursesAtom = atom<coursesObjType>(courses);

interface programObjType {
  programId: string;
  requirements: any;
}
type programsObjType = Record<string, programObjType>;
export const programsAtom = atom<programsObjType>(programs);

// Program courses
export const currentProgramAtom = atom(
  "Software Engineering (Bachelor of Software Engineering)"
);

export const programCoursesAtom = atom((get) => {
  const programs = get(programsAtom);
  const program = get(currentProgramAtom);

  // return all course ids that are in program
  // grabbing only "Complete all of: " ones
  // TODO refactor object handling
  let courses: any = [];
  const programReqs = programs[program].requirements;

  for (let k in programReqs) {
    if (programReqs.hasOwnProperty(k)) {
      programReqs[k][0]["Complete all of the following"].forEach((req: any) => {
        const reqCompleteAll = req["Complete all of: "]
          ? req["Complete all of: "]
          : [];
        courses.push(...reqCompleteAll);

        // bandaid solution for missing/needing to select courses to schedule
        const reqCompleteOne = req["Complete 1 of: "];
        reqCompleteOne && courses.push(reqCompleteOne[0]);
      });
    }
  }

  return courses;
});

// Added courses
export const addedCoursesAtom = atom<any>([]);

export const addCourseAtom = atom(null, (get, set, course: string) => {
  course && set(addedCoursesAtom, [...get(addedCoursesAtom), course]);
});

export const removeCourseAtom = atom(null, (get, set, course) => {
  set(addedCoursesAtom, [
    ...get(addedCoursesAtom).filter((item: any) => item !== course),
  ]);
});
