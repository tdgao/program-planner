import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useEffect } from "react";
import {
  addedCoursesAtom,
  coursesAtom,
  programCoursesAtom,
} from "../ProgramPlannerAtoms";
import { courseType } from "./ProgramSchedule";

const getPrereqs = (courseId: courseType, courses: any) => {
  if (courseId === null) return;
  const course = courses[courseId];
  const prereqs = course.requirements[0];
  return prereqs;
};

type reqTitleType =
  | "COMPLETE-ALL"
  | "COMPLETE-ALL-CONCURRENTLY"
  | "COMPLETE-ONE"
  | "COMPLETE-ONE-CONCURRENTLY"
  | {
      uncaught: string;
    };
const parseReqTitle = (reqTitle: string): reqTitleType => {
  if (
    reqTitle === "Complete all of the following" ||
    reqTitle === "Complete all of: "
  )
    return "COMPLETE-ALL" as reqTitleType;

  if (reqTitle === "Completed or concurrently enrolled in all of: ")
    return "COMPLETE-All-CONCURRENTLY" as reqTitleType;

  if (
    reqTitle === "Complete  1  of the following" ||
    reqTitle === "Complete 1 of: "
  )
    return "COMPLETE-ONE" as reqTitleType;

  if (reqTitle === "Completed or concurrently enrolled in 1 of: ")
    return "COMPLETE-ONE-CONCURRENTLY" as reqTitleType;

  return { uncaught: reqTitle };
};

type resultType = boolean;
const meetsPrereqs = (
  prereqs: any,
  curSchedule: curScheduleType
): resultType => {
  if (!prereqs) return true;

  const reqKey = Object.keys(prereqs)[0]; // assume one key for every object
  const reqTitle = parseReqTitle(reqKey);
  const reqs = prereqs[reqKey];

  if (reqs.length === 0) return true;

  // if req is an array objects
  if (typeof reqs[0] === "object") {
    const results: resultType[] = [];
    reqs.forEach((req: any) => {
      results.push(meetsPrereqs(req, curSchedule));
    });

    if (
      reqTitle === "COMPLETE-ALL" ||
      reqTitle === "COMPLETE-ALL-CONCURRENTLY"
    ) {
      if (results.includes(false)) return false;
    }
    if (
      reqTitle === "COMPLETE-ONE" ||
      reqTitle === "COMPLETE-ONE-CONCURRENTLY"
    ) {
      if (!results.includes(true)) return false;
    }
  }

  // if req is an array of strings
  else if (typeof reqs[0] === "string") {
    // TODO go through each req case and return true/false
    if (reqTitle === "COMPLETE-ALL") {
      // for each course, check if it is in schedule
      const results: boolean[] = [];
      reqs.forEach((course: courseType) => {
        results.push(curSchedule.completed.includes(course));
      });
      if (results.includes(false)) {
        // console.log(reqs);
        return false;
      }
    }
    if (reqTitle === "COMPLETE-ALL-CONCURRENTLY") {
      // for each course, check if it is in schedule + current term
      const results: boolean[] = [];
      reqs.forEach((course: courseType) => {
        results.push(
          curSchedule.completed.includes(course) ||
            curSchedule.currentTerm.includes(course)
        );
      });
      if (results.includes(false)) return false;
    }
    if (reqTitle === "COMPLETE-ONE") {
      // for each course, check if AT LEAST one is in schedule
      const results: boolean[] = [];
      reqs.forEach((course: courseType) => {
        results.push(curSchedule.completed.includes(course));
      });
      if (!results.includes(true)) return false;
    }
    if (reqTitle === "COMPLETE-ONE-CONCURRENTLY") {
      // for each course, check if AT LEAST one is in schedule + current term
      const results: boolean[] = [];
      reqs.forEach((course: courseType) => {
        results.push(
          curSchedule.completed.includes(course) ||
            curSchedule.currentTerm.includes(course)
        );
      });
      if (!results.includes(true)) return false;
    }
  }

  return true;
};

//sort courses by implicit year
const sortCourses = (a: courseType, b: courseType) => {
  const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
  const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
  return courseA - courseB;
};
const initScheduleCourses = (addedCourses: any, programCourses: any) => {
  // get courses to schedule
  const courses = [...addedCourses, ...programCourses];
  return courses.sort(sortCourses);
};

type curScheduleType = {
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
        return get(maxCoursesFamily({ id: i + term, value: 5, term: term }))
          .value;
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
