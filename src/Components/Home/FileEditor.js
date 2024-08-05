// File: src/Components/Home/FileEditor.js
import React, { Component } from "react";

export default class FileEditor extends Component {
  state = {
    content: this.props.content,
  };

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  };

  handleSave = () => {
    this.props.onSave(this.state.content);
  };

  render() {
    return (
      <div className="file-editor">
        <textarea
          value={this.state.content}
          onChange={this.handleChange}
          rows="10"
          cols="50"
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}
