import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {NotesService} from '../services/notes.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public noteService: NotesService, private alertCtrl: AlertController, private navCtrl: NavController) { }

  ngOnInit(){
    this.noteService.load();
  }

  addNote(){
    this.alertCtrl.create({
      header: 'New Note',
      message: 'What shoud the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.noteService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

}
