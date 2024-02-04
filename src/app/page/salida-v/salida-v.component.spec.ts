import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaVComponent } from './salida-v.component';

describe('SalidaVComponent', () => {
  let component: SalidaVComponent;
  let fixture: ComponentFixture<SalidaVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalidaVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
