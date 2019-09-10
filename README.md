# Angular

## Installation

    npm install -g @angular/cli

    (--skip-tests=true)
    ng new projectName --style=scss --directory .

    ng serve

    ng serve --open

* chrome extensions debugg: augury

_____________

## Extensions

    npm install bootstrap --save

    npm install jquery --save
    npm install popper.js --save   

    npm install rxjs-compat --save

>in angular.json > architect > style ADD:
````ts

    "styles": [
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "src/styles.scss"
    ],

    "scripts": [
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/popper.js/dist/umd/popper.min.js",  
      "./node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]

// OR on style.scss :
@import "~bootstrap/dist/css/bootstrap.css";
````

> Dans app.component.ts
````ts
import { Component, AfterViewInit } from '@angular/core';


declare var $: any;


export class AppComponent implements  AfterViewInit {

  ngAfterViewInit() {
    // JQUERY
    $(() => {
      $('h2')
      .append($('<span>')
      .css({ color: 'rebeccapurple' })
      .text(' | all OK !'));
    });
  }

}
````
_____________

## Imports

>in appmodule.ts:
````ts
import { FormsModule } from '@angular/forms';

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
````

> in new.component.ts -> Décorateur @input()
````ts
import { Component, Input, OnInit } from '@angular/core';

export class newComponent implements OnInit {
  // Propriétés
  @Input() newName: string;
````

_____________

## Components

    ng generate component mon-premier

    ng g c mon-premier

_____________

## Services

    ng g s services/auth

_____________

## All sub-commands

* appShell
* application
* class
* component
* directive
* enum
* guard
* interface
* library
* module
* pipe
* service
* serviceWorker
* universal
* webWorker

_____________

## Usage

* string interpolation : 

````html
  <h1>
    Welcome to {{ title }}!
  </h1>
````

* properties binding :

````html
    <button [disabled]="!isAuth">Tout Allumer</button>
````

* events binding : 

````html
    <button (click)="onAllumer()">Tout Allumer</button>
````

* liaison à double sens ( two-way binding ) : 

````html
 <input
  type="text"
  [(ngModel)]="appareilName">
````

> in app.module.ts :
````ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
  ]
})
````

* Décorateur @input() :

> dans appareil.component.ts
````ts
import { Component, Input, OnInit } from '@angular/core';

export class AppareilComponent implements OnInit {
  // Propriétés
  @Input() appareilName: string;
  appareilStatus = 'éteint';
````

> dans app.component.html
````html
      <ul class="list-group">
        <!-- by @input() -->
        <app-appareil appareilName="high-tech"></app-appareil>
        <app-appareil appareilName="mon coeur"></app-appareil>
        <app-appareil appareilName="mes tripes"></app-appareil>
        <!-- by properties blinding -->
        <app-appareil [appareilName]="appareilOne"></app-appareil>
        <app-appareil [appareilName]="appareilTwo"></app-appareil>
        <app-appareil [appareilName]="appareilThree"></app-appareil>
      </ul>
````

> dans app.component.ts
````ts
export class AppComponent {
  // propriétés
  appareilOne   = 'Machine à Laver un';
  appareilTwo   = 'Machine à Laver deux';
  appareilThree = 'Machine à Laver trois';
````

_____________

## Les Directives

Il existe une convention de nomenclature pour les méthodes liées aux événements que j'ai employée ici : "on" + le nom de l'événement. Cela permet, entre autres, de suivre plus facilement l'exécution des méthodes lorsque l'application devient plus complexe.

### Directive Structurelle

 * *ngIf :  pour afficher des données de façon conditionnelle

    *ngIf="condition"

````html
<li class="list-group-item">
  <div style="width:20px;height:20px;background-color:red;" 
       *ngIf="appareilStatus === 'éteint'"></div>
  <h4>Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}</h4>
  <input type="text" class="form-control" [(ngModel)]="appareilName">
</li>
````

* *ngFor : pour itérer des données dans un array

    *ngFor="let obj of myArray"

````html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h2>Mes appareils</h2>
      <ul class="list-group">
        <app-appareil  *ngFor="let appareil of appareils"
                       [appareilName]="appareil.name"
                       [appareilStatus]="appareil.status"></app-appareil>
      </ul>
      <button class="btn btn-success"
              [disabled]="!isAuth"
              (click)="onAllumer()">Tout allumer</button>
    </div>
  </div>
</div>
````

````ts
export class AppComponent {
  isAuth = false;

