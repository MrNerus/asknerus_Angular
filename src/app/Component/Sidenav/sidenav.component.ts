import { Component, Input } from '@angular/core';
import { MenuGroups, CdkMenuStandaloneMenuExample, ButtonMain } from '../../Element/MenuButton/menuButton.component';
import { NgFor } from '@angular/common';
import { IconButtonComponent } from "../../Element/iconButton/iconButton.component";

@Component({
    selector: 'app-sidenav',
    standalone: true,
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    imports: [CdkMenuStandaloneMenuExample, NgFor, IconButtonComponent]
})
export class SidenavComponent {
  toggleOpen: boolean = true;

  // Also, intended to serve as input sample.
  @Input() menuCollections: MenuCollections = {
    menuCollections: [
      {
        icon: 'home',
        text: 'Home',
        menuGroups: [
          {
            icon: 'web',
            text: 'Web',
            children: [
              {icon: 'search', text: 'Search', href: '#'}
            ] // More can be added to this list
          }
        ] // More can be added to this list
      }
    ] // More can be added to this list
  }

  toggleToggleOpen(): void {
    this.toggleOpen =!this.toggleOpen;
  }
}
interface MenuCollections {
  menuCollections: ButtonMain[]    
}