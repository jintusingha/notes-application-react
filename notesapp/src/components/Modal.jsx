import React, { useEffect } from 'react';

const Modal = ({ title, onSave, onCancel, noteTitle, noteDescription, setNoteTitle, setNoteDescription }) => {
  useEffect(() => {
    document.getElementById('noteTitle').focus();
  }, []);

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>{title}</h2>
        <input
          id='noteTitle'
          type='text'
          placeholder='Title'
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
        <div className='modal-actions'>
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
