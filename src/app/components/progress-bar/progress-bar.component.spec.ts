import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  it('should create the app', async(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('Should render value as 36% for 57', () => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    component.limit = 160;
    component.barCount = 57;
    fixture.detectChanges();
    expect(component.progress).toEqual(36);
  });
  it('Should render value as 31% for 50', () => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    component.limit = 160;
    component.barCount = 50;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.progress-bar-success').textContent).toContain('31%');
  });
});
