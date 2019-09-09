import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil-service'; 
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
  
  
export class AppareilViewComponent implements OnInit, OnDestroy {

  // propriétés
  title = 'openclass-angular-willalexander';
  titleName = 'Gilius';

  // voir dans appareil-service.ts

  appareilStatusOn = 'Allumé!';
  appareilStatusOff = 'Eteint!';
  isAuth = false;
  appareils: any[];
  // voir ngOnInit()
  appareilSubscription: Subscription;


  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });  

  // ici on déclare Service
  constructor(
    private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  // ngOnInit() {
  //   this.appareils = this.appareilService.appareils;
  // }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  // Methods 
  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }


  

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }


}