import React from 'react';

class FileUpload extends React.Component {
  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <input type="file" onChange={this.handleFileUpload} />
    );
  }
}

export default FileUpload;