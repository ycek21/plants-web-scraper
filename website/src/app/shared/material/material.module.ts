import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatChipsModule, MatSlideToggleModule],
  exports: [MatIconModule, MatChipsModule, MatSlideToggleModule],
})
export class MaterialModule {}
