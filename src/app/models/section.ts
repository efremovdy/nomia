import { Item } from './item';

export class Section {
  items?: Item[];
  name: string;
  sections?: Section[];
}
