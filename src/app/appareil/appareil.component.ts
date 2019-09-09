import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil-service';


@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})


// CLASS APPAREIL
export class AppareilComponent implements OnInit {
  // Propriétés
  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;
  @Input() id: number;


  constructor(
    private appareilService: AppareilService) { }

  
  ngOnInit() {
  }


  // Méthodes
  getStatus() {
      return this.appareilStatus;
  }
  getColor() {
    if (this.appareilStatus === 'Allumé!') {
      return 'darkgreen';
    } else if (this.appareilStatus === 'Eteint!') {
      return 'darkred';
    }
  }

  onSwitch() {

    if (this.appareilStatus === 'Allumé!')
    {
      this.appareilService.switchOffOne(this.index);
    }
    else if (this.appareilStatus === 'Eteint!')
    {
      this.appareilService.switchOnOne(this.index);
    }

  }


}
