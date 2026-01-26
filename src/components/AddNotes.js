import React, { useContext, useState } from "react";
import Notes from "./Notes";
import noteContext from "../context/notes/notecontext";
export default function AddNotes() {
  const context = useContext(noteContext);
  const { addNotes, ControlAlert1 } = context;

  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const titleLen = note.title.trim().length;
    const descLen = note.description.trim().length;
    if (titleLen < 3 || descLen < 5) {
      ControlAlert1(titleLen, descLen);
      return;
    }
    addNotes(note.title, note.description);
    setNote({ title: "", description: "" });
  };

  return (
    <div className="container my-3">
      <h2>Add Notes</h2>

      <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            TITLE
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}          // ← controlled input banana zaroori
            placeholder="Enter title (min 3 chars)"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={handleChange}
            type="text"                 // ← type="description" galat tha
            className="form-control"
            id="description"
            name="description"
            value={note.description}    // ← controlled input
            placeholder="Enter description (min 5 chars)"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={note.title.trim().length < 3 || note.description.trim().length < 5}>
          AddNotes
        </button>
      </form>
      <Notes />
    </div>
  );
}