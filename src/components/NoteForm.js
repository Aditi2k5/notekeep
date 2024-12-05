import React, { useState } from 'react';
import { MAX_TITLE_LENGTH, MAX_TAGLINE_LENGTH, MAX_BODY_LENGTH } from '../utils/constants';
import '../styles/NoteForm.css';

const NoteForm = ({ onAddNote }) => {
  const [note, setNote] = useState({
    title: '',
    tagline: '',
    body: '',
    isPinned: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(note);
    setNote({
      title: '',
      tagline: '',
      body: '',
      isPinned: false
    });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({...note, title: e.target.value})}
        maxLength={MAX_TITLE_LENGTH}
        required
      />
      <input
        type="text"
        placeholder="Tagline (Optional)"
        value={note.tagline}
        onChange={(e) => setNote({...note, tagline: e.target.value})}
        maxLength={MAX_TAGLINE_LENGTH}
      />
      <textarea
        placeholder="Note Body"
        value={note.body}
        onChange={(e) => setNote({...note, body: e.target.value})}
        maxLength={MAX_BODY_LENGTH}
        required
      />
      <div className="form-actions">
        <button type="submit">Add Note</button>
        <label>
          <input
            type="checkbox"
            checked={note.isPinned}
            onChange={(e) => setNote({...note, isPinned: e.target.checked})}
          />
          Pin Note
        </label>
      </div>
    </form>
  );
};

export default NoteForm;