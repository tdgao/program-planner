import { HelpOutline } from "@mui/icons-material";
import {
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useState } from "react";
import styled from "styled-components";
import { ScrollBarStyles } from "./CourseList/CourseList";

export const modalOpenAtom = atomWithStorage("ModalOpen", true);

const ListsDiv = styled.div`
  ul,
  ol {
    margin: 0;
    padding-left: 28px;
  }
  li {
    margin: 0;
    margin-bottom: 4px;
  }
`;
const LazySpacingDiv = styled.div`
  height: 12px;
`;

const tipsHtml = (
  <ul>
    <li>
      Hover on a course to see it’s full title (all icons should have tooltips)
    </li>
    <li>
      In course details, a checkmark is displayed next to a course if it is
      scheduled
    </li>
    <li>
      If the course cannot be schedule for whatever reason, you can force the
      course to be scheduled by setting it’s schedule slot
    </li>
  </ul>
);

const howToUseHtml = (
  <ol>
    <li>Select your program</li>
    <li>Add the courses you want to take</li>
    <li>Set the schedule slot of each course you’ve already completed</li>
    <li>Play around with the options!</li>
  </ol>
);

export const ProgramPlannerModal = () => {
  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalDialog
        // @ts-ignore
        sx={{
          display: "grid",
          gap: "20px",
          overflow: "auto",
          maxHeight: "calc(100vh - 50px)",
          ...ScrollBarStyles,
        }}
      >
        <ModalClose sx={{ zIndex: "1" }} />
        <Sheet sx={{ display: "grid", gap: "8px" }}>
          <Typography level="h3">UVic Program Planner 📅</Typography>
          <Typography>An app to help schedule your program courses.</Typography>
          <Typography>
            The schedule is automatically filled by following parameters: course
            prerequisites, course offering, and max courses in a term.
          </Typography>
        </Sheet>

        <ListsDiv>
          <Typography sx={{ display: "grid", gap: "8px" }}>
            <Typography level="h3" endDecorator={<HelpOutline />}>
              How to use
            </Typography>
            {howToUseHtml}
            <Button
              color="info"
              variant="soft"
              onClick={() => setShowInfo((prev) => !prev)}
              sx={{ width: "max-content" }}
            >
              Additional tip and info
            </Button>
            {showInfo && (
              <Sheet
                color="info"
                variant="outlined"
                sx={{ padding: "12px", borderRadius: "12px" }}
              >
                <Typography level="h6">Tips</Typography>

                <Typography textColor="neutral.700">
                  {tipsHtml}
                  <LazySpacingDiv />
                </Typography>
                <Typography level="h6">
                  How the prerequisite check works
                </Typography>
                <Typography textColor="neutral.700">
                  <ul>
                    <li>
                      A web scraper is used to get the prerequisites from UVic
                    </li>
                    <li>
                      The algorithm only checks “Complete all of…” and “Complete
                      1 of…” requirements and sees if the required courses are
                      scheduled
                    </li>
                  </ul>
                  <LazySpacingDiv />
                </Typography>
                <Typography level="h6">
                  How the course offering data works
                </Typography>
                <Typography textColor="neutral.700">
                  <ul>
                    <li>
                      Data is pulled on course offerings in that term for the
                      previous 5 years
                    </li>
                    <li>
                      If it was offered in all 5 years then it is marked as
                      “offered”
                    </li>
                    <li>
                      If it was offered in at least once in 5 years the it is
                      “potentially offered”
                    </li>
                    <li>
                      If it was not offered in the previous 5 years then it is
                      “not offered”
                    </li>
                  </ul>
                </Typography>
              </Sheet>
            )}
          </Typography>
        </ListsDiv>
      </ModalDialog>
    </Modal>
  );
};
