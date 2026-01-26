import React, { useEffect, useState } from "react";
import notecontext from "./notecontext";
const Notestate = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const [message, setmessage] = useState(null);
  const [alert1, setalert] = useState(false);
  const [alert2, setalert2] = useState(false);
  const ControlAlert1 = (length1, length2) => {
    setalert2(true);
    console.log(length1);
    if (length1 < 3 && length2 < 5) {
      setmessage(
        "Title's should be of 3 characters And Descriptions should of be 5 characters",
      );
    } else if (length1 < 3) {
      setmessage("Title's should be of 3 characters");
    } else if (length2 < 5) {
      setmessage(" Descriptions should of be 5 characters");
    }

    setTimeout(() => {
      setalert2(false);
      setmessage("");
    }, 5000);
  };

  const handleAlert = () => {
    console.log("clicked");
    setalert(true);
    setmessage("note deleted");
    setTimeout(() => {
      setalert(false);
      setmessage(null);
    }, 3000);
  };
  const handleAlert2 = () => {
    console.log("clicked");
    setalert(true);
    setmessage("note EDITED");
    setTimeout(() => {
      setalert(false);
      setmessage(null);
    }, 3000);
  };

  const noteinfo = [];
  const [notes, setnotes] = useState(noteinfo);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getnotes();
    } else {
      setnotes([]); // optional: clear notes if logged out
    }
  }, []);
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const notesArray = Array.isArray(json)
      ? json
      : json && Array.isArray(json.notes)
        ? json.notes
        : [];

    setnotes(notesArray);
  };

  const addNotes = async (title, description) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${host}/api/notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: token,
      },
      body: JSON.stringify({ title, description }),
    });

    const { notes } = await res.json();
    setnotes((prev) => [...prev, notes]);
  };

  const deletenotes = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(notes.filter((note) => note._id !== id));
  };
  const EditNotes = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    let newNotes = await JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = [...newNotes];
      if (element[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setnotes(newNotes);
  };
  return (
    <notecontext.Provider
      value={{
        notes,
        EditNotes,
        deletenotes,
        addNotes,
        getnotes,
        setnotes,
        handleAlert,
        alert1,
        message,
        handleAlert2,
        alert2,
        ControlAlert1,
      }}
    >
      {props.children}
    </notecontext.Provider>
  );
};
export default Notestate;
