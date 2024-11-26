import { Component, isStandalone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconButtonComponent } from './Element/iconButton/iconButton.component';
import { IconLinkComponent } from './Element/iconLink/iconLink.component';
import { NavbarComponent } from './Component/navbar.component';
import { CdkMenuStandaloneMenuExample } from "./Element/MenuButton/menuButton.component";
import { SidenavComponent } from "./Component/Sidenav/sidenav.component";
import { TextBoxComponent } from "./Element/TextBox/textBox.component";
import { ResearchLabComponent } from "./Component/Page/researchLab/researchLab.component";
import { AddClassroomComponent } from "./Component/Page/classroom/addClassroom/addClassroom.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      IconButtonComponent,
      IconLinkComponent,
      NavbarComponent,
      CdkMenuStandaloneMenuExample,
      SidenavComponent,
      TextBoxComponent,
      ResearchLabComponent,
      AddClassroomComponent
  ]
})
export class AppComponent {
  title = 'Ask Nerus';
}
