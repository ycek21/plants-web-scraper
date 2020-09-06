import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatChipsModule, MatSlideToggleModule, MatProgressSpinnerModule],
  exports: [MatIconModule, MatChipsModule, MatSlideToggleModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
