import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import customConfig from '../../../../../customConfig.json';
import { ToggleComponent } from '../../../../Element/Toggle/toggle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom, IClassrooms } from '../../../../Interfaces/IClassRoom';
import { IPagination } from '../../../../Interfaces/IPagination';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { IconLinkComponent } from "../../../../Element/iconLink/iconLink.component";
import { PaginatorComponent } from "../../../../Element/Paginator/paginator.component";

@Component({
    selector: 'app-listClassrooom',
    styleUrl: './listClassroom.component.css',
    templateUrl: './listClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule, IconLinkComponent, PaginatorComponent],
    // encapsulation: ViewEncapsulation.None
})

export class listClassroomComponent {
    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private router: Router
      ) {}

      classList: IClassroom[] = [];
      pages: IPagination = {};
      loading: boolean = true

    ngOnInit(): void {
        this.classroomService.getClassrooms().subscribe({
            next: (response: IClassrooms) => {
              this.classList = response.item1 ?? [];
              this.pages = response.item2 ?? {};
            },
            error: (error) => {
                this.classList = [];
                this.pages = {};
                
                Swal.fire({
                    title: 'Error!',
                    text: error.error.content,
                    icon: 'error',
                    // confirmButtonText: 'Cool'
                });

                this.loading = false;
            },
            complete: () => {
              this.loading = false; // Set loading to false when done
              console.log("Classroom data fetching complete.");
            }
          });
    }

    navigateTo(action: string, code: string): void {
        const route = `/classroom/${action}/${code}`;
        this.router.navigateByUrl(route);
      }

};

