import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-editClassrooom',
    styleUrl: 'editClassroom.component.css',
    templateUrl: 'editClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, ToggleComponent, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class editClassroomComponent {
  @ViewChild('form_EditClassroom') form_EditClassroom!: NgForm;
  @ViewChild('classCodeTextBox') classCodeTextBox!: TextBoxComponent;
  @ViewChild('classNameTextBox') classNameTextBox!: TextBoxComponent;
  @ViewChild('classStatusToggle') classStatusToggle!: ToggleComponent;

  fromRoute_code: string = '';
  classCode: string = '';
  className: string = '';
  isActive: boolean = false;
  loading: boolean = true; // Track loading state

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.fromRoute_code = this.route.snapshot.paramMap.get('code') || '';

    if (this.fromRoute_code) {
      this.classroomService.getClassroom(this.fromRoute_code).subscribe({
        next: (response: IClassroom) => {
          this.classCode = response.code ?? "No Code Provided";
          this.className = response.name ?? "No Name Provided";
          this.isActive = response.isActive ?? false;
          this.loading = false;
        },
        error: (error) => {
          this.classCode = "Error";
          this.className = "Error";
          this.isActive = false;
          this.loading = false;

          Swal.fire({
            title: 'Error!',
            text: error.error.content,
            icon: 'error',
            // confirmButtonText: 'Cool'
          })
        },
        complete: () => {
          this.loading = false; // Set loading to false when done
          console.log("Classroom data fetching complete.");
        }
      });
    }
  }

  navigateTo(action: string, code: string): void {
    const route = `/classroom/${action}/${code}`;
    this.router.navigateByUrl(route);
  }

  submit(): void {
    if (this.form_EditClassroom.valid) {
    
      const classroomData: IClassroom = {
        sn: -1,
        code: this.classCodeTextBox.value,
        name: this.classNameTextBox.value,
        isActive: this.classStatusToggle.value,
      };

      console.log(classroomData)

      this.classroomService.updateClassroom(classroomData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Saved',
            text: `${this.classCode} was modified successfully.`,
            icon: 'success',
            // confirmButtonText: 'Cool'
          });
          this.navigateTo('','')
        },
        error: (error) => {
          Swal.fire({
            title: 'Failed',
            text: error.error.content,
            icon: 'error',
            // confirmButtonText: 'Cool'
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

export interface IEditClassroom {
    classCode?: string;
}