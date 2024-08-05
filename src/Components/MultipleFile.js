import React from 'react';

class MultipleFileInput extends React.Component {
  handleFileInput = (event) => {
    const files = event.target.files;
    // Process the uploaded files
  };

  render() {
    return (
      <input type="file" multiple onChange={this.handleFileInput} />
    );
  }
}

export default MultipleFileInput;