# UVic Program Planner

This is an app to help schedule your program courses. The schedule is automatically filled by following parameters: course prerequisites, course offering, and max courses in a term.

# Development

This project is built with [React](https://reactjs.org), uses [JoyUI](https://mui.com/joy-ui/getting-started/overview/) as the component library, [Styled Components](https://styled-components.com) for styling, and [Jotai](https://jotai.org) for state management. The app is deployed on [Firebase](https://firebase.google.com).

To run the project, clone this repo and run `npm i && npm start`

The course offering, program, and courses data are all stored on the client.

- Course offerings are pulled from an older script - [Github](https://github.com/sfaigan/degree-planner/blob/dev-ts/scripts/get_semesters.py)
- Programs are scraped by me - [Github](https://github.com/tdgao/uvic-prereqs-scraper/blob/main/scraper.py)
- Courses data comes from Vikelabs course scraper - [Github](https://github.com/VikeLabs/uvic-course-scraper)

[Excalidraw referance](https://excalidraw.com/#json=LNmh63inArqDV1oZFxv8z,xWrLIO0HdLmpdalNJKvVpQ) during the design/ideating phase

[Notion reference](https://www.notion.so/Program-Planner-223e4ae0749348f0853ded690acdc8b9) (this is a random shitty notes page, take things here with a grain of salt)

# How to use the app

To use the program planner

1. Select your program
2. Add the courses you want to take
3. Set the schedule slot of each course you’ve already completed
4. Play around with the options!

Tips and info

- Hover on a course to see it’s full title (all icons should have tooltips)
- In course details, a checkmark is displayed next to a course if it is scheduled
- If the course cannot be schedule for whatever reason, you can force the course to be scheduled by setting it’s schedule slot
- How the prerequisite check works
  - A web scraper is used to get the prerequisites from UVic
  - The algorithm only checks “Complete all of…” and “Complete 1 of…” requirements and sees if the required courses are scheduled
- How the course offering data works
  - Data is pulled on course offerings in that term for the previous 5 years
  - If it was offered in all 5 years then it is marked as “offered”
  - If it was offered in at least once in 5 years the it is “potentially offered”
  - If it was not offered in the previous 5 years then it is “not offered”
