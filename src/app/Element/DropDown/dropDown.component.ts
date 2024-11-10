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
  // classes: any[] = []
  // // subjects: any[] = []
  // // chapters: any[] = []

  // constructor() { }

  ngOnInit(): void { 
    this._props = this.props;
    // this.classes = ClassList.getClassList() 
  }

  // onClassSelect(classes){
  //   console.log(classes.target.value)
  //   // this.subjects = SubjectList.getSubjectList(classes.target.value);
  //   // this.chapters = [];
  // }

  // onSubjectSelect(subjects){
  //   // this.chapters = ChapterList.getChapterList(subjects.target.value);
  // }

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