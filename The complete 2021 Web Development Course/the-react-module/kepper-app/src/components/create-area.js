import React, { useState } from "react";

function CreateArea(props) {
  const [item, setItem] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setItem((previousValues) => {
      return {
        ...previousValues,
        [name]: value,
      };
    });
  }

  function submitNote(e) {
    props.onClick(item);
    setItem({
      title: "",
      content: "",
    });
    e.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={item.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={item.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
