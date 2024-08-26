import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../Pipe/sanitizer";

@Component({
    selector: 'app-template',
    styleUrl: 'template.component.css',
    templateUrl: 'template.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class TemplateComponent {
    @Input({ required: true }) props: Partial<ITemplate> = {};

    ngOnInit(): void {

    }
};

export interface ITemplate {

}