import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
  addedCoursesAtom,
  coursesAtom,
  currentProgramAtom,
  programCoursesAtom,
} from "../ProgramPlannerAtoms";
import { courseType, termType, yearType } from "./ProgramSchedule";

const numYearsAtom = atom(5);
const initSchedule = (numYears: number): yearType[] => {
  return Array(numYears).fill({
    fall: {
      courses: [],
      maxCourses: 6,
    },
    spring: {
      courses: [],
      maxCourses: 6,
    },
    summer: {
      courses: [],
      maxCourses: 6,
    },
  });
};

//sort courses by implicit year
const sortCourses = (a: courseType, b: courseType) => {
  const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
  const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
  return courseA - courseB;
};
const initScheduleCourses = (addedCourses: any, programCourses: any) => {
  // get courses to schedule
  let courses = [...addedCourses, ...programCourses];
  return courses.sort(sortCourses);
};

const meetsPrereqs = (course: courseType): boolean => {
  return Math.random() > 0.5;
};

const fillTerm = (
  term: termType,
  scheduleCourses: courseType[]
): courseType[] => {
  return [...Array(term.maxCourses)].map((_, index) => {
    for (const i in scheduleCourses) {
      const course = scheduleCourses[i];

      if (meetsPrereqs(course)) {
        scheduleCourses.splice(parseInt(i), 1); // remove course from list
        return course;
      }
    }

    return null;
  });
};

// schedule atom

export const useProgramSchedule = () => {
  const [numYears] = useAtom(numYearsAtom);
  const [programCourses] = useAtom(programCoursesAtom);
  const [addedCourses] = useAtom(addedCoursesAtom);

  const emptySchedule = initSchedule(numYears);
  const scheduleCourses = initScheduleCourses(programCourses, addedCourses);

  let schedule = null;
  schedule = emptySchedule.map((year) => {
    // TODO this part better?
    return {
      fall: {
        courses: fillTerm(year.fall, scheduleCourses),
        maxCourses: year.fall.maxCourses,
      },
      spring: {
        courses: fillTerm(year.spring, scheduleCourses),
        maxCourses: year.spring.maxCourses,
      },
      summer: {
        courses: fillTerm(year.summer, scheduleCourses),
        maxCourses: year.summer.maxCourses,
      },
    };
  });

  return { schedule: schedule };
};
