import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Section } from '../../models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.less']
})
export class SectionComponent implements OnInit {
  public sectionForm: FormGroup;
  public sections: Section[];
  public isEdit = null;
  private name = null;

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
    this.sectionForm = this.formBuilder.group({
      name: [this.isEdit ? this.name : '', Validators.required],
      section: [
        {
          value: this.name ? this.name : null,
          disabled: this.isEdit ? true : false
        },
        Validators.required],
      color: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.sectionForm.controls; }

  private getSections() {
    this.sections = this.itemsService.getSections();
    //this.sections = this.flatSections(sections, sections);

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

  onSubmit() {
    if (this.isEdit) {
      this.sections.forEach(s => {
        if (s.name === this.name) {
          s.name = this.f.name.value;
        }
      });
    } else {
      if (this.f.section.value === 'null') {
        this.sections.push({ name: this.f.name.value, sections: [], items: [] });
      } else {
        this.sections.forEach(s => {
          if (s.name === this.f.section.value) {
            s.sections.push({ name: this.f.name.value, sections: [], items: [] });
          }
        });
      }
    }
    this.itemsService.setSections(this.sections);
    this.router.navigate(['/']);
  }
}
