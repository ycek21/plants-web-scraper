import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plant-page',
  templateUrl: './plant-page.component.html',
  styleUrls: ['./plant-page.component.css']
})
export class PlantPageComponent implements OnInit {
  plantType = '';
  plantPhotoUrl = 'http://localhost:8085/api/photos/';

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.preparePage();
  }

  preparePage() {
    this.plantType = this.route.snapshot.paramMap.get('plantType').toUpperCase();
    this.plantPhotoUrl += this.plantType.toLowerCase() + '/';
    this.plantPhotoUrl += this.route.snapshot.paramMap.get('id');;

  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}

