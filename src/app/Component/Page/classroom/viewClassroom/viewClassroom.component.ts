import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom } from '../../../../Interfaces/IClassRoom';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-viewClassrooom',
    styleUrl: './viewClassroom.component.css',
    templateUrl: './viewClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, ToggleComponent, CommonModule],
    // encapsulation: ViewEncapsulation.None
})

export class ViewClassroomComponent {
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
};

