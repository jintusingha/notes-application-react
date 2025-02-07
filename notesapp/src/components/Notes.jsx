import React, { useEffect, useState } from "react";
import Note from "./Note";
import "./notes.css";
import { v4 as uuid } from "uuid";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [editNoteId, setEditNoteId] = useState(null); 
    const notesPerPage = 5;

    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);

    const saveNote = () => {
        if (noteTitle.trim() && noteDescription.trim()) {
            if (editNoteId) {
                
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === editNoteId
                            ? { ...note, title: noteTitle, description: noteDescription }
                            : note
                    )
                );
            } else {
                
                setNotes([
                    ...notes,
                    { id: uuid(), title: noteTitle, description: noteDescription },
                ]);
            }

            
            setNoteTitle("");
            setNoteDescription("");
            setEditNoteId(null);
            setShowModal(false);
        }
    };

    
    const editHandler = (id) => {
        const noteToEdit = notes.find((note) => note.id === id);
        if (noteToEdit) {
            setNoteTitle(noteToEdit.title);
            setNoteDescription(noteToEdit.description);
            setEditNoteId(id);
            setShowModal(true);
        }
    };

    
    const deleteHandler = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
    const totalPages = Math.ceil(notes.length / notesPerPage);

    return (
        <div className="notes-container">
           
            <button className="new-note-button" onClick={() => setShowModal(true)}>
                New Note
            </button>

            
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editNoteId ? "Edit Note" : "Create Note"}</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={noteDescription}
                            onChange={(e) => setNoteDescription(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button onClick={saveNote}>
                                {editNoteId ? "Update" : "Save"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNoteTitle("");
                                    setNoteDescription("");
                                    setEditNoteId(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

           
            <div className="notes">
                {currentNotes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        description={note.description}
                        deleteHandler={deleteHandler}
                        editHandler={editHandler} 
                    />
                ))}
            </div>

            
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Notes;
