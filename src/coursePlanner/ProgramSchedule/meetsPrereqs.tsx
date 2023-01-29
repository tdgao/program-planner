import { coursesObjType } from "../ProgramPlannerAtoms";
import { courseType } from "./ProgramSchedule";
import { curScheduleType } from "./useProgramSchedule";

export const getPrereqs = (courseId: courseType, courses: coursesObjType) => {
  if (courseId === null) return;
  const course = courses[courseId];
  const prereqs = course.parsedRequirements[0];
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
export const meetsPrereqs = (
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
