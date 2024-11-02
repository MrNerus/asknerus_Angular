import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";

@Component({
    selector: 'app-viewClassrooom',
    styleUrl: './viewClassroom.component.css',
    templateUrl: './viewClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, ToggleComponent],
    // encapsulation: ViewEncapsulation.None
})

export class viewClassroomComponent {
    @Input({ required: true }) props: Partial<IViewClassroom> = {};

    classCode: string = '';
    className: string = '';
    isActive: boolean = false;

    ngOnInit(): void {
        this.classCode = this.props.classCode ?? "No Code Provided";
        this.className = this.props.className ?? "No Name Provided";
        this.isActive = this.props.isActive ?? false;
    }
};

export interface IViewClassroom {
    classCode?: string;
    className?: string;
    isActive?: boolean;
}