import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from './services/firebase';
import { NOTES_PER_PAGE } from './utils/constants';

import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import NoteModal from './components/NoteModal';

import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [lastVisibleNote, setLastVisibleNote] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial notes
  const fetchNotes = async () => {
    try {
      const q = query(
        collection(db, 'notes'),
        orderBy('isPinned', 'desc'),
        orderBy('createdAt', 'desc'),
        limit(NOTES_PER_PAGE)
      );

      const documentSnapshots = await getDocs(q);
      const fetchedNotes = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotes(fetchedNotes);
      setLastVisibleNote(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setHasMore(fetchedNotes.length === NOTES_PER_PAGE);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add new note
  const handleAddNote = async (newNote) => {
    try {
      await addDoc(collection(db, 'notes'), {
        ...newNote,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Update existing note
  const handleUpdateNote = async (updatedNote) => {
    try {
      const noteRef = doc(db, 'notes', updatedNote.id);
      await updateDoc(noteRef, {
        ...updatedNote,
        updatedAt: new Date()
      });
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Toggle pin status
  const handleTogglePin = async (note) => {
    try {
      const noteRef = doc(db, 'notes', note.id);
      await updateDoc(noteRef, {
        isPinned: !note.isPinned
      });
      fetchNotes();
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  // Load more notes
  const loadMoreNotes = async () => {
    if (!hasMore || !lastVisibleNote) return;

    try {
      const q = query(
        collection(db, 'notes'),
        orderBy('isPinned', 'desc'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisibleNote),
        limit(NOTES_PER_PAGE)
      );

      const documentSnapshots = await getDocs(q);
      const newNotes = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotes(prevNotes => [...prevNotes, ...newNotes]);
      setLastVisibleNote(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setHasMore(newNotes.length === NOTES_PER_PAGE);
    } catch (error) {
      console.error("Error loading more notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>NoteKeep</h1>
      </header>
      <main>
        <NoteForm onAddNote={handleAddNote} />
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={setEditingNote}
              onTogglePin={handleTogglePin}
            />
          ))}
        </div>
        {hasMore && (
          <button onClick={loadMoreNotes} className="load-more">
            Load More Notes
          </button>
        )}
      </main>

      {editingNote && (
        <NoteModal 
          note={editingNote} 
          onUpdate={handleUpdateNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}

export default App;