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

  // plantPexelsURL: string[] = [];
  constructor(
    private plantsService: PlantsService,
    private pexelsService: PexelsService
  ) {}

  ngOnInit(): void {
    this.getPlantsURLs(this.selectedPlant);
    this.getUrls();
  }

  getUrls() {
    // this.forPlantPage
    //   ? this.getPlantsURLs(this.selectedPlant)
    //   : this.getPlantsURLs(this.plantType);
    // this.s
  }

  getPlantsURLs(plantType: string) {
    if (this.slideToggle) {
      this.plantsService.getPhotoList(plantType).subscribe((response) => {
        this.plantsURL = response["scrapedPhotosLinks"];
      });
    } else {
      this.pexelsService.getPhotos(this.selectedPlant, 10).subscribe((resp) => {
        console.log(resp.photos[0].src.original);
        this.plantsURL = [];
        for (var i = 0; i < resp.photos.length; i++) {
          this.plantsURL.push(resp.photos[i].src.original);
        }
        console.log(this.plantsURL);
      });
    }
  }

  selectPlant(plant: string) {
    this.selectedPlant = plant;
    this.getPlantsURLs(this.selectedPlant);
  }

  slideToggler() {
    console.log("TOGGGLE", this.slideToggle)
    this.slideToggle = !this.slideToggle;
  }

  changePhotoSource() {
    console.log("EVENT FOR CHAGING SOURCE")
    this.getPlantsURLs(this.selectedPlant);
  }
}
