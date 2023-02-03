import { atom } from "jotai";
import courses from "../assets/courses.json";
import programs from "../assets/programs.json";
import { currentProgramAtom } from "./AddCourse/AddCourses";

export type requirementsType = any;

export interface courseObjType {
  courseId: string;
  title: string;
  pid: string;
  parsedRequirements: requirementsType;
  htmlRequirements: string | null;
  url: string;
}
export type coursesObjType = Record<string, courseObjType>;
export const coursesAtom = atom<coursesObjType>(courses);

interface programObjType {
  programId: string;
  requirements: requirementsType;
}
type programsObjType = Record<string, programObjType>;
export const programsAtom = atom<programsObjType>(programs);

// returns all course ids that are in program
type programCoursesByYearType = Record<string, string[]>;
export const programCoursesByYearAtom = atom<programCoursesByYearType>(
  (get) => {
    const programs = get(programsAtom);
    const program = get(currentProgramAtom);

    let courses: any = {};
    const programReqs = programs[program].requirements;

    for (let k in programReqs) {
      courses[k] = [];
      const reqs =
        programReqs?.[k]?.[0]?.["Complete all of the following"] || [];
      reqs.forEach((req: requirementsType) => {
        const reqCompleteAll = req?.["Complete all of: "] || [];
        courses[k].push(...reqCompleteAll);

        // bandaid solution for missing/needing to select courses to schedule
        const reqCompleteOne = req?.["Complete 1 of: "];
        reqCompleteOne && courses[k].push(reqCompleteOne[0]);
      });
    }

    return courses;
  }
);
export const programCoursesAtom = atom<string[]>((get) => {
  const coursesByYear = get(programCoursesByYearAtom);

  const courses: string[] = [];
  Object.keys(coursesByYear).forEach((k) => {
    courses.push(...coursesByYear[k]);
  });

  return courses;
});

// Added courses
export const addedCoursesAtom = atom<string[]>([]);

export const addCourseAtom = atom(null, (get, set, course: string) => {
  course && set(addedCoursesAtom, [...get(addedCoursesAtom), course]);
});

export const removeCourseAtom = atom(null, (get, set, course) => {
  set(addedCoursesAtom, [
    ...get(addedCoursesAtom).filter((item: string) => item !== course),
  ]);
});
