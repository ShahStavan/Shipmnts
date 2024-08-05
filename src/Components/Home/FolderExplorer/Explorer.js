import React, { Component } from "react";
import "./Explorer.css";

class Explorer extends Component {
  renderItems = (items) => {
    return items.map((item) => {
      if (item.type === "directory") {
        return (
          <div key={item.id}>
            <div
              className="item"
              onClick={() => this.props.onSelectItem(item.id, item.type)}
            >
              <i className="fa fa-folder" style={{ color: "folder" }}></i>
              {item.name}
              <button onClick={() => this.props.onDeleteItem(item.id)}>Delete</button>
              <button onClick={() => this.props.onRenameItem(item.id)}>Rename</button>
            </div>
            <div className="children">{this.renderItems(item.children)}</div>
          </div>
        );
      } else {
        return (
          <div className="item" key={item.id}>
            <i className="fa fa-file" style={{ color: "lightGray" }}></i>
            {item.name}
            <button onClick={() => this.props.onDeleteItem(item.id)}>Delete</button>
            <button onClick={() => this.props.onRenameItem(item.id)}>Rename</button>
            <button onClick={() => this.props.onPreviewFile(item.content)}>Preview</button>
          </div>
        );
      }
    });
  };

  render() {
    const { items } = this.props;
    return (
      <div className="explore-files">
        <h1 className="explorerHeading">Explorer</h1>
        {this.renderItems(items)}
      </div>
    );
  }
}

export default Explorer;
