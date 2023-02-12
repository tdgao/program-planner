import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import courses from "../assets/courses.json";
import programs from "../assets/programs.json";
import { currentProgramAtom } from "./ProgramDetails/ProgramDetails";
import { programCoursesFamily } from "./ProgramDetails/SelectProgramCourses";

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
  htmlRequirements: string | null;
  url: string;
}
export type programsObjType = Record<string, programObjType>;
export const programsAtom = atom<programsObjType>(programs);

// Added courses from program
export const currentProgramCoursesAtom = atom<string[]>((get) => {
  const defaultProgramCourses = get(defaultProgramCoursesAtom);
  const currentProgram = get(currentProgramAtom);

  return get(
    programCoursesFamily({
      program: currentProgram,
      coursesToSchedule: defaultProgramCourses,
    })
  );
});

// Added courses
export const addedCoursesAtom = atomWithStorage<string[]>(
  "addedCoursesAtom",
  []
);

export const addCourseAtom = atom(null, (get, set, course: string) => {
  course && set(addedCoursesAtom, [...get(addedCoursesAtom), course]);
});

export const removeCourseAtom = atom(null, (get, set, course) => {
  set(addedCoursesAtom, [
    ...get(addedCoursesAtom).filter((item: string) => item !== course),
  ]);
});

// returns some of the required courses in a program
// gets all "complete all of" courses, and first of "complete one of" course
// does not consider nested requirements
// TODO could use some big touch up and refactoring when im not lazy and tired
export const defaultProgramCoursesAtom = atom((get) => {
  const programs = get(programsAtom);
  const program = get(currentProgramAtom);

  let courses: string[] = [];
  const programReqs = programs[program].requirements;

  for (let year in programReqs) {
    const reqs =
      programReqs[year][0]["Complete all of the following"] ||
      programReqs[year][0]["Complete all of: "] ||
      [];

    if (typeof reqs[0] === "string") {
      addValidCourses(courses, reqs);
    } else {
      reqs.forEach((req: requirementsType) => {
        const reqCompleteAll = req["Complete all of: "]
          ? req["Complete all of: "]
          : [];
        addValidCourses(courses, reqCompleteAll);

        const reqCompleteOne = req["Complete 1 of: "];
        reqCompleteOne && addValidCourses(courses, [reqCompleteOne]);
      });
    }
  }

  return courses;
});

const coursesJson: coursesObjType = courses;
function addValidCourses(courses: string[], coursesToAdd: string[]) {
  coursesToAdd.forEach((courseId: string) => {
    if (coursesJson[courseId]) {
      courses.push(courseId);
    }
  });
}
