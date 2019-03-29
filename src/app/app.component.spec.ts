import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BjyuMaterialModule } from './bjyu-material.module';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { testdata } from './testingdata';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  class MockDataService {
    getData() {
      return of(testdata);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BjyuMaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: DataService, useClass: MockDataService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call API and store data in datas[]', () => {
    component.getData();
    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should fill provider filter of course with flag', () => {
    component.providers = [];
    component._datas = [
      { Provider: 'Something' },
      { Provider: 'Something' },
      { Provider: 'New Something' }
    ];
    component.fillProviders(true);
    expect(component.providers[0]).toBe('Something');
    expect(component.providers[1]).toBe('New Something');
  });

  it('should fill university filter of course with flag', () => {
    component.universities = [];
    component._datas = [
      {
        Universities: {
          Institutions: 'Stanford University'
        }
      },
      {
        Universities: {
          Institutions: 'Stanford University'
        }
      },
      {
        Universities: {
          Institutions: 'MIT University'
        }
      },
    ];
    component.fillUniversities(true);
    expect(component.universities[0]).toBe('Stanford University');
    expect(component.universities[1]).toBe('MIT University');
  });

  it('should fill university filter of course with flag', () => {
    component.subjects = [];
    component._datas = [
      {
       'Parent Subject' : 'Computer Science'
      },
      {
       'Parent Subject' : 'Computer Science'
      },
      {
       'Parent Subject' : 'Programming'
      }

    ];
    component.fillSubjects(true);
    expect(component.subjects[0]).toBe('Computer Science');
    expect(component.subjects[1]).toBe('Programming');
  });

  it('should fill university filter of course with flag', () => {
    component.chsubjects = [];
    component._datas = [
      {
       'Child Subject' : 'Computer Science'
      },
      {
       'Child Subject' : 'Computer Science'
      },
      {
       'Child Subject' : 'Programming'
      }

    ];
    component.fillChSubjects(true);
    expect(component.chsubjects[0]).toBe('Computer Science');
    expect(component.chsubjects[1]).toBe('Programming');
  });

  it('should filter data on Parent Subject', () => {
    component.chsubject = undefined ;
    component.provider = undefined ;
    component.university = undefined ;
    component.subject = 'Computer Science';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should filter data on University', () => {
    component.chsubject = undefined ;
    component.provider = undefined ;
    component.university = 'Columbia University' ;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('307');
  });

  it('should filter data on University && Parent Subject', () => {
    component.chsubject = undefined ;
    component.provider = undefined ;
    component.university = 'Stanford University' ;
    component.subject = 'Programming';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('303');
  });

  it('should filter data on Provider', () => {
    component.chsubject = undefined ;
    component.provider = 'edX' ;
    component.university = undefined ;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('1926');
  });

  it('should filter data on Provider && Parent Subject', () => {
    component.chsubject = undefined ;
    component.provider = 'edX' ;
    component.university = undefined ;
    component.subject = 'Social Sciences';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('1928');
  });

  it('should filter data on Provider && University', () => {
    component.chsubject = undefined ;
    component.provider = 'edX' ;
    component.university = 'International Monetary Fund';
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('1980');
  });

  it('should filter data on Provider && University && Parent Subject', () => {
    component.chsubject = undefined ;
    component.provider = 'edX' ;
    component.university = 'International Monetary Fund' ;
    component.subject = 'Engineering';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('1981');
  });

  it('should filter data on Child Subject', () => {
    component.chsubject = 'History' ;
    component.provider = undefined ;
    component.university = undefined ;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('974');
  });

  it('should filter data on Child Subject && Parent Subject', () => {
    component.chsubject = 'Grammar & Writing' ;
    component.provider = undefined ;
    component.university = undefined ;
    component.subject = 'Humanities';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('2022');
  });

  it('should filter data on Child Subject && University', () => {
    component.chsubject = 'Grammar & Writing' ;
    component.provider = undefined ;
    component.university = 'Stanford University' ;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('3056');
  });

  it('should filter data on Child Subject && University && Parent Subject', () => {
    component.chsubject = 'Literature' ;
    component.provider = undefined ;
    component.university = 'Stanford University' ;
    component.subject = 'Humanities';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('3378');
  });

  it('should filter data on Child Subject && Provider', () => {
    component.chsubject = 'Literature' ;
    component.provider = 'edX' ;
    component.university = undefined ;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('3061');
  });

  it('should filter data on Child Subject && Provider && Parent Subject', () => {
    component.chsubject = 'Philosophy' ;
    component.provider = 'edX' ;
    component.university = undefined ;
    component.subject = 'Humanities';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('2079');
  });

  it('should filter data on Child Subject && Provider && University', () => {
    component.chsubject = 'Philosophy' ;
    component.provider = 'edX' ;
    component.university = 'Cornell University';
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('3043');
  });

  it('should filter data on Child Subject && Provider && University', () => {
    component.chsubject = 'Philosophy' ;
    component.provider = 'Coursera' ;
    component.university = 'Nanyang Technological University';
    component.subject = 'Humanities';

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('3281');
  });

  it('should filter data on Child Subject && Provider && University && Parent Subject', () => {
    component.chsubject = undefined ;
    component.provider = undefined ;
    component.university = undefined;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should filter data on Child Subject && Provider && University', () => {
    component.chsubject = undefined ;
    component.provider = undefined ;
    component.university = undefined;
    component.subject = undefined;

    component.update();

    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should sort after update if sorting already done', () => {
    component.sortby = 'Length';
    component.update();
    expect(component.datas[0]['Course Id'].toString()).toBe('2679');
  });

  it('should search the word', () => {
    component.searchString = 'nutrition';
    component.searchInput();
    expect(component.datas[0]['Course Id'].toString()).toBe('391');
  });

  it('should search the word', () => {
    component.searchString = '';
    component.searchInput();
    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should sort by length', () => {
    component.sortby = 'Length';
    component.sortfn();
    expect(component.datas[0]['Course Id'].toString()).toBe('2679');
  });

  it('should sort by Session Length', () => {
    component.sortby = 'Next Session Date';
    component.sortfn();
    expect(component.datas[0]['Course Id'].toString()).toBe('3281');
  });

  it('should reset sorting', () => {
    component.sortby = undefined;
    component.sortfn();
    expect(component.datas[0]['Course Id'].toString()).toBe('301');
  });

  it('should reset sorting and call for search fn', () => {
    component.searchString = 'nutrition';
    component.sortfn();
    expect(component.datas[0]['Course Id'].toString()).toBe('391');
  });

});
