import { useContext } from "react";
import notecontext from "../context/notes/notecontext";
export const NoteItem = (props) => {
 
    const context = useContext(notecontext)
    const {handleAlert,handleAlert2, deletenotes}= context
  const { note ,update} = props;
  const callde =()=>{
      deletenotes(
      note._id
      )

       handleAlert()
  }
  return (
    <>
      <div className="card col-md-3 mx-3">
       
        <div className="card-body ">
          <h5 className="card-title">{note.title}
         

          </h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash " onClick={callde}></i>
          <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{update(note,handleAlert2)}}></i>
        </div>
      </div>
    </>
  );
};
