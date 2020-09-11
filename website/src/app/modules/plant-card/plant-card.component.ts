import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.css"],
})
export class PlantCardComponent implements OnInit {
  @Input() plantPhoto: string;
  @Input() photoCardIndex;
  @Input() plantName;
  defaultPhoto = 'https://www.placecage.com/1000/1000';

  constructor(private router: Router, private activetedRoutes: ActivatedRoute) {}

  ngOnInit(): void {
  }

  goToPhotoPage() {
    const urlToPhoto = this.plantPhoto.split("/photos");
    const plantPhotoSource = this.plantPhoto.split("://");

    if (plantPhotoSource[0] === "https") {
      const url = this.plantName + urlToPhoto[1];
      this.router.navigateByUrl(url);

    } else {
      this.router.navigateByUrl(urlToPhoto[1], { skipLocationChange: false });
    }
  }
}
