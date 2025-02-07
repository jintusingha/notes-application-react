import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import Note from './Note';
import './notes.css';
import { v4 as uuid } from 'uuid';

const Notes = () => {
    const [inputText, setInputText] = useState('');
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 5; // Set how many notes to show per page

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Notes', JSON.stringify(notes));
    }, [notes]);

    const editHandler = (id, text) => {
        setEditToggle(id);
        setInputText(text);
    };

    const saveHandler = () => {
        if (editToggle) {
            setNotes(notes.map((note) => (note.id === editToggle ? { ...note, text: inputText } : note)));
        } else {
            setNotes([...notes, { id: uuid(), text: inputText }]);
        }
        setInputText('');
        setEditToggle(null);
    };

    const deleteHandler = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    // **Pagination Logic**
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
    const totalPages = Math.ceil(notes.length / notesPerPage);

    return (
        <div className="notes">
            {currentNotes.map((note) =>
                editToggle === note.id ? (
                    <CreateNote inputText={inputText} setInputText={setInputText} saveHandler={saveHandler} />
                ) : (
                    <Note key={note.id} id={note.id} text={note.text} editHandler={editHandler} deleteHandler={deleteHandler} />
                )
            )}

            {editToggle === null && <CreateNote inputText={inputText} setInputText={setInputText} saveHandler={saveHandler} />}

            {/* Pagination Controls */}
            {notes.length > notesPerPage && (
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notes;
