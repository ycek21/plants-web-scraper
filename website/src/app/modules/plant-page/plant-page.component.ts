import { WikipediaDataService } from "./../../core/services/wikipedia-data.service";
import { Component, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-plant-page",
  templateUrl: "./plant-page.component.html",
  styleUrls: ["./plant-page.component.css"],
})
export class PlantPageComponent implements OnInit {
  plantType = "";
  plantPhotoUrl = "http://localhost:8085/api/photos/";
  plantDescription = "";
  plantKingdom = "";
  plantOrder = "";
  plantFamily = "";
  displayedInPexelsPage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wikipediaService: WikipediaDataService
  ) {}

  ngOnInit(): void {
    this.preparePage();
    this.refreshPage();
  }

  // HOW IT WORKS !!
  // Gdy po raz pierwszy klikniemy w zdjęcie w photo-list to załaduje sie plany-page;
  // Tylko raz wywołana zostanie funkcja preparePage(), dlatego my w ngOnInit wywołujemy rowniez funkcje refreshPage()
  // To dzięki niej subskrybujemy do eventu zmiany URL(tak naprawde parametrow)
  // Gdy tak sie stanie pobieramy jeszcze raz parametry i podmieniamy źródło planyPhotoUrl,
  // Dokladnie tak samo bedziemy musieli zrobic z opisem

  refreshPage() {
    this.route.params.subscribe((routeParams) => {
      this.plantPhotoUrl = '';

      const plantPhotoSource = routeParams.pexelsId;

      if (plantPhotoSource !== null) {
        this.displayedInPexelsPage = true;
        this.plantPhotoUrl = "https://images.pexels.com/photos/";
        this.plantPhotoUrl += routeParams.id + "/";
        this.plantPhotoUrl += routeParams.pexelsId;
      } else {
        this.plantPhotoUrl = 'http://localhost:8085/api/photos/';
        this.plantPhotoUrl += routeParams.plantType + "/";
        this.plantPhotoUrl += routeParams.id;
      }
    });
  }

  preparePage() {
    this.plantType = this.route.snapshot.paramMap
      .get("plantType")
      .toUpperCase();

    const plantPhotoSource = this.route.snapshot.paramMap.get("pexelsId");

    if (plantPhotoSource !== null) {
      this.displayedInPexelsPage = true;
      this.plantPhotoUrl = "https://images.pexels.com/photos/";
      this.plantPhotoUrl += this.route.snapshot.paramMap.get("id") + "/";
      this.plantPhotoUrl += this.route.snapshot.paramMap.get("pexelsId");
    } else {
      this.plantPhotoUrl += this.plantType.toLowerCase() + "/";
      this.plantPhotoUrl += this.route.snapshot.paramMap.get("id");
    }

    // this.getPlantInfo();
  }

  navigateToHome() {
    this.router.navigate(["/home"]);
  }

  getPlantInfo() {
    this.wikipediaService
      .getPlantData(this.plantType.toLowerCase())
      .subscribe((response) => {
        // let sth = response.toString().replace('\\', '');
        // // let sth2 = JSON.parse(sth);
        // console.log('DATA:', sth)
      });
  }
}