  appareils = [
    {
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      name: 'Frigo',
      status: 'allumé'
    },
    {
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor() {
````

### Les directives par attribut

* ngStyle

````html
<h4 [ngStyle]="{color: getColor()}">Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}</h4>
````

````ts
getColor() {
    if(this.appareilStatus === 'allumé') {
      return 'green';
    } else if(this.appareilStatus === 'éteint') {
      return 'red';
    }
}
````

* ngClass

````html
<li [ngClass]="{'list-group-item': true,
                'list-group-item-success': appareilStatus === 'allumé',
                'list-group-item-danger': appareilStatus === 'éteint'}">
  <div style="width:20px;height:20px;background-color:red;"
       *ngIf="appareilStatus === 'éteint'"></div>
  <h4 [ngStyle]="{color: getColor()}">Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}</h4>
  <input type="text" class="form-control" [(ngModel)]="appareilName">
</li>
````

_____________

## Modifiez les données en temps réel avec les Pipes

Les pipes (/pʌɪp/) prennent des données en input, les transforment, et puis affichent les données modifiées dans le DOM.  Il y a des pipes fournis avec Angular, et vous pouvez également créer vos propres pipes si vous en avez besoin.  Je vous propose de commencer avec les pipes fournis avec Angular.

````ts
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
````

````html
      <p>Mise à jour : {{ lastUpdate | async | date: 'EEEE d MMMM y' | uppercase }}</p>
      <!--  yMMMMEEEEd (E:jour)short -->
````

_____________

## Les Services

Dit très simplement, un service permet de centraliser des parties de votre code et des données qui sont utilisées par plusieurs parties de votre application ou de manière globale par l'application entière.  Les services permettent donc :

* de ne pas avoir le même code doublé ou triplé à différents niveaux de l'application - ça facilite donc la maintenance, la lisibilité et la stabilité du code ;

* de ne pas copier inutilement des données - si tout est centralisé, chaque partie de l'application aura accès aux mêmes informations, évitant beaucoup d'erreurs potentielles.

> créer dossier services/appareil-service.ts
````ts
export class AppareilService {
  appareils = [
    {
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      name: 'Frigo',
      status: 'allumé'
    },
    {
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];  

  switchOnOne(i: number) { // individuel on
    this.appareils[i].status = 'Allumé!';
  }

  switchOffOne(i: number) { // individuel off
    this.appareils[i].status = 'Eteint!';
  }  
}
````

> dans app.module.ts
````ts
import { AppareilService } from './services/appareil-service';

@NgModule({
  providers: [
    AppareilService
  ]
})
````

> dans app.component.ts
````ts
import { Component, OnInit } from '@angular/core';

import { AppareilService } from './services/appareil-service'; 

  
export class AppComponent implements OnInit {

  appareils: any[];
  
  constructor(
    private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }
````

_____________

## PS: Faites communiquer les components

````ts
@Input() index: number;
````

````html
<ul class="list-group">
  <app-appareil 
  *ngFor="let appareil of appareils; let i = index"

  [index]="i">
  </app-appareil>
</ul>
````

````ts
  onSwitch() {
      this.appareilService.switchOffOne(this.index);
    }
````

_____________

## Le Routing : navigation

Au lieu de charger une nouvelle page à chaque clic ou à chaque changement d'URL, on remplace le contenu ou une partie du contenu de la page : on modifie les components qui y sont affichés, ou le contenu de ces components.  On accomplit tout cela avec le "routing", où l'application lit le contenu de l'URL pour afficher le ou les components requis.

* on vide app-component.html de tous liens components ; 
````ts 
<app-appareil></app-appareil>
````

* à la place on crée une navigation:
````html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="#">Authentification</a></li>
        <li class="active"><a href="#">Appareils</a></li>
      </ul>
    </div>
  </div>
</nav>
````

### Créer des Routes : 

> dans  app.module.ts

````ts
import { Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent }
];
// Le path correspond au string qui viendra après le   /  dans l'URL


imports: [
    RouterModule.forRoot(appRoutes)
],
// méthode  forRoot()  en lui passant l'array de routes que vous venez de créer
````

* on affiche dans app-component à l'endroit voulu ; 
````ts 
<router-outlet></router-outlet>
````

### Naviguez avec les routerLink

> Pour ne pa recharger la page, on retire l'attribut  href  et on le remplace par l'attribut  routerLink  :

````html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-collapse">
      <ul class="nav navbar-nav">
        <li routerLinkActive="active">
          <a routerLink="auth">Authentification</a>
        </li>
        <li routerLinkActive="active"> 
          <a routerLink="appareils">Appareils</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container">
      <router-outlet></router-outlet>
</div>
````

### Naviguez avec le Router :  
Pour naviguer sous condition d'authentification.
> Créez un nouveau fichier  auth.service.ts  dans le dossier services pour gérer l'authentification  :

````ts 
export class AuthService {

