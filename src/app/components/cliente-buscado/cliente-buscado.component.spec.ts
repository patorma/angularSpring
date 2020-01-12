import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBuscadoComponent } from './cliente-buscado.component';

describe('ClienteBuscadoComponent', () => {
  let component: ClienteBuscadoComponent;
  let fixture: ComponentFixture<ClienteBuscadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteBuscadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteBuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
