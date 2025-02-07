import React from "react";
import "./notes.css";

const Note = ({ id, title, description, deleteHandler, editHandler }) => {
    return (
        <div className="note">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="note-actions">
                <button className="edit-button" onClick={() => editHandler(id)}>
                    Edit
                </button>
                <button className="delete-button" onClick={() => deleteHandler(id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Note;
