import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
  
export class EditAppareilComponent implements OnInit {

  defaultOnOff = 'Eteint!';

  constructor(
    private appareilService: AppareilService,
    private router: Router) { }


  ngOnInit() {
  }


  // METHODES
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];

    this.appareilService.addAppareil(name, status);
    console.log(form.value);

    this.router.navigate(['/appareils']);
  }


}
