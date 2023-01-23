import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useEffect } from "react";
import {
  addedCoursesAtom,
  coursesAtom,
  programCoursesAtom,
} from "../ProgramPlannerAtoms";
import { getPrereqs, meetsPrereqs } from "./meetsPrereqs";
import { courseType } from "./ProgramSchedule";

const initScheduleCourses = (addedCourses: any, programCourses: any) => {
  // get courses to schedule
  const courses = [...addedCourses, ...programCourses];

  //sort courses by implicit year
  const sortCourses = (a: courseType, b: courseType) => {
    const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
    const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
    return courseA - courseB;
  };

  return courses.sort(sortCourses);
};

export type curScheduleType = {
  completed: courseType[];
  currentTerm: courseType[];
};
const fillTerm = (
  maxCourses: number | undefined,
  scheduleCourses: courseType[],
  courses: any,
  curSchedule: curScheduleType
): courseType[] => {
  curSchedule.currentTerm = [];
  const term = [...Array(maxCourses || 0)].map((_) => {
    for (const i in scheduleCourses) {
      const course = scheduleCourses[i];
      const prereqs = getPrereqs(course, courses);

      if (meetsPrereqs(prereqs, curSchedule) === true) {
        curSchedule.currentTerm.push(course);
        scheduleCourses.splice(parseInt(i), 1); // remove course from list
        return course;
      }
    }

    return null;
  });

  curSchedule.completed.push(...term);
  return term;
};

type ParamType = {
  id: string;
  value?: number;
  term?: string;
};
export const maxCoursesFamily = atomFamily(
  (param: ParamType) => atom({ value: param.value, term: param.term }),
  (a: ParamType, b: ParamType) => a.id === b.id
);

export const numYearsAtom = atom(6);
export const scheduleAtom = atom<any>([]);
export const unscheduledCoursesAtom = atom<courseType[]>([]);
export const setScheduleAtom = atom(null, (get, set, _) => {
  console.log("running set schedule");
  const numYears = get(numYearsAtom);
  const programCourses = get(programCoursesAtom);
  const addedCourses = get(addedCoursesAtom);
  const scheduleCourses = initScheduleCourses(programCourses, addedCourses);
  const courses = get(coursesAtom);

  const curSchedule = {
    completed: [...ASSUME_COMPLETED],
    currentTerm: [],
  };

  const schedule = [...Array(numYears)].map((_, i) => {
    const maxCourses: (number | undefined)[] = ["fall", "spring", "summer"].map(
      (term) => {
        return get(
          maxCoursesFamily({ id: `year-${i}-${term}`, value: 5, term: term })
        ).value;
      }
    );

    return {
      fall: {
        courses: fillTerm(maxCourses[0], scheduleCourses, courses, curSchedule),
        maxCourses: maxCourses[0],
      },
      spring: {
        courses: fillTerm(maxCourses[1], scheduleCourses, courses, curSchedule),
        maxCourses: maxCourses[1],
      },
      summer: {
        courses: fillTerm(maxCourses[2], scheduleCourses, courses, curSchedule),
        maxCourses: maxCourses[2],
      },
    };
  });

  set(unscheduledCoursesAtom, scheduleCourses);
  set(scheduleAtom, schedule);
});

export const useProgramSchedule = () => {
  const [schedule] = useAtom(scheduleAtom);
  const [, setSchedule] = useAtom(setScheduleAtom);

  useEffect(() => {
    setSchedule();
  }, []);

  return {
    schedule: schedule,
  };
};

const ASSUME_COMPLETED = [
  "Foundations of Math 12",
  "Mathematics 12",
  "Pre-Calculus 12",
  "Chemistry 12",
  // "MATH120", // bandaid for incorrect chem 101 course reqs scraping
];
