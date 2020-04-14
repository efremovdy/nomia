import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Section } from '../../models/section';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  constructor(private itemsService: ItemsService) {

  }

  ngOnInit() {
  }
}
