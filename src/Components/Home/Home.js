import React, { Component } from "react";
import Header from "./Header/Header";
import Explorer from "./FolderExplorer";
import Path from "./PathBreadcrum/path";
import Sidebar from "./Sidebar/Sidebar";
import FileEditor from "./FileEditor";

import "./Home.css";

export default class Home extends Component {
  state = {
    items: [],
    newFileName: "",
    newDirName: "",
    previewContent: "",
    renameItemName: "",
    selectedItemId: null,
    selectedDirectoryId: null,
    editingFileContent: "",
  };

  componentDidMount() {
    const savedItems = localStorage.getItem("explorerItems");
    if (savedItems) {
      this.setState({ items: JSON.parse(savedItems) });
    }
  }

  saveItemsToLocalStorage = (items) => {
    localStorage.setItem("explorerItems", JSON.stringify(items));
    console.log("Saved items to localStorage:", JSON.parse(localStorage.getItem("explorerItems")));
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
      this.setState({ items: newItems, newFileName: "" });
      this.saveItemsToLocalStorage(newItems);
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
      this.setState({ items: newItems, newDirName: "" });
      this.saveItemsToLocalStorage(newItems);
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

    const newItems = deleteRecursive(this.state.items);
    this.setState({ items: newItems });
    this.saveItemsToLocalStorage(newItems);
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

    const newItems = renameRecursive(items);
    this.setState({ items: newItems, renameItemName: "", selectedItemId: null });
    this.saveItemsToLocalStorage(newItems);
  };

  handleSelectItem = (id, type, content = "") => {
    if (type === "directory") {
      this.setState({ selectedDirectoryId: id });
    }
    if (type === "file") {
      this.setState({ editingFileContent: content });
    }
    this.setState({ selectedItemId: id });
  };

  handlePreviewFile = (content) => {
    this.setState({ previewContent: content });
  };

  handleSaveFileContent = (content) => {
    const { items, selectedItemId } = this.state;
    const saveContentRecursive = (items) =>
      items.map((item) => {
        if (item.id === selectedItemId && item.type === "file") {
          return { ...item, content };
        } else if (item.children) {
          return { ...item, children: saveContentRecursive(item.children) };
        }
        return item;
      });

    const newItems = saveContentRecursive(items);
    this.setState({ items: newItems, editingFileContent: content });
    this.saveItemsToLocalStorage(newItems);
    console.log("Content saved to file:", content);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { items, newFileName, newDirName, previewContent, renameItemName, selectedItemId, editingFileContent } = this.state;

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
              {selectedItemId && editingFileContent !== null ? (
                <FileEditor content={editingFileContent} onSave={this.handleSaveFileContent} />
              ) : (
                <div className="preview">
                  <h4>Preview</h4>
                  <p>{previewContent}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
