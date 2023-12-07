import React from "react";
import CreateContainer from "../components/create/CreateContainer";
import ScreenModule from "../modules/ScreenModule";

const Create = () => {
  return (
    <ScreenModule statusBgColor="#ffffff" barStyle="dark">
      <CreateContainer />
    </ScreenModule>
  );
};

export default Create;
