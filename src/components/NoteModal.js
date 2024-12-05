import React, { useState, useEffect } from 'react';
import '../styles/NoteModal.css';
import { MAX_TITLE_LENGTH, MAX_TAGLINE_LENGTH, MAX_BODY_LENGTH } from '../utils/constants';

const NoteModal = ({ note, onUpdate, onClose }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleSave = () => {
    onUpdate(editedNote);
  };

  return (
    <div className="note-modal-overlay" onClick={onClose}>
      <div 
        className="note-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={editedNote.title}
          onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
          maxLength={MAX_TITLE_LENGTH}
        />
        <input
          type="text"
          value={editedNote.tagline}
          onChange={(e) => setEditedNote({...editedNote, tagline: e.target.value})}
          maxLength={MAX_TAGLINE_LENGTH}
        />
        <textarea
          value={editedNote.body}
          onChange={(e) => setEditedNote({...editedNote, body: e.target.value})}
          maxLength={MAX_BODY_LENGTH}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;