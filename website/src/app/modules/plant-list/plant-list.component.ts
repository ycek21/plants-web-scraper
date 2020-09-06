import { PexelsService } from "./../../core/services/pexels.service";
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
  selectedPlant = "";
  plantsURL: string[] = [];
  slideToggle = true;
  loadingPhotosList;
  @Input() forPlantPage = false;
  @Input() plantType = "";
  @Input() displayedInPexelsPage = false;

  constructor(
    private plantsService: PlantsService,
    private pexelsService: PexelsService
  ) {}

  ngOnInit(): void {
    this.selectPlantAtTheBeginning();
    this.getPlantsURLs(this.selectedPlant);
  }

  getPlantsURLs(plantType: string) {
    if (this.slideToggle) {
      if (!this.displayedInPexelsPage) {
        this.plantsService.getPhotoList(plantType).subscribe((response) => {
          this.plantsURL = response["scrapedPhotosLinks"];
          this.loadingPhotosList = false;
        });
      } else {
        this.pexelsService
          .getPhotos(this.selectedPlant, 500)
          .subscribe((resp) => {
            this.plantsURL = [];
            for (var i = 0; i < resp.photos.length; i++) {
              this.plantsURL.push(resp.photos[i].src.original);
            }

            this.loadingPhotosList = false;
          });
      }
    } else {
      this.pexelsService
        .getPhotos(this.selectedPlant, 500)
        .subscribe((resp) => {
          this.plantsURL = [];
          for (var i = 0; i < resp.photos.length; i++) {
            this.plantsURL.push(resp.photos[i].src.original);
          }

          this.loadingPhotosList = false;
        });
    }
  }

  selectPlant(plant: string) {
    this.loadingPhotosList = true;
    this.selectedPlant = plant;
    this.getPlantsURLs(this.selectedPlant);
  }

  slideToggler() {
    this.loadingPhotosList = true;
    this.slideToggle = !this.slideToggle;
  }

  changePhotoSource() {
    this.loadingPhotosList = true;
    this.getPlantsURLs(this.selectedPlant);
  }

  selectPlantAtTheBeginning() {
    this.loadingPhotosList = true;
    if (this.plantType === "") {
      this.selectedPlant = "cactus";
    } else {
      this.selectedPlant = this.plantType;
    }
  }
}
