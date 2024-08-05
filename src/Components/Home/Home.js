import React, { Component } from "react";
import Header from "./Header/Header";
import Explorer from "./FolderExplorer";
import Path from "./PathBreadcrum/path";
import Sidebar from "./Sidebar/Sidebar";

import "./Home.css";

export default class Home extends Component {
  state = {
    items: [],
    newFileName: "",
    newDirName: "",
    previewContent: "",
    renameItemName: "",
    selectedItemId: null,
    selectedDirectoryId: null, // Add this line
  };

  handleCreateFile = () => {
    const { items, newFileName, selectedDirectoryId } = this.state;
    if (newFileName) {
      const newItems = items.map((item) => {
        if (item.id === selectedDirectoryId && item.type === "directory") {
          return {
            ...item,
            children: [
              ...(item.children || []),
              { id: Date.now(), name: newFileName, type: "file", content: "" },
            ],
          };
        }
        return item;
      });
      this.setState({
        items: newItems,
        newFileName: "",
      });
    }
  };

  handleCreateDirectory = () => {
    const { items, newDirName, selectedDirectoryId } = this.state;
    if (newDirName) {
      const newItems = items.map((item) => {
        if (item.id === selectedDirectoryId && item.type === "directory") {
          return {
            ...item,
            children: [
              ...(item.children || []),
              { id: Date.now(), name: newDirName, type: "directory", children: [] },
            ],
          };
        }
        return item;
      });
      this.setState({
        items: newItems,
        newDirName: "",
      });
    }
  };

  handleDeleteItem = (id) => {
    const deleteRecursive = (items) =>
      items
        .map((item) => ({
          ...item,
          children: item.children ? deleteRecursive(item.children) : [],
        }))
        .filter((item) => item.id !== id);

    this.setState({
      items: deleteRecursive(this.state.items),
    });
  };

  handleRenameItem = (id) => {
    const { items, renameItemName } = this.state;
    const renameRecursive = (items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, name: renameItemName };
        } else if (item.children) {
          return { ...item, children: renameRecursive(item.children) };
        }
        return item;
      });

    this.setState({
      items: renameRecursive(items),
      renameItemName: "",
      selectedItemId: null,
    });
  };

  handleSelectItem = (id, type) => {
    if (type === "directory") {
      this.setState({
        selectedDirectoryId: id,
      });
    }
    this.setState({
      selectedItemId: id,
    });
  };

  handlePreviewFile = (content) => {
    this.setState({
      previewContent: content,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { items, newFileName, newDirName, previewContent, renameItemName, selectedItemId } = this.state;

    return (
      <div className="container-fluid full-screen">
        <div className="row bg-light">
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
              <div className="controls">
                <input
                  type="text"
                  name="newFileName"
                  value={newFileName}
                  placeholder="New File Name"
                  onChange={this.handleChange}
                />
                <button onClick={this.handleCreateFile}>Create File</button>
                <input
                  type="text"
                  name="newDirName"
                  value={newDirName}
                  placeholder="New Directory Name"
                  onChange={this.handleChange}
                />
                <button onClick={this.handleCreateDirectory}>Create Directory</button>
              </div>
              <Explorer
                items={items}
                onDeleteItem={this.handleDeleteItem}
                onRenameItem={this.handleRenameItem}
                onSelectItem={this.handleSelectItem}
                selectedItemId={selectedItemId}
                onPreviewFile={this.handlePreviewFile}
              />
              <div className="preview">
                <h4>Preview</h4>
                <p>{previewContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
