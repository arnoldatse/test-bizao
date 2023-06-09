import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceRoutingModule } from './space-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TestComponent } from './test/test.component';
import { TopBarComponent } from './layout/components/top-bar/top-bar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    TestComponent,
    TopBarComponent
  ],
  imports: [
    SpaceRoutingModule,
    CommonModule
  ]
})
export class SpaceModule { }
