# UVic Program Planner

This is an app to help schedule your program courses. The schedule is automatically filled by following parameters: course prerequisites, course offering, and max courses to take in a term.

To use the program planner

1. Select your program
2. Add the courses you want to take
3. Ensure your courses are scheduled by clicking on the course and checking prereqs and offerings
   - **Note:** if the course cannot be schedule for whatever reason, you can override the auto scheduling by setting it’s schedule slot
4. Play around with the options!

# Development

This project is built with [React](https://reactjs.org), uses [JoyUI](https://mui.com/joy-ui/getting-started/overview/) as the component library, [Styled Components](https://styled-components.com) for styling, and [Jotai](https://jotai.org) for state management. The app is deployed on [Firebase](https://firebase.google.com).

To run the project, clone this repo and run `npm i && npm start`

The course offering, program, and courses data are all stored on the client.

- Course offerings are pulled from an older script - [Github](https://github.com/sfaigan/degree-planner/blob/dev-ts/scripts/get_semesters.py)
- Programs are scraped by me - [Github](https://github.com/tdgao/uvic-prereqs-scraper/blob/main/scraper.py)
- Courses data comes from Vikelabs course scraper - [Github](https://github.com/VikeLabs/uvic-course-scraper)

[Excalidraw referance](https://excalidraw.com/#json=LNmh63inArqDV1oZFxv8z,xWrLIO0HdLmpdalNJKvVpQ) during the design/ideating phase

[Notion reference](https://www.notion.so/Program-Planner-223e4ae0749348f0853ded690acdc8b9) (this is a random shitty notes page, take things here with a grain of salt)
