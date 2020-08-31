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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPhotoPage() {
    const urlToPhoto = this.plantPhoto.split('/photos');
    this.router.navigateByUrl(urlToPhoto[1]);
  }
}
