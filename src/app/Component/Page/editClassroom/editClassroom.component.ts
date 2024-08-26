import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../Pipe/sanitizer";

@Component({
    selector: 'app-editClassrooom',
    styleUrl: 'editClassroom.component.css',
    templateUrl: 'editClassroom.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class editClassroomComponent {
    @Input({ required: true }) props: Partial<ITemplate> = {};

    ngOnInit(): void {

    }
};

export interface ITemplate {

}