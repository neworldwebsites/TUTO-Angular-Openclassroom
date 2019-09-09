import { Subject } from "rxjs/Subject";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AppareilService {

  appareilsSubject = new Subject<any[]>();

// propriétés:
  appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'Eteint!'
    },
    {
      id: 2,      
      name: 'Télévision salon',
      status: 'Allumé!'
    },
    {
      id: 3,      
      name: 'Ordinateur portable',
      status: 'Eteint!'
    }
  ];



// CONSTRUCTOR for HTTP:
  constructor(private httpClient: HttpClient) { }
  

// méthodes:
// ///////////
  
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }
  

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }
  
  
	switchOnAll() { // group on
	  for (let appareil of this.appareils) {
	    appareil.status = 'Allumé!';
    }
    this.emitAppareilSubject();
	}

	switchOffAll() { // group off
	  for (let appareil of this.appareils) {
      appareil.status = 'Eteint!';
    } 
    this.emitAppareilSubject();
  }

  
  switchOnOne(i: number) { // individuel on
    this.appareils[i].status = 'Allumé!';  
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) { // individuel off
    this.appareils[i].status = 'Eteint!';  
    this.emitAppareilSubject();
  }  

  // METHODE POUR EDIT FORMULAIRE:
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id =
      this.appareils[this.appareils.length - 1].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

// METHOD for HTTP CLIENT:       put instead post to replace
  saveAppareilsToServer() {
    this.httpClient
      .put('https://http-client-demo-openclass.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://http-client-demo-openclass.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Error to got datas from server' + error);
        }
      );
  }

}