import React, { Component } from "react";

import Header from "./Header/Header";
import Explorer from "./FolderExplorer";
import Path from "./PathBreadcrum/path";
import Sidebar from "./Sidebar/Sidebar";

import "./Home.css";
export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid full-screen">
        <div className="row  bg-light">
          <div className="col-sm-12">
            <Header />
          </div>
        </div>
        <div className="row fit-screen">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="explorerContainer">
              <Path />
              <Explorer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}