import { PexelsService } from "./../../core/services/pexels.service";
import { PlantsService } from "./../../core/services/plants.service";
import { Component, OnInit } from "@angular/core";
import { report } from "process";

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
  plantPexelsURL: string[] = [];
  constructor(
    private plantsService: PlantsService,
    private pexelsService: PexelsService
  ) {}

  ngOnInit(): void {
    this.getPlantsURLs(this.selectedPlant);
    this.pexelsService.getPhotos("rose", 10).subscribe((resp) => {
      console.log(resp.photos[0].src.original);
      for (var i = 0; i < resp.photos.length; i++) {
        this.plantPexelsURL.push(resp.photos[i].src.original);
      }
      console.log(this.plantPexelsURL);
    });
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
