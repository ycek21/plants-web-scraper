import { Component, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plantsType: string[] = [
    'Rose',
    'Tulip',
    'Orchid',
    'Cactus',
    'Sunflower',
    'Hydrangea',
    'Fern',
    'Lavender',
    'Palm'
  ];
  selectedPlant: string;

  constructor() {}

  ngOnInit(): void {}

  selectPlant(plant: string) {
    this.selectedPlant = plant;
  }
}
