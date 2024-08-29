import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../Element/DropDown/dropDown.component";


@Component({
    selector: 'app-addClassrooom',
    styleUrl: 'addClassroom.component.css',
    templateUrl: 'addClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent],
    // encapsulation: ViewEncapsulation.None
})

export class addClassroomComponent {
    // @Input({ required: true }) props: Partial<ITemplate> = {};

    ngOnInit(): void {

    }
};

export interface IAddClassroom {

}