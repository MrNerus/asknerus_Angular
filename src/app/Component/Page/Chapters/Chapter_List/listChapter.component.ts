import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import customConfig from '../../../../../customConfig.json';
import { ToggleComponent } from '../../../../Element/Toggle/toggle.component';

@Component({
    selector: 'app-listChapter',
    styleUrl: './listChapter.component.css',
    templateUrl: './listChapter.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule],
    // encapsulation: ViewEncapsulation.None
})

export class ListChapteromponent {
    // @Input({ required: true }) props: Partial<ITemplate> = {};

    ngOnInit(): void {
        
    }

    clearForm() {
        
    }

    submit() {
        
    }

};

