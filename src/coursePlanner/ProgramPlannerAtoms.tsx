import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import courses from "../assets/courses.json";
import programs from "../assets/programs.json";

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
type programsObjType = Record<string, programObjType>;
export const programsAtom = atom<programsObjType>(programs);

// Added courses from program
export const programCoursesAtom = atomWithStorage<string[]>(
  "programCoursesAtom",
  []
);

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
