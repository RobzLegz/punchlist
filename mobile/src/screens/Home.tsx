import React from "react";
import HomeContainer from "../components/HomeContainer";
import ScreenModule from "../modules/ScreenModule";

const Home = () => {
  return (
    <ScreenModule statusBgColor="#ffffff" barStyle="dark">
      <HomeContainer />
    </ScreenModule>
  );
};

export default Home;
