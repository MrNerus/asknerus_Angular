import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToggleComponent } from '../../../../Element/Toggle/toggle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-addClassrooom',
    styleUrl: 'addClassroom.component.css',
    templateUrl: 'addClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule],
    // encapsulation: ViewEncapsulation.None
})

export class AddClassroomComponent {
  @ViewChild('form_AddClassroom') form_AddClassroom!: NgForm;
  @ViewChild('c_code') c_code!: TextBoxComponent;
  @ViewChild('c_name') c_name!: TextBoxComponent;
  @ViewChild('c_isActive') c_isActive!: ToggleComponent;

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


  ngOnInit(): void { }

  navigateTo(action: string, code: string): void {
    const route = `/classroom/${action}/${code}`;
    this.router.navigateByUrl(route);
  }

  submit(): void {
    if (this.form_AddClassroom.valid) {
    
      const classroomData: IClassroom = {
        sn: -1,
        code: this.c_code.value,
        name: this.c_name.value,
        isActive: this.c_isActive.value,
      };

      console.log(classroomData)

      this.classroomService.addClassroom(classroomData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Saved',
            text: `${this.classCode} was added successfully.`,
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


export interface IAddClassroom {

}