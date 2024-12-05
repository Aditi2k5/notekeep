import React from 'react';
import '../styles/NoteCard.css';

const NoteCard = ({ note, onEdit, onTogglePin }) => {
  return (
    <div 
      className={`note-card ${note.isPinned ? 'pinned' : ''}`}
      onClick={() => onEdit(note)}
    >
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <button 
          className="pin-button" 
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note);
          }}
        >
          {note.isPinned ? '📌 Pinned' : 'Pin'}
        </button>
      </div>
      <p className="note-tagline">{note.tagline}</p>
      <p className="note-preview">
        {note.body.length > 100 
          ? `${note.body.substring(0, 100)}...` 
          : note.body}
      </p>
    </div>
  );
};

export default NoteCard;