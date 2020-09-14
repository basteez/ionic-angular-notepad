import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    // Return a promise so that we know when this oeration has completed
    return new Promise((resolve) => {
      // Get the notes were saved into storage
      this.storage.get('notes').then((notes) => {
        // Only set this.notes to the returned value if there were values stored
        if (notes != null) {
          this.notes = notes;
        }
        // This allows us to check if the tada has been loaded in or not
        this.loaded = true;
        resolve(true);
      });
    });
  }

  save(): void {
    // Save the current array of notes to storage
    this.storage.set('notes', this.notes);
  }

  getNote(id: string): Note {
    // Return the note with the matching id
    return this.notes.find(note => note.id === id);
  }

  createNote(title: string): void {
    // Create a unique id (max+1)
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

    this.notes.push({
      id: id.toString(),
      title: title,
      content: ''
    });

    this.save();
  }

  deleteNote(note: Note): void {
    // Get the index in the array
    let index = this.notes.indexOf(note);

    // Delete that element and resave data
    if (index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
