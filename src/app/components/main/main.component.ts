import { Component, OnInit, ElementRef } from '@angular/core';
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

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.getSections();
  }

  // TODO: handle focus on each child box, than enable 'Позиция' btn
  /* ngAfterViewInit() {
    const headers = this.elementRef.nativeElement.querySelectorAll('.lcg-box__header');
    headers.forEach(h => {
      h.addEventListener('focus', this.onFocus.bind(this));
    });
  }
  private onFocus(event) {
    console.log(event);
  } */

  public clickByDropdown(el: any, hideAddSection = false) {
    this._lastClickedEl = el;
    if (hideAddSection) {
      this._lastClickedEl.hideAddSection = true;
    }
  }

  public get hideAddSection() {
    return this._lastClickedEl && this._lastClickedEl.hideAddSection;
  }

  public get isItem() {
    return this._lastClickedEl && this._lastClickedEl.sale;
  }

  public addItem() {
    this.router.navigate(['/item'], { queryParams: { name: this._lastClickedEl.name } });
  }

  public addSection() {
    this.router.navigate(['/section'], { queryParams: { name: this._lastClickedEl.name } });
  }

  public edit() {
    if (!this.hideAddSection) {
      this.router.navigate(['/section'], { queryParams: { name: this._lastClickedEl.name, isEdit: true } });
    } else if (this.isItem) {
      this.router.navigate(['/item'], {
        queryParams: {
          name: this._lastClickedEl.name,
          sale: this._lastClickedEl.sale,
          isEdit: true
        }
      });
    }
  }

  public delete() {
    // not the best solution, but quick
    const el = JSON.stringify(this._lastClickedEl);
    const source = JSON.stringify(this.sections);
    this.sections = JSON.parse(source.replace(el, '').replace(',]', ']').replace('[,', '[').replace(',,', ','));
    this.itemsService.setSections(this.sections);
  }

  private getSections() {
    this.sections = this.itemsService.getSections();
  }
}
