import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnParleDeNousComponent } from './on-parle-de-nous.component';

describe('OnParleDeNousComponent', () => {
  let component: OnParleDeNousComponent;
  let fixture: ComponentFixture<OnParleDeNousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnParleDeNousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnParleDeNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
