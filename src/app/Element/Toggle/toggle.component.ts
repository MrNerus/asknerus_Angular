import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";

@Component({
    selector: 'app-toggle',
    styleUrl: 'toggle.component.css',
    templateUrl: 'toggle.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class ToggleComponent {
    @Input({ required: true }) props: Partial<IToggle> = {};

    attr_name: string = '';
    attr_id: string = '';
    attr_isChecked: string = '';
    attr_isReadOnly: string = '';
    attr_class_isReadOnly: string = '';

    universal_toggle: string = '';

    ngOnInit(): void {
        this.attr_name = this.props.name ? `name='${this.props.name}'` : '';
        this.attr_id = this.props.id ? `id='${this.props.id}'` : '';
        this.attr_isChecked = this.props.isChecked ? 'checked' : '';
        this.attr_isReadOnly = this.props.isReadOnly ? `class="cursor_readonly" onclick='return false' onkeydown='return false'` : '';
        this.attr_class_isReadOnly = this.props.isReadOnly ? `cursor_readonly` : '';

        this.universal_toggle = `
        <label class="switch ${this.attr_class_isReadOnly}">
            <input type="checkbox" ${this.attr_name} ${this.attr_id} ${this.attr_isChecked} ${this.attr_isReadOnly}>
            <span class="slider round"></span>
        </label>
        `
    }
};

export interface IToggle {
    name?: string;
    id?: string;
    isChecked?: boolean;
    isReadOnly?: boolean;
}