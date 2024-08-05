import React from 'react';

class FileInput extends React.Component {
  handleFileInput = (event) => {
    const file = event.target.files[0];
        
  };

  render() {
    return (
      <input type="file" onChange={this.handleFileInput} />
    );
  }
}

export default FileInput;