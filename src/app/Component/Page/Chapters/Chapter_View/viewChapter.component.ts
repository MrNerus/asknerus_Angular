import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { Classes } from '../../../../APIHandeler/Class.api';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import { TextBoxComponent } from "../../../../Element/TextBox/textBox.component";
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-viewChapter',
    styleUrl: 'viewChapter.component.css',
    templateUrl: 'viewChapter.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe, DropdownComponent, TextBoxComponent, ToggleComponent, IconButtonComponent, FormsModule],
    encapsulation: ViewEncapsulation.None
})

export class ViewChapterComponent {
    @Input({ required: true }) props: Partial<IViewChapter> = {};
    
    classes: IClassroom[] = []

    async ngOnInit(): Promise<void> {
        var obj_class = new Classes();
        this.classes = await obj_class.getClassList();
    }

    
};

export interface IViewChapter {

}