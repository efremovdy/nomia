import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Section } from '../../models/section';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  public itemForm: FormGroup;
  public sections: Section[];
  public isEdit = null;
  private name: string = null;
  private sale: number = null;

  constructor(
    private itemsService: ItemsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.getSections();
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.isEdit = this.route.snapshot.queryParamMap.get('isEdit');
    this.sale = parseInt(this.route.snapshot.queryParamMap.get('sale'));
    this.itemForm = this.formBuilder.group({
      name: [this.isEdit ? this.name : '', Validators.required],
      sale: [this.isEdit ? this.sale : null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.itemForm.controls; }

  private getSections() {
    this.sections = this.itemsService.getSections();
  }

  private flatSections(sections: Section[], mainSections: Section[] = []) {
    let output = [];
    sections.forEach(section => {
      if (section.name && (!section.items.length || section.items[0].sale)) {
        if (!mainSections.includes(section)) {
          output.push(section);
        }
      }
      if (section.sections.length) {
        output = output.concat(this.flatSections(section.sections));
      }
    });
    return output;
  }

  private addItemToSection(sections = this.sections) {
    const newItem = { name: this.f.name.value, sale: this.f.sale.value };
    sections.forEach(s => {
      if (s.name === this.name) {
        s.items.push(newItem);
      } else if (s.sections && s.sections.length) {
        this.addItemToSection(s.sections);
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      const oldItem = { name: this.name, sale: this.sale };
      const newItem = { name: this.f.name.value, sale: this.f.sale.value };
      this.sections = JSON.parse(JSON.stringify(this.sections).replace(JSON.stringify(oldItem), JSON.stringify(newItem)));
    } else {
      this.addItemToSection();
    }
    this.itemsService.setSections(this.sections);
    this.router.navigate(['/']);
  }
}
