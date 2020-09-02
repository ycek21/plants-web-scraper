import { PexelsService } from "./../../core/services/pexels.service";
import { PlantsService } from "./../../core/services/plants.service";
import { Component, OnInit, Input } from "@angular/core";
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
  @Input() forPlantPage = false;
  @Input() plantType;
  @Input() displayedInPexelsPage = false;

  // plantPexelsURL: string[] = [];
  constructor(
    private plantsService: PlantsService,
    private pexelsService: PexelsService
  ) {}

  ngOnInit(): void {
    this.getPlantsURLs(this.selectedPlant);
  }

  getPlantsURLs(plantType: string) {
    if (this.slideToggle) {
      if (!this.displayedInPexelsPage) {
        this.plantsService.getPhotoList(plantType).subscribe((response) => {
          this.plantsURL = response["scrapedPhotosLinks"];
        });
      } else {
        this.pexelsService
          .getPhotos(this.selectedPlant, 10)
          .subscribe((resp) => {
            this.plantsURL = [];
            for (var i = 0; i < resp.photos.length; i++) {
              this.plantsURL.push(resp.photos[i].src.original);
            }
          });
      }
    } else {
      this.pexelsService.getPhotos(this.selectedPlant, 10).subscribe((resp) => {
        this.plantsURL = [];
        for (var i = 0; i < resp.photos.length; i++) {
          this.plantsURL.push(resp.photos[i].src.original);
        }
      });
    }
  }

  selectPlant(plant: string) {
    this.selectedPlant = plant;
    this.getPlantsURLs(this.selectedPlant);
  }

  slideToggler() {
    this.slideToggle = !this.slideToggle;
  }

  changePhotoSource() {
    this.getPlantsURLs(this.selectedPlant);
  }
}
