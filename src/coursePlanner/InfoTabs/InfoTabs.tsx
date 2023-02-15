import { Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { tabClasses } from "@mui/joy/Tab";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { ScrollBarStyles } from "../CourseList/CourseList";

export const TabContentDiv = styled.div`
  padding: 12px;
  box-sizing: border-box;
  height: calc(100vh - 40px);
  padding-top: 0;
  /* height: 100%; */
  width: 480px;
  overflow-y: scroll;
  ${ScrollBarStyles}
`;

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
