import React, { useState } from 'react';

const CreateForm = ({ onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateForm;