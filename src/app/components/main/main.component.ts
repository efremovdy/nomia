import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Section } from './../../models/section';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  public sections: Section[] = [];
  private _lastClickedEl: any = null;

  constructor(private itemsService: ItemsService) {

  }

  ngOnInit() {
    this.getSections();
  }

  public clickByDropdown(el: any) {
    this._lastClickedEl = el;
  }

  public addItem() {
    console.log(this._lastClickedEl);
  }

  public addSection() {
    console.log(this._lastClickedEl);
  }

  public edit() {
    console.log(this._lastClickedEl);
  }

  public delete() {
    // not the best solution, but quick
    const el = JSON.stringify(this._lastClickedEl);
    const source = JSON.stringify(this.sections);
    this.sections = JSON.parse(source.replace(el, '').replace(',]', ']').replace('[,', '[').replace(',,', ','));
  }

  private setSections() {

  }

  private getSections() {
    this.sections = this.itemsService.getSections();
  }
}
