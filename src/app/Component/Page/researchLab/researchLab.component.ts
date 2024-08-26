import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../Pipe/sanitizer";
import { IconButtonComponent } from "../../../Element/iconButton/iconButton.component";
import { IconLinkComponent } from "../../../Element/iconLink/iconLink.component";
import { CdkMenuStandaloneMenuExample } from "../../../Element/MenuButton/menuButton.component";
import { TextBoxComponent } from "../../../Element/TextBox/textBox.component";

@Component({
    selector: 'app-researchLab',
    styleUrl: 'researchLab.component.css',
    templateUrl: 'researchLab.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, IconButtonComponent, IconLinkComponent, CdkMenuStandaloneMenuExample, TextBoxComponent],
    encapsulation: ViewEncapsulation.None
})

export class ResearchLabComponent {
    // @Input({ required: true }) props: Partial<IResearchLab> = {};

    ngOnInit(): void {

    }
};

export interface IResearchLab {

}