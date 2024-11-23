import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { DropdownComponent, IDropDown_Option } from "../../../../Element/DropDown/dropDown.component";
import { Classes } from '../../../../APIHandeler/Class.api';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import { TextBoxComponent } from "../../../../Element/TextBox/textBox.component";
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { SubjectService } from '../../../../Services/subject.service';
import { ISubject, ISubject_Detail } from '../../../../Interfaces/ISubject';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-editSubject',
    styleUrl: 'editSubject.component.css',
    templateUrl: 'editSubject.component.html',
    standalone: true,
    inputs: ['props'],
    imports: [SanitizeHtmlPipe, DropdownComponent, TextBoxComponent, ToggleComponent, IconButtonComponent, FormsModule, CommonModule],
    encapsulation: ViewEncapsulation.None
})

export class EditSubjectComponent {
    @ViewChild('form_EditSubject') form_AddSubject!: NgForm;
    @ViewChild('c_ParentClass') c_ParentClass!: DropdownComponent;
    @ViewChild('c_code') c_code!: TextBoxComponent;
    @ViewChild('c_name') c_name!: TextBoxComponent;
    @ViewChild('c_isActive') c_isActive!: ToggleComponent;

    fromRoute_code: string = '';
    classCode: string = '';
    subjectCode: string = '';
    subjectName: string = '';
    isActive: boolean = false;
    loading: boolean = true; // Track loading state
    dropDownOption: IDropDown_Option[] = [];
    loadingSubject: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private subjectService: SubjectService,
        private router: Router
    ) {}
    
    
    ngOnInit(): void {
        this.fromRoute_code = this.route.snapshot.paramMap.get('code') || '';
        this.loadingSubject = true;
        this.subjectService.getSubject(this.fromRoute_code).subscribe({
            next: (response: ISubject_Detail) => {
                this.dropDownOption.push({ text: response.class_Name, value: response.class_Code });
                this.c_code.value = response.code;
                this.c_name.value = response.name;
                this.loadingSubject = false;
            },
            error: (error) => {
                this.dropDownOption = [{ text: "~ No Code Found", value: "~ No Name Found"}];
                this.c_code.value = "~ No Code Found";
                this.c_name.value = "~ No Name Found";
                Swal.fire({
                    title: 'Error!',
                    text: error.error.content,
                    icon: 'error',
                })
                this.loadingSubject = false;
            },
            complete: () => {
                this.loading = false; // Set loading to false when done
                this.loadingSubject = false;
            }
        });
    }

    navigateTo(action: string, code: string): void {
    const route = `/subjects/${action}/${code}`;
    this.router.navigateByUrl(route);
    }

    submit(): void {
        if (this.form_AddSubject.valid) {
        
            const subjectData: ISubject = {
            sn: -1,
            class_Code: this.c_ParentClass.value,
            code: this.c_code.value,
            name: this.c_name.value,
            isActive: this.c_isActive.value,
            };

            this.subjectService.updateSubject(subjectData).subscribe({
            next: (response) => {
                Swal.fire({
                title: 'Saved',
                text: `${this.subjectCode} was added successfully.`,
                icon: 'success',
                });
                this.navigateTo('','')
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
            });
        }
    }

    
};

export interface IEditSubject {

}