import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVComponent } from './ingreso-v.component';

describe('IngresoVComponent', () => {
  let component: IngresoVComponent;
  let fixture: ComponentFixture<IngresoVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
