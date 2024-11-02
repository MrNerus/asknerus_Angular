import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";

@Component({
    selector: 'app-editClassrooom',
    styleUrl: 'editClassroom.component.css',
    templateUrl: 'editClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, ToggleComponent],
    // encapsulation: ViewEncapsulation.None
})

export class editClassroomComponent {
    @Input({ required: true }) props: Partial<IEditClassroom> = {};

    classCode: string = '';

    ngOnInit(): void {
        this.classCode = this.props.classCode ?? "No ClassCode Provided";
    }
};

export interface IEditClassroom {
    classCode?: string;
}