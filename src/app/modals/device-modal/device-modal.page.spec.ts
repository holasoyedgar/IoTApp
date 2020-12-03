import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceModalPage } from './device-modal.page';

describe('DeviceModalPage', () => {
  let component: DeviceModalPage;
  let fixture: ComponentFixture<DeviceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
