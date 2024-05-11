import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSucursalComponent } from './form.sucursal.component';

describe('FormSucursalComponent', () => {
  let component: FormSucursalComponent;
  let fixture: ComponentFixture<FormSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSucursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
