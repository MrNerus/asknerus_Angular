import { NgComponentOutlet, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IIconLink } from '../Element/iconLink/iconLink.component';
import { IconButtonComponent } from "../Element/iconButton/iconButton.component";

@Component({
    selector: 'nav-bar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    inputs: ['props'],
    imports: [NgFor, IconButtonComponent]
})
export class NavbarComponent {
    @Input({ required: true }) props: Partial<TopMenus> = {}
topMenus: MenuMains[] = this.props.children;
}
interface TopMenus {
    children: MenuMains[];
}

interface MenuMains {
    icon: string;
    text: string;
    children: MenuGroups[];
}

interface MenuGroups {
    icon: string;
    text: string;
    children: IIconLink[];
};
