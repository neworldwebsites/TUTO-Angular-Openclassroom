import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  


export class AppComponent implements OnInit, OnDestroy {

  title = 'Openclassroom'
  titleName = 'Gilius'

  secondes: number;
  counterSubscription: Subscription;

  constructor() { }


  ngOnInit() {
    const counter = Observable.interval(1000);

    // // OBSERVABLE METHOD
    // this.counterSubscription =     counter.subscribe(
    //   (value: number) => {
    //     this.secondes = value;
    //   }
    // )

    // SUBSCRIPTION METHOD
    counter.subscribe(      // 3 arguments
      (value: number) => {
        this.secondes = value;
      },
      (error: any) => {
        console.log('Une erreur a été rencontrée !');
      },
      () => {
        console.log('Observable completed !');
      }
    )

  }
  
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
