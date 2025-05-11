
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../services/chat.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgFor],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
  messages: Message[] = [];
  userName = '';
  age = 0; 
  lastName = ''; 
  address = ''; 
  birthDate = new Date(); 
  career = ''; 
  phoneNumber = ''; 
  maritalStatus = ''; 

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    console.log('Formulario enviado');
    //if (this.newMessage.trim() != '') {
      this.chatService.sendMessage(
        this.userName,
        this.age,
        this.lastName,
        this.address,
        this.birthDate,
        this.career,
        this.phoneNumber,
        this.maritalStatus
        
      ).then(() => {
        console.log('Mensaje enviado correctamente');

      }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);

      });
    }
  }
//}