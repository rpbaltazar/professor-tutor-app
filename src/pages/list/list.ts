import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'list-page',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;
  students: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.students = [];

    this.loadStudents();
    this.items = [];
    for(let i = 0; i < this.students.length; i++) {
        this.items.push({
          title: this.students[i],
          note: '12H',
          icon: 'person'
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  loadStudents() {
    this.students = ['Maria', 'Joao', 'Francisco', 'Rui', 'Manuela'];
  }
}
