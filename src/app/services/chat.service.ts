
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {

  createdAt: number;
  userName: string;
  lastName?: string;
  age?: number;
  birthDate?: Date;
  address?: string;
  career?: string;
  phoneNumber?: string;
  maritalStatus?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }

  getMessages(): Observable<Message[]> {
    const messageRef = collection(this.firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(
    userName: string,
    age?: number,
    lastName?: string,
    address?: string,
    birthDate?: Date,
    career?: string,
    phoneNumber?: string,
    maritalStatus?: string
  ): Promise<DocumentReference<DocumentData>> { // Cambiado el tipo de retorno
    const messagesRef = collection(this.firestore, 'messages');
    const message: Message = {
      createdAt: Date.now(),
      userName,
      lastName,
      age,
      address,
      birthDate,
      career,
      phoneNumber,
      maritalStatus
    };
    return addDoc(messagesRef, message);
  }
}
