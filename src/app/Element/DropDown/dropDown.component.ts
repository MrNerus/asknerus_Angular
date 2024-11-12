import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet, NgFor } from '@angular/common';
import { Classes } from '../../APIHandeler/Class.api';
import { SubjectList } from '../../APIHandeler/Subject.api';
import { ChapterList } from '../../APIHandeler/Chapter.api';

// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropDown.component.html',
  styleUrls: ['./dropDown.component.css'],
  standalone: true,
  imports: [NgComponentOutlet, NgFor, CommonModule]
})

export class DropdownComponent {
  @Input({ required: true }) props: Partial<IDropDown> = {}
  _props: IDropDown;

  ngOnInit(): void { 
    this._props = this.props;
  }

  get text(): string {
    var dropdown = document.getElementById(this.props.id) as HTMLSelectElement; 
    return dropdown.options[dropdown.selectedIndex].text; 
  }
  get value(): string {
    var dropdown = document.getElementById(this.props.id) as HTMLSelectElement; 
    return dropdown.value; 
  }

}


export interface IDropDown {
  id?: string,
  name?: string,
  options?: IDropDown_Option[],
  allowNone?: boolean
}

export interface IDropDown_Option {
  text?: string,
  value?: string,
  isDefault?: boolean
}