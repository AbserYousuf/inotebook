import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../context/notes/notecontext';
import { NoteItem } from './NoteItem';
import { useNavigate } from 'react-router';
export default function Notes() {
  const context = useContext(notecontext);
  const { notes, getnotes, EditNotes, ControlAlert1, handleAlert2 } = context;
  const navigate = useNavigate();
  const ref = useRef(null);
  const closeRef = useRef(null);
  const [upnote, setUpNote] = useState({
    id: "",
    title: "",
    description: "",
  });
  const update = (currentnote) => {
    document.activeElement.blur();
    ref.current.click();

    setUpNote({
      id: currentnote._id,
      title: currentnote.title,
      description: currentnote.description,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(upnote.id)
    const titleLen = upnote.title.trim().length;
    const descLen = upnote.description.trim().length;

    if (titleLen < 3 || descLen < 5) {
      ControlAlert1(titleLen, descLen);
      return;
    }

    EditNotes(upnote.id, upnote.title, upnote.description);
    handleAlert2();

    document.activeElement.blur();
    closeRef.current.click();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    } else {
      navigate("/login");
    }
  }, [getnotes, navigate]);
  const handleChange = (e) => {
    setUpNote({ ...upnote, [e.target.name]: e.target.value });
  };
  return (
    <>
      <>
        {/* Hidden Button to Trigger Modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Launch
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={upnote.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={upnote.description}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  ref={closeRef}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  disabled={
                    upnote.title.trim().length < 3 ||
                    upnote.description.trim().length < 5
                  }
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="row my-3">
          <h2>Your Notes</h2>

          {notes.length === 0 && (
            <p className="text-muted">Notes are empty. Add notes to display.</p>
          )}

          {notes.map((note) => (
            <NoteItem key={note._id}
              note={note}                 // ← fixed: pass the current note from the array
              noteId={note._id}           // optional – you can also just use note._id inside NoteItem
              update={update} />
          ))}
        </div>
      </>

    </>

  )
}
