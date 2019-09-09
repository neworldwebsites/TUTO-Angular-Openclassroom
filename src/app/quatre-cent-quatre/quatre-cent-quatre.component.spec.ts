import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatreCentQuatreComponent } from './quatre-cent-quatre.component';

describe('QuatreCentQuatreComponent', () => {
  let component: QuatreCentQuatreComponent;
  let fixture: ComponentFixture<QuatreCentQuatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuatreCentQuatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuatreCentQuatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
