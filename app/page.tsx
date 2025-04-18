import HeaderComponent from "@/compoennets/HeaderComponent";
import SearchComponent from "@/compoennets/Search/SearchComponent";
import React from "react";

const HomePage = () => {
  return (
    <div className=" container mx-auto flex flex-col gap-5">
      <HeaderComponent />
      <SearchComponent />
    </div>
  );
};

export default HomePage;
