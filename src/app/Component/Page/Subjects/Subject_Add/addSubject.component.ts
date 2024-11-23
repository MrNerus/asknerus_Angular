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

@Component({
    selector: 'app-addClassrooom',
    styleUrl: 'addSubject.component.css',
    templateUrl: 'addSubject.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class addSubjectComponent {
  @ViewChild('form_AddSubject') form_AddSubject!: NgForm;
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
  loadingClassrooms: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadingClassrooms = true;
      this.classroomService.requestKeyValue().subscribe({
        next: (response: IKeyValue[]) => {
            for (let i = 0; i < response.length; i++) {
                this.dropDownOption.push({ text: response[i].value, value: response[i].key });
            }
        this.loadingClassrooms = false;
    },
    error: (error) => {
            this.loadingClassrooms = false;
          this.dropDownOption = [{ text: "~ No Code Found", value: "~ No Name Found"}];

          Swal.fire({
            title: 'Error!',
            text: error.error.content,
            icon: 'error',
          })
        },
        complete: () => {
          this.loading = false; // Set loading to false when done
          this.loadingClassrooms = false;

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

      console.log(subjectData)

      this.subjectService.addSubject(subjectData).subscribe({
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
      })
    }
  }
};
