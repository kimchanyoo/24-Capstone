import { Header } from "layouts/Header";
import { Outlet } from "react-router-dom";
import React from "react";

export default function Container() {

    return (
      <>
          <Header/>
          <Outlet/>
      </> 
    );
}