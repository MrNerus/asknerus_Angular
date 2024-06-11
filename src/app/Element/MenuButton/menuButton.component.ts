import {Component, Input} from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { OverlayRef } from '@angular/cdk/overlay';
import { IconButtonComponent } from '../iconButton/iconButton.component';
import { NgComponentOutlet, NgFor } from '@angular/common';
import { IconLink, IconLinkComponent } from '../iconLink/iconLink.component';
/** @title Menu with Standalone Trigger. */
@Component({
    selector: 'app-menu-button',
    styleUrl: 'menuButton.component.css',
    templateUrl: 'menuButton.component.html',
    standalone: true,
    imports: [NgComponentOutlet, NgFor, CdkMenuTrigger, CdkMenu, CdkMenuItem, IconButtonComponent, IconLinkComponent]
})
// export class CdkMenuStandaloneMenuExample {}

export class CdkMenuStandaloneMenuExample {
  @Input() buttonMain: ButtonMain = {
                  icon: 'box', 
                  text: 'Button', 
                  menuGroups: [
                    {
                      icon: 'box', 
                      text: 'Heading', 
                      children: [
                          {icon: 'box', text: 'Link', href: '#'}
                      ]
                    }
                  ]
                }
};


export interface MenuGroups {
  icon: string;
  text: string;
  children: IconLink[];
};

export interface ButtonMain {
    icon: string;
    text: string;
    menuGroups: MenuGroups[];
}