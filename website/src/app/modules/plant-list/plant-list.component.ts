import { PlantsService } from "./../../core/services/plants.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-plant-list",
  templateUrl: "./plant-list.component.html",
  styleUrls: ["./plant-list.component.css"],
})
export class PlantListComponent implements OnInit {
  plantsType: string[] = [
    "rose",
    "tulip",
    "orchid",
    "cactus",
    "sunflower",
    "hydrangea",
    "fern",
    "lavender",
    "palm",
  ];
  selectedPlant = "cactus";
  plantsURL: string[] = [];
  slideToggle = true;
  @Input() forPlantPage = false;
  @Input() plantType;

  constructor(private plantsService: PlantsService) {}

  ngOnInit(): void {
    this.getPlantsURLs(this.selectedPlant);
  }

  getUrls() {
    this.forPlantPage
      ? this.getPlantsURLs(this.selectedPlant)
      : this.getPlantsURLs(this.plantType);
  }

  getPlantsURLs(plantType: string) {
    this.plantsService.getPhotoList(plantType).subscribe((response) => {
      this.plantsURL = response["scrapedPhotosLinks"];
    });
  }

  selectPlant(plant: string) {
    this.selectedPlant = plant;
    this.getPlantsURLs(this.selectedPlant);
  }
}
