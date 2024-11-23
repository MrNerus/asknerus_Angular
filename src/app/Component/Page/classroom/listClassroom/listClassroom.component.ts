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
import { IPaginatedRequest } from '../../../../Interfaces/IPaginatedRequest';
import { EnumMapper } from '../../../../Mapper/Enums';

@Component({
    selector: 'app-listClassrooom',
    styleUrl: './listClassroom.component.css',
    templateUrl: './listClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule, PaginatorComponent],
    // encapsulation: ViewEncapsulation.None
})

export class listClassroomComponent {
    @ViewChild('c_SearchKeyword') c_SearchKeyword!: TextBoxComponent;

    @ViewChild('c_SearchByName') c_SearchByName!: TextBoxComponent;
    @ViewChild('c_SearchByCode') c_SearchByCode!: TextBoxComponent;

    @ViewChild('c_SearchByCode_isFuzzy') c_SearchByCode_isFuzzy!: ToggleComponent;
    @ViewChild('c_SearchByName_isFuzzy') c_SearchByName_isFuzzy!: ToggleComponent;
    @ViewChild('c_OnlyActiveClass') c_OnlyActive!: ToggleComponent;

    @ViewChild('c_SortByCode') c_SortByCode!: DropdownComponent;
    @ViewChild('c_SortByName') c_SortByName!: DropdownComponent;
    @ViewChild('c_SortByStatus') c_SortByStatus!: DropdownComponent;

    @ViewChild('c_RowsPerPage') c_RowsPerPage!: TextBoxComponent;
    @ViewChild('c_Page') c_Page!: PaginatorComponent;


    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private router: Router
    ) { }

    classList: IClassroom[] = [];
    pages: IPagination = {};
    loading: boolean = true
    loading_list: boolean = true
    paginatedReq: IPaginatedRequest = {}

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
        // console.log(`Can Read c_SearchKeyword: ${this.c_SearchKeyword.value}`);
        // console.log(`Can Read c_SearchByCode: ${this.c_SearchByCode.value}`);
        // console.log(`Can Read c_SearchByCode_isFuzzy: ${this.c_SearchByCode_isFuzzy.value}`);
        // console.log(`Can Read c_SearchByName: ${this.c_SearchByName.value}`);
        // console.log(`Can Read c_SearchByName_isFuzzy: ${this.c_SearchByName_isFuzzy.value}`);
        // console.log(`Can Read c_OnlyActive: ${this.c_OnlyActive.value}`);
        // console.log(`Can Read c_SortByCode: ${this.c_SortByCode.value}`);
        // console.log(`Can Read c_SortByName: ${this.c_SortByName.value}`);
        // console.log(`Can Read c_SortByStatus: ${this.c_SortByStatus.value}`);
        // console.log(`Can Read c_Page: ${this.c_Page.value}`);
        // console.log(`Can Read c_RowsPerPage: ${this.c_RowsPerPage.value}`);


        this.paginatedReq = {
            Search: this.c_SearchKeyword.value,
            SearchFilter: [
                { key: "Code", value: this.c_SearchByCode.value, isFuzzy: this.c_SearchByCode_isFuzzy.value },
                { key: "Name", value: this.c_SearchByName.value, isFuzzy: this.c_SearchByName_isFuzzy.value },
                { key: "Status", value: this.c_OnlyActive.value ? 'active' : '_', isFuzzy: !this.c_OnlyActive.value }
            ],
            Order: [
                { Column_Name: "Code", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByCode.value) },
                { Column_Name: "Name", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByName.value) },
                { Column_Name: "Status", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByStatus.value) }
            ],
            Pagination: { Page_Number: this.c_Page.value ?? 1, Rows_Per_Page: Number.parseInt(this.c_RowsPerPage.value) }
        }
        this.loading_list = true;

        this.classroomService.getFilteredSubjects(this.paginatedReq).subscribe({
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
            }
        });
    }



    // filter(): void {
    //     this.loading_list = true;
    //     this.classroomService.getClassrooms(
    //         /*searchKeyword :*/ this.c_SearchKeyword.value && this.c_SearchKeyword.value.trim() !== '' ? this.c_SearchKeyword.value : "%",
    //         /*searchColumn =*/ this.c_SearchColumn.value && this.c_SearchColumn.value.trim() !== '' && this.c_SearchColumn.value.trim() !== '_' ? Number.parseInt(this.c_SearchColumn.value) : null,
    //         /*filterKeyword =*/ this.c_filterOut.value && this.c_filterOut.value !== null ? '1' : null,
    //         /*filterColumn =*/ this.c_filterOut.value && this.c_filterOut.value !== null ? 'IsActive' : null,
    //         /*where_Clause =*/ null,
    //         /*orderBy =*/ this.c_SearchColumn.value && this.c_SortColumn.value.trim() !== '' && this.c_SortColumn.value.trim() !== '_' ? Number.parseInt(this.c_SortColumn.value) : null, 
    //         /*orderMode =*/ this.c_SortMode.value && this.c_SortMode.value.trim() !== '' && this.c_SortMode.value.trim() !== '_' ? Number.parseInt(this.c_SortMode.value) : 1,
    //         /*orderBy_Clause =*/ null,

    //         /*pageNo =*/ this.c_Page.value,
    //         /*rowsPerPage =*/ this.c_RowsPerPage.value && this.c_RowsPerPage.value.trim() !== '' ? Number.parseInt(this.c_RowsPerPage.value) : 20
    //     ).subscribe({
    //         next: (response: IClassrooms) => {
    //           this.classList = response.item1 ?? [];
    //           this.pages = response.item2 ?? {};
    //         },
    //         error: (error) => {
    //             this.classList = [];
    //             this.pages = {};

    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: error.error.content,
    //                 icon: 'error',
    //                 // confirmButtonText: 'Cool'
    //             });

    //             this.loading_list = false;
    //         },
    //         complete: () => {
    //           this.loading_list = false; 
    //           console.log("Classroom data fetching complete.");
    //         }
    //       });
    // }

    onPageChange(newPage: number) {
        this.filter();
    }

};

