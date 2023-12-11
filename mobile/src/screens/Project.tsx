import React from "react";
import ProjectContainer from "../components/ProjectContainer";
import ScreenModule from "../modules/ScreenModule";

const ProjectScreen = () => {
  return (
    <ScreenModule statusBgColor="#ffffff" barStyle="dark">
      <ProjectContainer />
    </ScreenModule>
  );
};

export default ProjectScreen;
