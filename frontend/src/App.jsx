import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [maininput, setmaininput] = useState('')
  const [secondinput, setsecondinput] = useState('')
  const [notes, setNotes] = useState([]);
  const getData = async () => {
    const res = await axios.get("http://localhost:3000/api/notes/main");
    setNotes(res.data.notes);

  };
  async function formsibmit(e) {
    e.preventDefault()

    console.log(maininput, secondinput)

    let data = await axios.post('http://localhost:3000/api/notes/main', {
      title: maininput,
      content: secondinput
    })

    console.log(data)
    getData();
    setmaininput('')
    setsecondinput("")


  }
  async function submitdelete(noteid) {
    console.log(noteid)
    let data = await axios.delete(`http://localhost:3000/api/notes/main/${noteid}`)
    console.log(data)
    getData();

  }
  async function handleupdate(id) {
    let content = prompt('enter your content')
   await axios.patch(`http://localhost:3000/api/notes/main/${id}`, {
    content :content
});
  getData()


  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>

      <div className="notes-wrapper">

        <form className="note-input-box" onSubmit={formsibmit}>
          <input
            type="text"
            required
            placeholder="✍️ Write a new title..."
            className="note-input"
            value={maininput} onChange={(e) => {
              setmaininput(e.target.value)
            }} />
          <input
            type="text"
            required
            placeholder="✍️ Write a new content..."
            className="note-input"
            value={secondinput} onChange={(e) => {
              setsecondinput(e.target.value)
            }} />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>



        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes found 📭</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note, index) => (
              <div className="note-card" key={index}>
                <div className="main">
                  <p className="note-title">{note.title}</p>
                  <p className="note-content">{note.content}</p>
                </div>

                <div className="note-actions">
                  <button className="edit-btn" onClick={()=> {
                    console.log(note);
                    
                    handleupdate(note._id)
                  }}>Edit</button>
                  <button className="delete-btn"onClick={()=> {
                    submitdelete(note._id)
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </>
  );
};

export default App;
