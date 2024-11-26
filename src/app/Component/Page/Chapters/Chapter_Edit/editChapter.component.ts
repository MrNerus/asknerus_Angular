import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent, IDropDown_Option } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToggleComponent } from '../../../../Element/Toggle/toggle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import Swal from 'sweetalert2';
import { ISubject } from '../../../../Interfaces/ISubject';
import { SubjectService } from '../../../../Services/subject.service';
import { IKeyValue } from '../../../../Interfaces/IKeyValue';
import { CommonModule } from '@angular/common';
import { ChapterService } from '../../../../Services/chapter.service';
import { IChapter, IChapter_Detail, IChapterDetails } from '../../../../Interfaces/IChapter';

@Component({
    selector: 'app-editChapter',
    styleUrl: 'editChapter.component.css',
    templateUrl: 'editChapter.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class EditChapterComponent {
    @ViewChild('form_EditChapter') form_EditChapter!: NgForm;
    @ViewChild('c_ParentClass') c_ParentClass!: DropdownComponent;
    @ViewChild('c_ParentSubject') c_ParentSubject!: DropdownComponent;
    @ViewChild('c_code') c_code!: TextBoxComponent;
    @ViewChild('c_name') c_name!: TextBoxComponent;
    @ViewChild('c_isActive') c_isActive!: ToggleComponent;

    fromRoute_code: string = '';
    classCode: string = '';
    subjectCode: string = '';
    subjectName: string = '';
    Code: string = '';
    Name: string = '';
    isActive: boolean = false;
    loading: boolean = true; // Track loading state
    dropDownOption_Class: IDropDown_Option[] = [];
    dropDownOption_Subject: IDropDown_Option[] = [];
    loadingClassrooms: boolean = true;
    loadingSubjects: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private subjectService: SubjectService,
        private chapterService: ChapterService
    ) { }


    ngOnInit(): void {
        this.loading = true; // Track loading state
        this.fromRoute_code = this.route.snapshot.paramMap.get('code') || '';
        this.chapterService.getChapter(this.fromRoute_code).subscribe({
            next: (response: IChapter_Detail) => {
                this.dropDownOption_Class.push({ text: response.class_Name, value: response.class_Code });
                this.dropDownOption_Subject.push({ text: response.subject_Name, value: response.subject_Code });
                this.Code = response.code;
                this.Name = response.name;
                this.isActive = response.isActive;
                this.loading = false;
            },
            error: (error) => {
                this.loadingClassrooms = false;
                this.dropDownOption_Class = [{ text: "~ No Code Found", value: "~ No Name Found" }];

                Swal.fire({
                    title: 'Error!',
                    text: error.error.content,
                    icon: 'error',
                })
            },
            complete: () => {
                this.loading = false; // Set loading to false when done
                this.loadingClassrooms = false;
                this.loadingSubjects = false

            }
        });
    }

    navigateTo(action: string, code: string): void {
        const route = `/chapters/${action}/${code}`;
        this.router.navigateByUrl(route);
    }

    submit(): void {
        if (this.form_EditChapter.valid) {

            const chapterData: IChapter = {
                sn: -1,
                subject_Code: this.c_ParentSubject.value,
                code: this.c_code.value,
                name: this.c_name.value,
                isActive: this.c_isActive.value,
            };

            console.log(chapterData)

            this.chapterService.updateChapter(chapterData).subscribe({
                next: (response) => {
                    Swal.fire({
                        title: 'Saved',
                        text: `${chapterData.code} was saved successfully.`,
                        icon: 'success',
                    });
                    this.navigateTo('', '')
                },
                error: (error) => {
                    Swal.fire({
                        title: 'Failed',
                        text: error.error.content,
                        icon: 'error',
                    })
                },
            });
        } else {
            Swal.fire({
                title: 'Nope!',
                text: 'Please enter valid data.',
                icon: 'error',
                // confirmButtonText: 'Cool'
            })
        }
    }
};
