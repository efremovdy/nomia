import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private itemsService: ItemsService, private router: Router) {

  }

  ngOnInit() {
    this.getSections();
  }

  public clickByDropdown(el: any, hideAddSection = false) {
    this._lastClickedEl = el;
    if (hideAddSection) {
      this._lastClickedEl.hideAddSection = true;
    }
    console.log(el);
    console.log(document.activeElement);
    // TODO: подумать как взять активный элемент
  }

  public get hideAddSection() {
    return this._lastClickedEl && this._lastClickedEl.hideAddSection;
  }

  public get isItem() {
    return this._lastClickedEl && this._lastClickedEl.sale;
  }

  public addItem() {
    console.log(this._lastClickedEl);
    this.router.navigate(['/item']);
  }

  public addSection() {
    this.router.navigate(['/section'], { queryParams: { name: this._lastClickedEl.name } });
  }

  public edit() {
    if (!this.hideAddSection) {
      this.router.navigate(['/section'], { queryParams: { name: this._lastClickedEl.name, isEdit: true } });
    } else if (this.isItem) {

    }
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