  isAuth = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}
// La variable  isAuth  donne l'état d'authentification de l'utilisateur.  La méthode  signOut()  "déconnecte" l'utilisateur, et la méthode  signIn()  authentifie automatiquement l'utilisateur.
````

> (n'oubliez pas de l'ajouter également dans l'array  providers  dans  app.module.ts )
````ts 
  providers: [
    AppareilService,
    AuthService
  ],
````

> Dans le component  auth.component.ts , créer deux boutons et les méthodes correspondantes pour se connecter et se déconnecter contextuellement :

````ts 
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
// signIn() du service retourne une Promise, on peut employer une fonction callback asynchrone avec  .then()  pour exécuter du code une fois la Promise résolue.
````

> Ajouter les boutons dans auth.component.ts
````html
<h2>Authentification</h2>

<button class="btn btn-success"
*ngIf="!authStatus"
(click)="onSignIn()">Se connecter</button>

<button class="btn btn-danger"
*ngIf="authStatus"
(click)="onSignOut()">Se déconnecter</button>
````

> Une fois authentifié l'app dirige ver appareil.view.html Pour ça dans auth.component.ts :
````ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export class AuthComponent implements OnInit {
  authStatus: boolean;

constructor(private authService: AuthService,
            private router: Router) { }

  
  onSignIn() {       // Méthode pour les 2 btn connection  
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
        // Auth OK! -> fonction navigate dirige vers le chemin 'appareils'
      }
    )  
  }            
````

### Paramètres de routes
Imaginez qu'on souhaite pouvoir cliquer sur un appareil dans la liste d'appareils afin d'afficher une page avec plus d'informations sur cet appareil : on peut imaginer un système de routing de type  appareils/nom-de-l'appareil , par exemple.  Si on n'avait que deux ou trois appareils, on pourrait être tenté de créer une route par appareil, mais imaginez un cas de figure où l'on aurait 30 appareils, ou 300.  Imaginez qu'on laisse l'utilisateur créer de nouveaux appareils ; l'approche de créer une route par appareil n'est pas adaptée.  Dans ce genre de cas, on choisira plutôt de créer une route avec paramètre.

> Tout d'abord, vous allez créer la route dans  AppModule  :
````ts
const appRoutes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  { path: 'appareils/:id', component: SingleAppareilComponent },
];
````
> Tous les chemins de type  appareils/*  seront renvoyés vers  SingleAppareilComponent ,  que vous allez maintenant créer :
````ts
import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';


export class SingleAppareilComponent implements OnInit {

  name: string = 'Appareil';
  status: string = 'Statut';

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

}
````

````html
<h2>{{ name }}</h2>
<p>Statut : {{ status }}</p>
<a routerLink="/appareils">Retour à la liste</a>
````
Pour l'instant, si vous naviguez vers  /appareils/nom , peu importe le nom que vous choisissez, vous avez accès à  SingleAppareilComponent .
>Maintenant, vous allez y injecter  ActivatedRoute , importé depuis  @angular/router , afin de récupérer le fragment  id  de l'URL :
````ts
import { AppareilService } from '../services/appareil-service';
import { ActivatedRoute } from '@angular/router';


constructor(private appareilService: AppareilService,
            private route: ActivatedRoute) { }

ngOnInit() {
    this.name = this.route.snapshot.params['id'];
}    
// utiliser l'objet  snapshot  qui contient les paramètres de l'URL  et, pour l'instant, attribuer le paramètre  id  à la variable  name        
````
> dans  AppareilService , ID pour chaque appareil et une méthode qui rendra l'appareil correspondant à un identifiant :
````ts
appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
];


  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }                   // méthodes pour ID:
````

> Dans  SingleAppareilComponent, récupérer l'identifiant de l'URL et l'utiliser pour récupérer l'appareil correspondant :
````ts
ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.name = this.appareilService.getAppareilById(+id).name;
    this.status = this.appareilService.getAppareilById(+id).status;
}
// utiliser  +  avant  id  dans l'appel pour caster la variable comme nombre.
````
> ne pas oublier dans  AppareilComponent :  
````ts
@Input() appareilName: string;
@Input() appareilStatus: string;
@Input() index: number;
@Input() id: number;
````
> et dans  AppareilViewComponent
````html
<ul class="list-group">
  <app-appareil  *ngFor="let appareil of appareils; let i = index"
                 [appareilName]="appareil.name"
                 [appareilStatus]="appareil.status"
                 [index]="i" 
                 [id]="appareil.id"></app-appareil>
</ul>
````
> dans SingleAppareil
````html
<h3>{{ name }}</h3>
<p>Status : {{ status }}</p>
<a routerLink="/appareils">Retour à la liste</a>
````
> dans AppareilComponent
````html
<h4 [ngStyle]="{color: getColor()}">
  Appareil : {{ appareilName }} --
  Statut : {{ getStatus() }}</h4>

<a [routerLink]="[id]">Détail</a>

<!-- Ici, vous utilisez le format array pour  routerLink  en property binding afin d'accéder à la variable  id -->
````
Accès à la page Détail pour chaque appareil, informations de statut qui s'y trouvent sont automatiquement à jour grâce à l'utilisation du service.

### Redirection 404 :  
Par exemple pour afficher une page 404 lorsqu'il entre une URL qui n'existe pas.

> créer un component 404 très simple, appelé  four-oh-four.component.ts  :
````html
<h2>Erreur 404</h2>
<p>La page que vous cherchez n'existe pas !</p>

````
> Ajouter la route "directe" vers cette page, ainsi qu'une route "wildcard", qui redirigera toute route inconnue vers la page d'erreur :
````ts
const appRoutes: Routes = [

  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }

];
// ous êtes redirigé vers  /not-found  et donc le component 404.
````

### Les Guards
Il peut y avoir des cas de figure où vous souhaiterez exécuter du code avant qu'un utilisateur puisse accéder à une route ; par exemple, vous pouvez souhaiter vérifier son authentification ou son identité. Techniquement, ce serait possible en insérant du code dans la méthode  ngOnInit()  de chaque component, mais cela deviendrait lourd, avec du code répété et une multiplication des erreurs potentielles.  Ce serait donc mieux d'avoir une façon de centraliser ce genre de fonctionnalité.  Pour cela, il existe la guard  canActivate .

Une guard est en effet un service qu'Angular exécutera au moment où l'utilisateur essaye de naviguer vers la route sélectionnée.  Ce service implémente l'interface  canActivate , et donc doit contenir une méthode du même nom qui prend les arguments  ActivatedRouteSnapshot  et  RouterStateSnapshot  (qui lui seront fournis par Angular au moment de l'exécution) et retourne une valeur booléenne, soit de manière synchrone (boolean), soit de manière asynchrone (sous forme de Promise ou d'Observable) :

> Dans services, auth-guard.service.ts :  
````ts
import {
ActivatedRouteSnapshot,
CanActivate,
Router,
RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth-service";
import { Injectable } from '@angular/core';


// Injecter un service à travers 1 autre service
@Injectable()


export class AuthGuard implements CanActivate{

	constructor(private authService: AuthService,
							private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {

		if (this.authService.isAuth) {
			return true;
		} else {
			this.router.navigate(['/auth']);
		}

	}
}
// À l'intérieur de la méthode  canActivate() , vous allez vérifier l'état de l'authentification dans  AuthService .  Si l'utilisateur est authentifié, la méthode renverra  true , permettant l'accès à la route protégée.  Sinon, vous pourriez retourner  false , mais cela empêchera simplement l'accès sans autre fonctionnalité. Rediriger l'utilisateur vers la page d'authentification, le poussant à s'identifier
````

> Pour appliquer cette garde à la route  /appareils  et à toutes ses routes enfants, il faut l'ajouter dans  AppModule .  N'oubliez pas d'ajouter  AuthGuard  à l'array  providers , puisqu'il s'agit d'un service :

````ts
const appRoutes: Routes = [
  // canActive pour guarder l'accès appareils

  { path: 'appareils',
  canActivate: [AuthGuard],
  component: AppareilViewComponent },

  { path: 'appareils/:id',
  canActivate: [AuthGuard],
  component: SingleAppareilComponent }, 

  { path: 'appareil',
  component: AppareilComponent },
  { path: 'auth',
  component: AuthComponent },
  { path: '',
  component: AppareilViewComponent },
  { path: 'no-found',
  component: QuatreCentQuatreComponent },
  // Page 404
  { path: '**',
  redirectTo: '/not-found'}
]


  providers: [
    AppareilService,
    AuthService,
    AuthGuard
  ],
````

* gérer le routing de votre application avec des  routerLink  et de manière programmatique (avec  router.navigate() )
* comment rediriger un utilisateur
* protéger des routes de votre application avec les guards.


_____________
## Observez les données avec RXJS

Pour réagir à des événements ou à des données de manière asynchrone (c'est-à-dire ne pas devoir attendre qu'une tâche, par exemple un appel HTTP, soit terminée avant de passer à la ligne de code suivante), il y a eu plusieurs méthodes depuis quelques années.  Il y a le système de callback, par exemple, ou encore les Promise.  Avec l'API RxJS, fourni et très intégré dans Angular, la méthode proposée est celle des Observables

> npm i rxjs-compat
### Observables

Observable est un objet qui émet des informations auxquelles on souhaite réagir. Ces informations peuvent venir d'un champ de texte dans lequel l'utilisateur rentre des données, ou de la progression d'un chargement de fichier, Elles peuvent également venir de la communication avec un serveur : le client HTTP.
> Dans appComponent:
````ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


export class AppComponent implements OnInit {

secondes: number;

ngOnInit() {
    const counter = Observable.interval(1000);

    counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
}
// À cet Observable, on associe un Observer — un bloc de code qui sera exécuté à chaque fois que l'Observable émet une information.  L'Observable émet trois types d'information : des données, une erreur, ou un message complete.  Du coup, tout Observer peut avoir trois fonctions : une pour réagir à chaque type d'information.
````
> Dans appComponent.html:
````html 
        <span class="badge badge-primary ml-3">Time:  {{ secondes }}s</span>
````

### Subscriptions
Dans le chapitre précédent, vous avez appris à créer un Observable et à vous y souscrire.  Pour rappel, la fonction  subscribe()  prend comme arguments trois fonctions anonymes :

* la première se déclenche à chaque fois que l'Observable émet de nouvelles données, et reçoit ces données comme argument ;

* la deuxième se déclenche si l'Observable émet une erreur, et reçoit cette erreur comme argument ;

* la troisième se déclenche si l'Observable s'achève, et ne reçoit pas d'argument.

> Afin d'éviter tout problème, quand vous utilisez des Observables personnalisés, il est vivement conseillé de stocker la souscription dans un objet Subscription (à importer depuis rxjs/Subscription) :

````ts
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';

export class AppComponent implements OnInit {

  secondes: number;
  counterSubscription: Subscription;

  ngOnInit() {
    const counter = Observable.interval(1000);

    this.counterSubscription = counter.subscribe(
      (value) => {      // 1
        this.secondes = value;
      },
      (error) => {     // 2
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {          // 3
        console.log('Observable complete!');
      }
    );

    ngOnDestroy() {
      this.counterSubscription.unsubscribe();
    }

  }
}

// La fonction  unsubscribe()  détruit la souscription et empêche les comportements inattendus liés aux Observables infinis, donc n'oubliez pas de unsubscribe ! après avoir subscribe !
````

### Subjects ! ( problèmes de versions ) !

Il existe un type d'Observable qui permet non seulement de réagir à de nouvelles informations, mais également d'en émettre.  Imaginez une variable dans un service, par exemple, qui peut être modifié depuis plusieurs components ET qui fera réagir tous les components qui y sont liés en même temps.  Voici l'intérêt des Subjects.

* rendre l'array des appareils  private  ;

* créer un Subject dans le service ;

* créer une méthode qui, quand le service reçoit de nouvelles données, fait émettre ces données par le Subject et appeler cette méthode dans toutes les méthodes qui en ont besoin ;

* souscrire à ce Subject depuis  AppareilViewComponent  pour recevoir les données émises, émettre les premières données, et implémenter  OnDestroy  pour détruire la souscription.
> dans AppService:
````ts
import { Subject } from 'rxjs/Subject';

export class AppareilService {
  
  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    // ... 2 et 3
  ];

emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
}

switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
}

switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
}

switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
}
// Quand vous déclarez un Subject, il faut dire quel type de données il gèrera.  Puisque nous n'avons pas créé d'interface pour les appareils (vous pouvez le faire si vous le souhaitez), il gèrera des array de type  any[] .  N'oubliez pas l'import !
````

> Dans  AppareilViewComponent
````ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }

}
// L'application refonctionne comme avant, mais avec une différence cruciale de méthodologie : il y a une abstraction entre le service et les components, où les données sont maintenues à jour grâce au Subject.
````

Pourquoi est-ce important ?

Dans ce cas précis, ce n'est pas fondamentalement nécessaire, mais imaginez qu'on intègre un système qui vérifie périodiquement le statut des appareils.  Si les données sont mises à jour par une autre partie de l'application, il faut que l'utilisateur voie ce changement sans avoir à recharger la page.  Il va de même dans l'autre sens : un changement au niveau du view doit pouvoir être reflété par le reste de l'application sans rechargement.

### Opérateurs

L'API RxJS propose énormément de possibilités:
* [Documentation GIT RxJS](https://github.com/ReactiveX/rxjs)
* [Get Started Guide](https://rxjs.dev/guide/overview)
* [API Dev List](https://rxjs.dev/api)

Comme les opérateurs:

Un opérateur est une fonction qui se place entre l'Observable et l'Observer (la Subscription, par exemple), et qui peut filtrer et/ou modifier les données reçues avant même qu'elles n'arrivent à la Subscription.  
Voici quelques exemples rapides :

* map()  : modifie les valeurs reçues — peut effectuer des calculs sur des chiffres, transformer du texte, créer des objets…

* filter()  : comme son nom l'indique, filtre les valeurs reçues selon la fonction qu'on lui passe en argument.

* throttleTime()  : impose un délai minimum entre deux valeurs — par exemple, si un Observable émet cinq valeurs par seconde, mais ce sont uniquement les valeurs reçues toutes les secondes qui vous intéressent, vous pouvez passer  throttleTime(1000)  comme opérateur.

* scan()  et  reduce()  : permettent d'exécuter une fonction qui réunit l'ensemble des valeurs reçues selon une fonction que vous lui passez — par exemple, vous pouvez faire la somme de toutes les valeurs reçues. La différence basique entre les deux opérateurs :  reduce()  vous retourne uniquement la valeur finale, alors que  scan()  retourne chaque étape du calcul.

_____________
## Écoutez l'utilisateur avec les Forms - METHODE TEMPLATE
En Angular, il y a deux grandes méthodes pour créer des formulaires :

* la méthode template : vous créez votre formulaire dans le template, et Angular l'analyse pour comprendre les différents inputs et pour en mettre à disposition le contenu ;

### Créer un formulaire et Validez les données

> Créer EditAppareilComponent:
````html
<form (ngSubmit)="onSubmit(f)" #f="ngForm">

  <div class="form-group">
      <label for="name">
        Nom de l'appareil
      </label>
      <input type="text" id="name" class="form-control" name="name" ngModel required>
  </div>
  <div class="form-group">
      <label for="status">
        État de l'appareil
      </label>
      <select id="status" class="form-control" name="status" [ngModel]="defaultOnOff">
            <option value="allumé">Allumé</option>
            <option value="éteint">Éteint</option>
      </select>
  </div>

  <button 
  class="btn btn-primary"
  type="submit"
  [disabled]="f.invalid">Enregistrer</button>

</form>
<!-- L'attribut  #f  est ce qu'on appelle une référence locale.  Vous donnez simplement un nom à l'objet sur lequel vous ajoutez cet attribut ;  -->
````

> Dans edit-appareil.component.ts:
````ts

export class EditAppareilComponent implements OnInit {

// variable TypeScript pour choix select
  defaultOnOff = 'éteint';

  constructor() { }

// méthode pour submit form:

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];

    // here methode create on AppareilService
    this.appareilService.addAppareil(name, status);
    console.log(form.value);

    this.router.navigate(['/appareils']);
  }

// Ici vous utilisez la propriété  value  du  NgForm . L'objet  NgForm  (à importer depuis  @angular/forms )
````

* [voir doc officielle ngForm]('https://angular.io/api/forms/NgForm')

> On rajoute path dans AppModule.ts
````ts
const appRoutes: Routes = [
  { path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent },

  { path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponent },
];
````
> ainsi dans Nav AppComponent
````html
<ul class="nav navbar-nav">
    <li routerLinkActive="active"><a routerLink="auth">Authentification</a></li>
    <li routerLinkActive="active"><a routerLink="appareils">Appareils</a></li>
    <li routerLinkActive="active"><a routerLink="edit">Nouvel appareil</a></li>
</ul>
````

### Exploitez les données

> Dans la méthode  onSubmit() , vous allez récupérer les données et les attribuer à deux constantes pour les envoyer à  AppareilService  via une méthode :

````ts
// Méthode:

addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
}
// Cette méthode crée un objet du bon format, et attribue le nom et le statut qui lui sont passés comme arguments.  La ligne pour l'id prend l'id du dernier élément actuel de l'array et ajoute 1.  Ensuite, l'objet complété est ajouté à l'array et le Subject est déclenché pour tout garder à jour.
````

## Écoutez l'utilisateur avec les Forms - METHODE REACTIVE

* la méthode réactive : vous créez votre formulaire en TypeScript et dans le template, puis vous en faites la liaison manuellement — si cela a l'air plus complexe, cela vous permet de gérer votre formulaire en détail, notamment avec la création programmatique de contrôles (permettant, par exemple, à l'utilisateur d'ajouter des champs).

> Dans User.model.ts:
````ts
export class User{

	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		public drinkPreference: string,
		public hobbies?: string[]) {
		}
}
//  Ce modèle pourra donc être utilisé dans le reste de l'application en l'important dans les components où vous en avez besoin.  Cette syntaxe de constructeur permet l'utilisation du mot-clé  new , et les arguments passés seront attribués à des variables qui portent les noms choisis ici, par exemple  const user = new User('James', 'Smith', 'james@james.com', 'jus d\'orange', ['football', 'lecture'])  créera un nouvel objet  User  avec ces valeurs attribuées aux variables  user.firstName ,  user.lastName  etc.
````

> Ensuite, créez un  UserService  simple qui stockera la liste des objets  User  et qui comportera une méthode permettant d'ajouter un utilisateur à la liste :
````ts
import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
  private users: User[];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
// Ce service contient un array privé d'objets de type personnalisé  User  et un Subject pour émettre cet array.  La méthode  emitUsers()  déclenche ce Subject et la méthode  addUser()  ajoute un objet  User  à l'array, puis déclenche le Subject.
````

* N'oubliez pas d'ajouter ce nouveau service à l'array  providers  dans  AppModule  !

> L'étape suivante est de créer  UserListComponent  — pour simplifier cet exemple, vous n'allez pas créer un component pour les utilisateurs individuels :

````ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';


export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUsers();
  }



  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
// Ce component très simple souscrit au Subject dans  UserService  et le déclenche pour en récupérer les informations et les rendre disponibles au template (que vous allez maintenant créer) :
````

> Dans user-list.component.html:

````html
<ul class="list-group">
  <li class="list-group-item" *ngFor="let user of users">
    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <p>{{ user.email }}</p>
    <p>Cette persone préfère le {{ user.drinkPreference }}</p>
    <p *ngIf="user.hobbies && user.hobbies.length > 0">
      Cette personne a des hobbies !
      <span *ngFor="let hobby of user.hobbies">{{ hobby }} - </span>
    </p>
  </li>
</ul>

<!-- Ici, vous appliquez des directives  *ngFor  et  *ngIf  pour afficher la liste des utilisateurs et leurs hobbies, s'ils en ont. -->
````

* N'oubliez pas d'ajouter le lien "Users" dans NAV et son PATH ! 

> Ajoutez également un objet  User  codé en dur dans le service pour voir les résultats :

````ts
	private users: User[] = [
		{
			firstName: 'Gilius',
			lastName: 'Blanchard',
			email: 'neworldwebsites@gmail.com',
			drinkPreference: 'fanta',
			hobbies: [
				'coding',
				'Dégustation de café'	]
		}
	];
````


### Construisez un formulaire avec FormBuilder

Dans la méthode template, l'objet formulaire mis à disposition par Angular était de type  NgForm , mais ce n'est pas le cas pour les formulaires réactifs.  Un formulaire réactif est de type  FormGroup , et il regroupe plusieurs  FormControl  (tous les deux importés depuis  @angular/forms ).  

> Vous commencez d'abord, donc, par créer l'objet dans votre nouveau component  NewUserComponent  :

````ts
// Ensuite, vous allez créer une méthode qui sera appelée dans le constructeur pour la population de cet objet, et vous allez également injecter  FormBuilder , importé depuis  @angular/forms

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';


export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

// FormBuilder  est une classe qui vous met à disposition des méthodes facilitant la création d'objet  FormGroup .  Vous allez maintenant utiliser la méthode  group  à l'intérieur de votre méthode  initForm()  pour commencer à créer le formulaire :
initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required]
    });
}
// La méthode  group  prend comme argument un objet où les clés correspondent aux noms des contrôles souhaités et les valeurs correspondent aux valeurs par défaut de ces champs.  Puisque l'objectif est d'avoir des champs vides au départ, chaque valeur ici correspond au string vide.


  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference']
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }
// La méthode  onSubmitForm()  récupère la  value  du formulaire, et crée un nouvel objet  User  (à importer en haut) à partir de la valeur des  controls  du formulaire.  Ensuite, elle ajoute le nouvel utilisateur au service et navigue vers  /users  pour en montrer le résultat.


  getHobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }
  // Afin d'avoir accès aux  controls  à l'intérieur de l'array, pour des raisons de typage strict liées à TypeScript, il faut créer une méthode qui retourne  hobbies  par la méthode  get()  sous forme de  FormArray ( FormArray  s'importe depuis  @angular/forms )



  // Ensuite, vous allez créer la méthode qui permet d'ajouter un  FormControl  à  hobbies  , permettant ainsi à l'utilisateur d'en ajouter autant qu'il veut.  Vous allez également rendre le nouveau champ requis, afin de ne pas avoir un array de  hobbies  avec des string vides !
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control('', Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
  // Cette méthode crée un  control  avec la méthode  FormBuilder.control() , et l'ajoute au  FormArray  rendu disponible par la méthode  getHobbies() .

}
````

> Dans new-user.component.html créer le template du formulaire et lier ce template à l'objet  userForm  que vous venez de créer :

````html
  <form [formGroup]="userForm" (ngSubmit)="onSubmitForm()">

    <div class="form-group">
      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" class="form-control" formControlName="firstName">
    </div>
    <div class="form-group">
      <label for="lastName">Nom</label>
      <input type="text" id="lastName" class="form-control" formControlName="lastName">
    </div>
    <div class="form-group">
      <label for="email">Adresse e-mail</label>
      <input type="text" id="email" class="form-control" formControlName="email">
    </div>
    <div class="form-group">
      <label for="drinkPreference">Quelle boisson préférez-vous ?</label>
      <select id="drinkPreference" class="form-control" formControlName="drinkPreference">
        <option value="jus d\'orange">Jus d'orange</option>
        <option value="jus de mangue">Jus de mangue</option>
      </select>
    </div>

            <!-- Hobbies optionnel array  -->
    <div formArrayName="hobbies">
          <h3>Vos hobbies</h3>
          <div class="form-group" *ngFor="let hobbyControl of getHobbies().controls; let i = index">
            <input type="text" class="form-control" [formControlName]="i">
          </div>
          <button type="button" class="btn btn-success" (click)="onAddHobby()">Ajouter un hobby</button>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">Soumettre</button>   


          <!-- SUBMIT -->
    <button type="submit" class="btn btn-primary">Soumettre</button>

  </form>
````
Analysez le template :

* Sur la balise  FORM , vous utilisez le property binding pour lier l'objet  userForm  à l'attribut  formGroup  du formulaire, créant la liaison pour Angular entre le template et le TypeScript.

* Également dans la balise  FORM , vous avez toujours une méthode  onSubmitForm()  liée à ngSubmit, mais vous n'avez plus besoin de passer le formulaire comme argument puisque vous y avez déjà accès par l'objet  userForm  que vous avez créé.

* Sur chaque  INPUT  qui correspond à un  control  du formulaire, vous ajoutez l'attribut  formControlName  où vous passez un string correspondant au nom du  control  dans l'objet TypeScript.

* Le bouton de type  submit  déclenche l'événement  ngSubmit , déclenchant ainsi la méthode  onSubmitForm() , que vous allez créer dans votre TypeScript.

> Il ne reste plus qu'à ajouter un lien dans  UserListComponent  qui permet d'accéder à  NewUserComponent  et de créer la route correspondante  new-user  dans  AppModule

````html
<ul class="list-group">
  <li class="list-group-item" *ngFor="let user of users">
    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <p>{{ user.email }}</p>
    <p>Cette persone préfère le {{ user.drinkPreference }}</p>
    <p *ngIf="user.hobbies && user.hobbies.length > 0">
      Cette personne a des hobbies !
      <span *ngFor="let hobby of user.hobbies">{{ hobby }} - </span>
    </p>
  </li>

  <a routerLink="/new-user">Nouvel utilisateur</a>
  <!-- Puisque ce  routerLink  se trouve à l'intérieur du  router-outlet , il faut ajouter un  /  au début de l'URL pour naviguer vers  localhost:4200/new-user .  Si vous ne mettez pas le  / , ce lien naviguera vers  localhost:4200/users/new-user -->

</ul>
````

````ts
{ path: 'users', component: UserListComponent },
{ path: 'new-user', component: NewUserComponent },
````

### Validators

Comme pour la méthode template, il existe un outil pour la validation de données dans la méthode réactive : les  Validators

> Pour ajouter la validation, vous allez modifier légèrement votre exécution de  FormBuilder.group  VOIR DANS new-user.component 

 * [Voir Documentation Validators](https://angular.io/guide/form-validation#validator-functions)


### Ajoutez dynamiquement des FormControl
Pour l'instant, vous n'avez pas encore laissé la possibilité à l'utilisateur d'ajouter ses hobbies.  Il serait intéressant de lui laisser la possibilité d'en ajouter autant qu'il veut, et pour cela, vous allez utiliser un  FormArray .  Un  FormArray  est un array de plusieurs  FormControl , et permet, par exemple, d'ajouter des nouveaux  controls  à un formulaire.  Vous allez utiliser cette méthode pour permettre à l'utilisateur d'ajouter ses hobbies.

> Modifiez d'abord  initForm()  pour ajouter un  FormArray  vide qui s'appellera hobbies avec la méthode  array : VOIR new-user.component.ts

Analysez cette DIV :

````html
<div formArrayName="hobbies">
      <h3>Vos hobbies</h3>

      <div class="form-group"
      *ngFor="let hobbyControl of getHobbies().controls; 
      let i = index">

          <input type="text" class="form-control"
          [formControlName]="i">

      </div>

      <button type="button"
      class="btn btn-success"
      (click)="onAddHobby()">
      Ajouter un hobby</button>
</div>

<button 
type="submit"
class="btn btn-primary"
[disabled]="userForm.invalid">
Soumettre</button>
<!-- En liant la validité de  userForm  à la propriété  disabled  du bouton  submit , vous intégrez la validation de données : -->
````

* à la  DIV  qui englobe toute la partie  hobbies , vous ajoutez l'attribut  formArrayName , qui correspond au nom choisi dans votre TypeScript ;

* la  DIV  de class  form-group  est ensuite répété pour chaque  FormControl  dans le  FormArray  (retourné par  getHobbies() , initialement vide, en notant l'index afin de créer un nom unique pour chaque  FormControl ;

* dans cette  DIV , vous avec une  INPUT  qui prendra comme  formControlName  l'index du  FormControl ;

* enfin, vous avez le bouton (de type  button  pour l'empêcher d'essayer de soumettre le formulaire) qui déclenche  onAddHobby() , méthode qui, pour rappel, crée un nouveau  FormControl  (affichant une nouvelle instance de la  DIV  de class  form-group , et donc créant une nouvelle  INPUT )

_____________
## Interagissez avec un serveur avec HttpClient (FIREBASE)

* [firebase.com](https://firebase.google.com/)

Angular met à disposition un service appelé  HttpClient  qui permet de créer et d'exécuter des appels HTTP (fait par AJAX - Asynchronous JavaScript and XML) et de réagir aux informations retournées par le serveur.

Configurer un backend avec le service Firebase de Google.  
Ce service permet la création d'un backend complet sans coder, et node comprend énormément de services, dont l'authentification, une base de données NoSQL et un stockage de fichiers.  
Dans un chapitre ultérieur, vous apprendrez à utiliser les fonctions mises à disposition par Firebase afin de mieux intégrer le service.

Nous allons simplement utiliser l'API HTTP afin de comprendre l'utilisation de  HttpClient .

### Préparez le backend

> Firebase >  dans Database > Realtime Database.

Revenez à la section Données et notez l'URL de votre base de données, vous allez en avoir besoin pour configurer les appels HTTP :

**https://http-client-demo-openclass.firebaseio.com/appareils**

et vous allez pouvoir intégrer  HttpClient  à votre application des appareils électriques.

### Envoyez vers le backend

> Dans app.module.ts:  
````ts
import { HttpClientModule } from '@angular/common/http';

imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
],
````

> Vous allez utiliser  HttpClient , dans un premier temps, pour la gestion des données de la liste d'appareils.  Vous allez donc l'injecter dans  AppareilService , en y ayant auparavant ajouté le décorateur  @Injectable()  (importé depuis  @angular/core  ) :

````ts
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    }
  ];
  

  constructor(private httpClient: HttpClient) { }


  saveAppareilsToServer() {     // post()
      this.httpClient
        .put('https://http-client-demo-openclass.firebaseio.com/appareils/appareils.json', this.appareils)
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );


  getAppareilsFromServer() {    // get()
      this.httpClient
        .get<any[]>('https://http-client-demo-openclass.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
// Comme pour  post()  et  put() , la méthode get() retourne un Observable, mais puisqu'ici, vous allez recevoir des données, TypeScript a besoin de savoir de quel type elles seront (l'objet retourné est d'office considéré comme étant un Object).  Vous devez donc, dans ce cas précis, ajouter  <any[]>

  }  
````

Analysez cette méthode :

* la méthode  post() , qui permet de lancer un appel POST, prend comme premier argument l'URL visée, et comme deuxième argument le corps de l'appel, c'est-à-dire ce qu'il faut envoyer à l'URL ;

* l'extension  .json  de l'URL est une spécificité Firebase, pour lui dire que vous lui envoyez des données au format JSON ;

* la méthode  post()  retourne un Observable — elle ne fait pas d'appel à elle toute seule.  C'est en y souscrivant que l'appel est lancé ;

* dans la méthode  subscribe() , vous prévoyez le cas où tout fonctionne et le cas où le serveur vous renverrait une erreur.

> Créez maintenant un bouton dans  AppareilViewComponent  qui déclenche cette sauvegarde (en passant, si vous ne l'avez pas encore fait, vous pouvez retirer l'activation conditionnelle des boutons "Tout allumer" et "Tout éteindre") :

> Dans appareil-view.component.html:
````html
  <button class="btn btn-secondary btn-block mt-5"
  (click)="onSave()">
  Enregistrer</button>

  <button class="btn btn-secondary btn-block mb-5" 
  (click)="onFetch()">
  Récupérer</button>
````

> Dans appareil-view.component.ts:
````ts
  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }
````
*Il serait également possible de rendre automatique le chargement et l'enregistrement des appareils (par exemple en appelant la méthode  getAppareilsFromServer()  dans  ngOnInit() , et  saveAppareilsToServer()  après chaque modification)*


## Créez une application complète avec Angular et Firebase

**Vous allez créer une application simple qui recense les livres que vous avez chez vous, dans votre bibliothèque.  Vous pourrez ajouter une photo de chaque livre.  L'utilisateur devra être authentifié pour utiliser l'application.**

*Malgré sa popularité, j'ai choisi de ne pas intégrer AngularFire dans ce cours. [GitHub Firebase/AngularFire](https://github.com/firebase/angularfire) Vous emploierez l'API JavaScript mise à disposition directement par Firebase.*

### Pensez à la structure de l'application

**Prenez le temps de réfléchir à la construction de l'application.  Quels seront les components dont vous aurez besoin ?  Les services ?  Les modèles de données ?**

> ng g c new-user

> ng g c auth

> services/books.service.ts

> ng g c book

> ng g c book-list

> ng g c nav

> models/Book.ts

Il faudra également ajouter du routing à cette application, permettant l'accès aux différentes parties, avec une guard pour toutes les routes sauf l'authentification, empêchant les utilisateurs non authentifiés d'accéder à la bibliothèque.

### Structurez l'application:

Pour cette application, je vous conseille d'utiliser le CLI pour la création des components.  L'arborescence sera la suivante :

````bash
ng g c auth/signup
ng g c auth/signin
ng g c book-list
ng g c book-list/single-book
ng g c book-list/book-form
ng g c header
ng g s services/auth
ng g s services/books
ng g s services/auth-guard
````

**pour la suite voir directement l'app README**

_____________
## Code scaffolding ( échaffaudage )
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

_____________
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

_____________
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

_____________
## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

_____________
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
