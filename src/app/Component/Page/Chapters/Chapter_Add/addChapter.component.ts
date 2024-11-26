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
import { IChapter } from '../../../../Interfaces/IChapter';

@Component({
    selector: 'app-addChapter',
    styleUrl: 'addChapter.component.css',
    templateUrl: 'addChapter.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class AddChapterComponent {
    @ViewChild('form_AddChapter') form_AddChapter!: NgForm;
    @ViewChild('c_ParentClass') c_ParentClass!: DropdownComponent;
    @ViewChild('c_ParentSubject') c_ParentSubject!: DropdownComponent;
    @ViewChild('c_code') c_code!: TextBoxComponent;
    @ViewChild('c_name') c_name!: TextBoxComponent;
    @ViewChild('c_isActive') c_isActive!: ToggleComponent;

    fromRoute_code: string = '';
    classCode: string = '';
    subjectCode: string = '';
    subjectName: string = '';
    isActive: boolean = false;
    loading: boolean = true; // Track loading state
    dropDownOption_Class: IDropDown_Option[] = [];
    dropDownOption_Subject: IDropDown_Option[] = [];
    loadingClassrooms: boolean = true;
    loadingSubjects: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private subjectService: SubjectService,
        private chapterService: ChapterService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.loadingClassrooms = true;
        this.loadingSubjects = true;
        this.classroomService.requestKeyValue().subscribe({
            next: (response: IKeyValue[]) => {
                for (let i = 0; i < response.length; i++) {
                    this.dropDownOption_Class.push({ text: response[i].value, value: response[i].key });
                }

                this.loadingClassrooms = false;
                this.subjectService.requestKeyValue(this.dropDownOption_Class[0].value).subscribe({
                    next: (response: IKeyValue[]) => {
                        for (let i = 0; i < response.length; i++) {
                            this.dropDownOption_Subject.push({ text: response[i].value, value: response[i].key });
                        }
        
                        this.loadingSubjects = false;
                        
                    },
                    error: (error) => {
                        this.loadingSubjects = false;
                        this.dropDownOption_Subject = [{ text: "~ No Code Found", value: "~ No Name Found" }];
        
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

    onClassChange(): void {
        this.loadingSubjects = true;
        this.subjectService.requestKeyValue(this.c_ParentClass.value).subscribe({
            next: (response: IKeyValue[]) => {
                for (let i = 0; i < response.length; i++) {
                    this.dropDownOption_Subject.push({ text: response[i].value, value: response[i].key });
                }

                this.loadingSubjects = false;
                
            },
            error: (error) => {
                this.loadingSubjects = false;
                this.dropDownOption_Subject = [{ text: "~ No Code Found", value: "~ No Name Found" }];

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
        if (this.form_AddChapter.valid) {

            const chapterData: IChapter = {
                sn: -1,
                subject_Code: this.c_ParentSubject.value,
                code: this.c_code.value,
                name: this.c_name.value,
                isActive: this.c_isActive.value,
            };

            console.log(chapterData)

            this.chapterService.addChapter(chapterData).subscribe({
                next: (response) => {
                    Swal.fire({
                        title: 'Saved',
                        text: `${chapterData.code} was added successfully.`,
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

    onSelectChange(value: string) {
        this.loadingClassrooms = false;
        this.loadingSubjects = true;
        this.dropDownOption_Subject = [];
        this.subjectService.requestKeyValue(value).subscribe({
            next: (response: IKeyValue[]) => {
                for (let i = 0; i < response.length; i++) {
                    this.dropDownOption_Subject.push({ text: response[i].value, value: response[i].key });
                }

                this.loadingSubjects = false;
                
            },
            error: (error) => {
                this.loadingSubjects = false;
                this.dropDownOption_Subject = [{ text: "~ No Code Found", value: "~ No Name Found" }];

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
};
