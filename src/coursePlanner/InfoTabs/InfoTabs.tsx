import { Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { tabClasses } from "@mui/joy/Tab";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { ScrollBarStyles } from "../CourseList/CourseList";

const TabContentDiv = styled.div`
  padding: 12px;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  overflow-y: scroll;
  ${ScrollBarStyles}
`;
const tabListStyles = {
  "--List-padding": "0px",
  "--List-radius": "4px",
  "--List-item-minHeight": "48px",
  [`& .${tabClasses.root}`]: {
    boxShadow: "none",
    fontWeight: "md",
    [`&.${tabClasses.selected}::before`]: {
      content: '""',
      display: "block",
      position: "absolute",
      left: "var(--List-item-paddingLeft)", // change to `0` to stretch to the edge.
      right: "var(--List-item-paddingRight)", // change to `0` to stretch to the edge.
      bottom: 0,
      height: 3,
      bgcolor: "primary.400",
    },
  },
};

interface InfoTabsProps {
  courseInfoSlot: React.ReactNode;
  programInfoSlot: React.ReactNode;
}

export const currentTabAtom = atom(0);

export const InfoTabs = (props: InfoTabsProps) => {
  const { programInfoSlot, courseInfoSlot } = props;
  const [tab, setTab] = useAtom(currentTabAtom);
  return (
    <Tabs value={tab} onChange={(e, value) => setTab(value as number)}>
      <TabList variant="soft">
        <Tab>
          <Typography level="h6" fontWeight={"500"}>
            Program details
          </Typography>
        </Tab>
        <Tab>
          <Typography level="h6" fontWeight={"500"}>
            Course details
          </Typography>
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <TabContentDiv>{programInfoSlot}</TabContentDiv>
      </TabPanel>
      <TabPanel value={1}>
        <TabContentDiv>{courseInfoSlot}</TabContentDiv>
      </TabPanel>
    </Tabs>
  );
};
