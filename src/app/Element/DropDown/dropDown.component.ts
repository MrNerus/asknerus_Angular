import { Component, OnInit } from '@angular/core';
import { NgComponentOutlet, NgFor } from '@angular/common';
import { ClassList } from '../../APIHandeler/Class.api';
import { SubjectList } from '../../APIHandeler/Subject.api';
import { ChapterList } from '../../APIHandeler/Chapter.api';

// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropDown.component.html',
  styleUrls: ['./dropDown.component.css'],
  standalone: true,
  imports: [NgComponentOutlet, NgFor]
})

export class DropdownComponent implements OnInit {
  classes: any[] = []
  subjects: any[] = []
  chapters: any[] = []

  constructor() { }

  ngOnInit(): void { 
    // this.classes = ClassList.getClassList() 
  }

  onClassSelect(classes){
    console.log(classes.target.value)
    this.subjects = SubjectList.getSubjectList(classes.target.value);
    this.chapters = [];
  }

  onSubjectSelect(subjects){
    this.chapters = ChapterList.getChapterList(subjects.target.value);
  }
}
