import { atom } from "jotai";
import courses from "../assets/courses.json";
import programs from "../assets/programs.json";

// TODO read jotai typescript section
export const coursesAtom = atom<any>(courses);
export const programsAtom = atom<any>(programs);

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
        const reqCourses = req["Complete all of: "]
          ? req["Complete all of: "]
          : [];
        courses.push(...reqCourses);
      });
    }
  }

  return courses;
});

// Added courses
export const addedCoursesAtom = atom<any>([]);

export const addCourseAtom = atom(null, (get, set, course: string) => {
  course &&
    !get(addedCoursesAtom).includes(course) && // do not add duplicate
    set(addedCoursesAtom, [...get(addedCoursesAtom), course]);
});

export const removeCourseAtom = atom(null, (get, set, course) => {
  set(addedCoursesAtom, [
    ...get(addedCoursesAtom).filter((item: any) => item != course),
  ]);
});
