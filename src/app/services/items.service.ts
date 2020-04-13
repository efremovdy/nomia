import { Injectable } from '@angular/core';

import { Section } from '../models/section';
import menu from '../../mock/menu.json';

const STORAGE_PREFIX = 'nomia';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor() {
    if (!this.getSections().length) {
      this.setSections(menu);
    }
  }

  getSections() {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX)) || [];
  }

  setSections(sections: Section[]) {
    localStorage.setItem(STORAGE_PREFIX, JSON.stringify(sections));
  }

}
