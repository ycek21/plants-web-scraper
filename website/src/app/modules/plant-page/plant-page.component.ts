import { WikipediaDataService } from "./../../core/services/wikipedia-data.service";
import { Component, OnInit } from "@angular/core";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wikipediaService: WikipediaDataService
  ) {}

  ngOnInit(): void {
    this.preparePage();
  }

  preparePage() {
    this.plantType = this.route.snapshot.paramMap
      .get("plantType")
      .toUpperCase();

    const plantPhotoSource = this.route.snapshot.paramMap.get("pexelsId");

    if (plantPhotoSource !== null) {
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
