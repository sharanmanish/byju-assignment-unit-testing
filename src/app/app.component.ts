import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import moment from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  datas: any = [];
  _datas: any = [];

  searchString = '';

  providers: any = ['Reset'];

  provider;

  universities: any = ['Reset'];

  university;

  subjects: any = ['Reset'];

  subject;

  chsubjects: any = ['Reset'];

  chsubject;

  sortarr: any = ['Reset', 'Length', 'Next Session Date'];

  sortby;

  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe(
      (response) => {
        this._datas = response;
        Object.assign(this.datas, this._datas);
        this.fillAll();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  fillProviders(upflag?) {
    if (upflag) {
      for (let key of this._datas) {
        if (key["Provider"] !== "") {
          if (this.providers.includes(key["Provider"]) === false) {
            this.providers.push(key["Provider"]);
          }
        }
      }
    }
    else {
      for (let key of this.datas) {
        if (key["Provider"] !== "") {
          if (this.providers.includes(key["Provider"]) === false) {
            this.providers.push(key["Provider"]);
          }
        }
      }
    }

  }

  fillUniversities(upflag?) {
    if (upflag) {
      for (let key of this._datas) {
        if (key.Universities.Institutions !== "") {
          if (this.universities.includes(key.Universities.Institutions) === false) {
            this.universities.push(key.Universities.Institutions);
          }
        }
      }
    } else {
      for (let key of this.datas) {
        if (key.Universities.Institutions !== "") {
          if (this.universities.includes(key.Universities.Institutions) === false) {
            this.universities.push(key.Universities.Institutions);
          }
        }
      }
    }
  }

  fillSubjects(upflag?) {
    if (upflag) {
      for (let key of this._datas) {
        if (key["Parent Subject"] !== "") {
          if (this.subjects.includes(key["Parent Subject"]) === false) {
            this.subjects.push(key["Parent Subject"]);
          }
        }
      }
    } else {
      for (let key of this.datas) {
        if (key["Parent Subject"] !== "") {
          if (this.subjects.includes(key["Parent Subject"]) === false) {
            this.subjects.push(key["Parent Subject"]);
          }
        }
      }
    }

  }

  fillChSubjects(upflag?) {
    if (upflag) {
      for (let key of this._datas) {
        if (key["Child Subject"] !== "") {
          if (this.chsubjects.includes(key["Child Subject"]) === false) {
            this.chsubjects.push(key["Child Subject"]);
          }
        }
      }
    } else {
      for (let key of this.datas) {
        if (key["Child Subject"] !== "") {
          if (this.chsubjects.includes(key["Child Subject"]) === false) {
            this.chsubjects.push(key["Child Subject"]);
          }
        }
      }
    }
  }

  fillAll(upflag?) {
    this.providers = this.providers.slice(0, 1);
    this.universities = this.universities.slice(0, 1);
    this.subjects = this.subjects.slice(0, 1);
    this.chsubjects = this.chsubjects.slice(0, 1);
    this.fillProviders(upflag);
    this.fillUniversities(upflag);
    this.fillSubjects(upflag);
    this.fillChSubjects(upflag);
  }

  update() {
    if (
      this.chsubject === undefined &&
      this.provider === undefined &&
      this.university === undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(x => x["Parent Subject"] === this.subject);
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider === undefined &&
      this.university !== undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x => x.Universities["Institutions"] === this.university
      );
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider === undefined &&
      this.university !== undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x.Universities["Institutions"] === this.university &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider !== undefined &&
      this.university === undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(x => x["Provider"] === this.provider);
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider !== undefined &&
      this.university === undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x => x["Provider"] === this.provider && x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider !== undefined &&
      this.university !== undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Provider"] === this.provider &&
          x.Universities["Institutions"] === this.university
      );
      this.fillAll();
    } else if (
      this.chsubject === undefined &&
      this.provider !== undefined &&
      this.university !== undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Provider"] === this.provider &&
          x.Universities["Institutions"] === this.university &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider === undefined &&
      this.university === undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(x => x["Child Subject"] === this.chsubject);
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider === undefined &&
      this.university === undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider === undefined &&
      this.university !== undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x.Universities["Institutions"] === this.university
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider === undefined &&
      this.university !== undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x.Universities["Institutions"] === this.university &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider !== undefined &&
      this.university === undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject && x["Provider"] === this.provider
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider !== undefined &&
      this.university === undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x["Provider"] === this.provider &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider !== undefined &&
      this.university !== undefined &&
      this.subject === undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x["Provider"] === this.provider &&
          x.Universities["Institutions"] === this.university
      );
      this.fillAll();
    } else if (
      this.chsubject !== undefined &&
      this.provider !== undefined &&
      this.university !== undefined &&
      this.subject !== undefined
    ) {
      this.datas = [];
      this.datas = this._datas.filter(
        x =>
          x["Child Subject"] === this.chsubject &&
          x["Provider"] === this.provider &&
          x.Universities["Institutions"] === this.university &&
          x["Parent Subject"] === this.subject
      );
      this.fillAll();
    } else {
      this.datas = [];
      Object.assign(this.datas, this._datas);
      this.fillAll(true);
    }

    if (this.sortby !== undefined) {
      this.sortfn();
    }
    if (this.searchString !== '') {
      this.searchInput();
    }
  }

  sortfn() {

    if (this.sortby === 'Length') {
      this.datas = this.datas.sort((a, b) => {
        return b['Length'] - a['Length'];
      })
    }
    if (this.sortby === 'Next Session Date') {
      this.datas = this.datas.sort((a, b) => {
        let f: any = '';
        let s: any = '';
        if (a['Next Session Date'] && a['Next Session Date'].includes(',')) {
          f = a['Next Session Date'];
          f = f.replace('th ', '-');
          f = f.replace(', ', '-');
          if (f.length < 10) {
            f = "01-" + f;
          }

          f = moment(f, 'DD-MMM-YYYY').format('DD-MM-YYYY');
          f = f.split('-');
          f = new Date(f[2], f[1], f[0]);
          f.setHours(0, 0, 0, 0);

        } else {
          f = new Date('01-01-1000');
          f.setHours(0, 0, 0, 0);
        }
        if (b['Next Session Date'] && b['Next Session Date'].includes(',')) {
          s = b['Next Session Date'];
          s = s.replace('th ', '-');
          s = s.replace(', ', '-');
          if (s.length < 10) {
            s = "01-" + s;
          }

          s = moment(s, 'DD-MMM-YYYY').format('DD-MM-YYYY');
          s = s.split('-');
          console.log(s);
          s = new Date(s[2], s[1], s[0]);
          console.log(s);
          s.setHours(0, 0, 0, 0);
        } else {
          s = new Date('01-01-1000');
          s.setHours(0, 0, 0, 0);
        }

        return s - f;

      })
    }
    if (this.sortby === undefined) {
      this.update();
    }
    if (this.searchString !== '') {
      this.searchInput();
    }
  }

  searchInput() {
    if (this.searchString !== '') {
      this.datas = this.datas.filter(x => x["Course Name"].toString().toLowerCase().includes(this.searchString.toLowerCase()));

      // we can add more conditions
      // x["Course Id"].toString().includes(this.searchString) || x["Course Name"].toString().includes(this.searchString || ......

    } else {
      this.update();
      this.sortfn();
    }
  }
}
