// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { NgComponentOutlet, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconLink } from '../Element/iconLink/iconLink.component';
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
    @Input() props: TopMenus = {
        children: [
            {
                icon: 'home', 
                text: 'Home', 
                children: [
                    {
                        icon: 'web', 
                        text: 'Web', 
                        children: [
                            {icon: 'search', text: 'Search'}
                        ]
                    }
                ]
            }
        ]
    };
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
    children: IconLink[];
};
