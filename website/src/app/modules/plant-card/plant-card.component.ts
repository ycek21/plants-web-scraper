import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.css"],
})
export class PlantCardComponent implements OnInit {
  @Input() plantPhoto: string;
  @Input() photoCardIndex;
  @Input() plantName;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPhotoPage() {
    const urlToPhoto = this.plantPhoto.split("/photos");
    const plantPhotoSource = this.plantPhoto.split("://");

    //https://images.pexels.com/photos/1253718/pexels-photo-1253718.jpeg
    //http://localhost:8085/api/photos/cactus/photo-6.png

    if (plantPhotoSource[0] === "https") {
      console.log("PEXELS: ", plantPhotoSource);
      console.log("urlToPhoto: ", urlToPhoto);
      const url = this.plantName + urlToPhoto[1];
      console.log("URL", url);
      this.router.navigateByUrl(url);

    } else {
      console.log("NOT PEXELS: ", plantPhotoSource);
      console.log("urlToPhoto: ", urlToPhoto);

      this.router.navigateByUrl(urlToPhoto[1]);
    }
  }
}
