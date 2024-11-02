import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";

@Component({
    selector: 'app-textBox',
    styleUrl: 'textBox.component.css',
    templateUrl: 'textBox.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe],
    encapsulation: ViewEncapsulation.None
})

export class TextBoxComponent {
    @Input({ required: true }) props: Partial<ITextBox> = {};


    attr_regex: string        = '';
    attr_placeholder: string  = '';
    attr_value: string        = '';
    attr_type: string         = '';
    attr_label: string        = '';
    attr_icon: string         = '';
    attr_tooltip: string      = '';
    attr_name: string         = '';
    attr_id: string           = '';
    attr_isRequired: string   = '';
    attr_isReadonly: string   = '';
    attr_class_isReadonly: string   = '';
    universal_textBox: string = '';

    ngOnInit(): void {
        console.log(this.props);
        this.attr_regex       = this.props.regex       ? `pattern = '${this.props.regex}'`                                  : '';
        this.attr_placeholder = this.props.placeholder ? `placeholder = '${this.props.placeholder}'`                        : '';
        this.attr_value       = this.props.value       ? `value = '${this.props.value}'`                                    : '';
        this.attr_type        = this.props.type        ? `type = '${this.props.type}'`                                      : '';
        this.attr_label       = this.props.label       ? `label = '${this.props.label}'`                                    : '';
        this.attr_icon        = this.props.icon        ? `<span class="material-symbols-rounded">${this.props.icon}</span>` : '';
        this.attr_tooltip     = this.props.tooltip     ? `<div class="tooltip">${this.props.tooltip}</div>`                 : '';
        this.attr_name        = this.props.name        ? `name = '${this.props.name}'`                                      : '';
        this.attr_id          = this.props.id          ? `id = '${this.props.id}'`                                          : '';
        this.attr_isRequired  = this.props.isRequired  ? `required`                                                         : '';
        this.attr_isReadonly  = this.props.isReadonly  ? `readonly`                                                         : '';
        this.attr_class_isReadonly  = this.props.isReadonly  ? `cursor_readonly`                                                   : '';

        this.universal_textBox = `
        <div class="universal-textbox ${this.attr_class_isReadonly}">
          ${this.attr_icon}
          <input ${this.attr_regex} ${this.attr_placeholder} ${this.attr_value} ${this.attr_type} ${this.attr_label} ${this.attr_name} ${this.attr_id} ${this.attr_isRequired} ${this.attr_isReadonly}/>
          ${this.attr_tooltip}
        </div>
        `;
    }
};

export interface ITextBox {
    regex?: string,
    placeholder?: string,
    value?: string,
    type?: string,
    label?: string,
    icon?: string,
    tooltip?: string,
    name?: string,
    id?: string,
    isRequired?: boolean,
    isReadonly?: boolean
}