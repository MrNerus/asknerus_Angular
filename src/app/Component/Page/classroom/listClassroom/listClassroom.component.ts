import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
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
    @ViewChild('c_SearchKeyword') c_SearchKeyword!: TextBoxComponent;
    @ViewChild('c_SearchColumn') c_SearchColumn!: DropdownComponent;
    @ViewChild('c_filterOut') c_filterOut!: ToggleComponent;
    @ViewChild('c_SortColumn') c_SortColumn!: DropdownComponent;
    @ViewChild('c_SortMode') c_SortMode!: DropdownComponent;
    @ViewChild('c_RowsPerPage') c_RowsPerPage!: TextBoxComponent;
    @ViewChild('c_Page') c_Page!: PaginatorComponent;
  

    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private router: Router
      ) {}

      classList: IClassroom[] = [];
      pages: IPagination = {};
      loading: boolean = true
      loading_list: boolean = true

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
                this.loading_list = false;
            },
            complete: () => {
                this.loading = false; 
                this.loading_list = false;
              console.log("Classroom data fetching complete.");
            }
          });
    }

    navigateTo(action: string, code: string): void {
        const route = `/classroom/${action}/${code}`;
        this.router.navigateByUrl(route);
    }

    filter(): void {
        this.loading_list = true;
        this.classroomService.getClassrooms(
            /*searchKeyword :*/ this.c_SearchKeyword.value && this.c_SearchKeyword.value.trim() !== '' ? this.c_SearchKeyword.value : "%",
            /*searchColumn =*/ this.c_SearchColumn.value && this.c_SearchColumn.value.trim() !== '' && this.c_SearchColumn.value.trim() !== '_' ? Number.parseInt(this.c_SearchColumn.value) : null,
            /*filterKeyword =*/ this.c_filterOut.value && this.c_filterOut.value !== null ? '1' : null,
            /*filterColumn =*/ this.c_filterOut.value && this.c_filterOut.value !== null ? 'IsActive' : null,
            /*where_Clause =*/ null,
            /*orderBy =*/ this.c_SearchColumn.value && this.c_SortColumn.value.trim() !== '' && this.c_SortColumn.value.trim() !== '_' ? Number.parseInt(this.c_SortColumn.value) : null, 
            /*orderMode =*/ this.c_SortMode.value && this.c_SortMode.value.trim() !== '' && this.c_SortMode.value.trim() !== '_' ? Number.parseInt(this.c_SortMode.value) : 1,
            /*orderBy_Clause =*/ null,
        
            /*pageNo =*/ this.c_Page.value,
            /*rowsPerPage =*/ this.c_RowsPerPage.value && this.c_RowsPerPage.value.trim() !== '' ? Number.parseInt(this.c_RowsPerPage.value) : 20
        ).subscribe({
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

                this.loading_list = false;
            },
            complete: () => {
              this.loading_list = false; 
              console.log("Classroom data fetching complete.");
            }
          });
    }

    onPageChange(newPage: number) {
        this.filter();
    }

};

