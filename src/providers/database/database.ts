import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
 
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'datlich.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
 
  fillDatabase() {
    this.http.get('assets/database.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }
 
  addDatlich(ngay, thoigianbatdau, thoigianketthuc, tieude, noidung) {
    let data = [ngay, thoigianbatdau, thoigianketthuc, tieude, noidung];
    return this.database.executeSql("INSERT INTO datlich (ngay, thoigianbatdau, thoigianketthuc, tieude, noidung) VALUES (?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
 
  getAllDatlichs() {
    return this.database.executeSql("SELECT * FROM datlich", []).then((data) => {
      let datlichs = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          datlichs.push({ ngay: data.rows.item(i).ngay,thoigianbatdau: data.rows.item(i).thoigianbatdau,thoigianketthuc: data.rows.item(i).thoigianketthuc, tieude: data.rows.item(i).tieude, noidung: data.rows.item(i).noidung });
        }
      }
      return datlichs;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
}