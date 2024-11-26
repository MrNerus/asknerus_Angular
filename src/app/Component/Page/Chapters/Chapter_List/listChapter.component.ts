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
import { ISubject, ISubject_Detail, ISubjectDetails } from '../../../../Interfaces/ISubject';
import { SubjectService } from '../../../../Services/subject.service';
import { IPaginatedRequest } from '../../../../Interfaces/IPaginatedRequest';
import { Enum_OrderMode } from '../../../../Enum/Enum_OrderMode';
import { EnumMapper } from '../../../../Mapper/Enums';
import { IChapter_Detail, IChapterDetails } from '../../../../Interfaces/IChapter';
import { ChapterService } from '../../../../Services/chapter.service';

@Component({
    selector: 'app-listChapter',
    styleUrl: './listChapter.component.css',
    templateUrl: './listChapter.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [TextBoxComponent, IconButtonComponent, DropdownComponent, ToggleComponent, FormsModule, CommonModule, PaginatorComponent],
    // encapsulation: ViewEncapsulation.None
})

export class ListChapterComponent {
    @ViewChild('c_SearchKeyword') c_SearchKeyword!: TextBoxComponent;
    
    @ViewChild('c_SearchByCode') c_SearchByCode!: TextBoxComponent;
    @ViewChild('c_SearchByName') c_SearchByName!: TextBoxComponent;
    @ViewChild('c_SearchByCode_isFuzzy') c_SearchByCode_isFuzzy!: ToggleComponent;
    @ViewChild('c_SearchByName_isFuzzy') c_SearchByName_isFuzzy!: ToggleComponent;
    @ViewChild('c_OnlyActiveChapter') c_OnlyActiveChapter!: ToggleComponent;

    @ViewChild('c_SearchByClassCode') c_SearchByClassCode!: TextBoxComponent;
    @ViewChild('c_SearchByClassName') c_SearchByClassName!: TextBoxComponent;
    @ViewChild('c_SearchByClassCode_isFuzzy') c_SearchByClassCode_isFuzzy!: ToggleComponent;
    @ViewChild('c_SearchByClassName_isFuzzy') c_SearchByClassName_isFuzzy!: ToggleComponent;
    @ViewChild('c_OnlyActiveClass') c_OnlyActiveClass!: ToggleComponent;

    @ViewChild('c_SearchBySubjectCode') c_SearchBySubjectCode!: TextBoxComponent;
    @ViewChild('c_SearchBySubjectName') c_SearchBySubjectName!: TextBoxComponent;
    @ViewChild('c_SearchBySubjectCode_isFuzzy') c_SearchBySubjectCode_isFuzzy!: ToggleComponent;
    @ViewChild('c_SearchBySubjectName_isFuzzy') c_SearchBySubjectName_isFuzzy!: ToggleComponent;
    @ViewChild('c_OnlyActiveSubject') c_OnlyActiveSubject!: ToggleComponent;
    

    @ViewChild('c_SortByCode') c_SortByCode!: DropdownComponent;
    @ViewChild('c_SortByName') c_SortByName!: DropdownComponent;
    @ViewChild('c_SortByStatus') c_SortByStatus!: DropdownComponent;
    @ViewChild('c_SortByClassCode') c_SortByClassCode!: DropdownComponent;
    @ViewChild('c_SortByClassName') c_SortByClassName!: DropdownComponent;
    @ViewChild('c_SortByClassStatus') c_SortByClassStatus!: DropdownComponent;
    @ViewChild('c_SortBySubjectCode') c_SortBySubjectCode!: DropdownComponent;
    @ViewChild('c_SortBySubjectName') c_SortBySubjectName!: DropdownComponent;
    @ViewChild('c_SortBySubjectStatus') c_SortBySubjectStatus!: DropdownComponent;

    @ViewChild('c_RowsPerPage') c_RowsPerPage!: TextBoxComponent;
    @ViewChild('c_Page') c_Page!: PaginatorComponent;
  

    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService,
        private subjectService: SubjectService,
        private chapterService: ChapterService,
        private router: Router
      ) {}

      chapters: IChapter_Detail[] = [];
      pages: IPagination = {};
      loading: boolean = true
      loading_list: boolean = true
      paginatedReq: IPaginatedRequest = {}

    ngOnInit(): void {
        this.chapterService.getChapters().subscribe({
            next: (response: IChapterDetails) => {
              this.chapters = response.item1 ?? [];
              this.pages = response.item2 ?? {};
            },
            error: (error) => {
                this.chapters = [];
                this.pages = {};
                
                Swal.fire({
                    title: 'Error!',
                    text: error.error.content,
                    icon: 'error',
                });

                this.loading = false;
                this.loading_list = false;
            },
            complete: () => {
                this.loading = false; 
                this.loading_list = false;
            }
          });
    }

    navigateTo(action: string, code: string): void {
        const route = `/chapters/${action}/${code}`;
        this.router.navigateByUrl(route);
    }

    filter(): void {
            // console.log(`Can Read c_SearchKeyword: ${this.c_SearchKeyword.value}`);
            // console.log(`Can Read c_SearchByCode: ${this.c_SearchByCode.value}`);
            // console.log(`Can Read c_SearchByCode_isFuzzy: ${this.c_SearchByCode_isFuzzy.value}`);
            // console.log(`Can Read c_SearchByName: ${this.c_SearchByName.value}`);
            // console.log(`Can Read c_SearchByName_isFuzzy: ${this.c_SearchByName_isFuzzy.value}`);
            // console.log(`Can Read c_OnlyActiveSubject: ${this.c_OnlyActiveSubject.value}`);
            // console.log(`Can Read c_SearchByClassCode: ${this.c_SearchByClassCode.value}`);
            // console.log(`Can Read c_SearchByClassCode_isFuzzy: ${this.c_SearchByClassCode_isFuzzy.value}`);
            // console.log(`Can Read c_SearchByClassName: ${this.c_SearchByClassName.value}`);
            // console.log(`Can Read c_SearchByClassName_isFuzzy: ${this.c_SearchByClassName_isFuzzy.value}`);
            // console.log(`Can Read c_OnlyActiveClass: ${this.c_OnlyActiveClass.value}`);
            // console.log(`Can Read c_SortByClassCode: ${this.c_SortByClassCode.value}`);
            // console.log(`Can Read c_SortByCode: ${this.c_SortByCode.value}`);
            // console.log(`Can Read c_SortByClassName: ${this.c_SortByClassName.value}`);
            // console.log(`Can Read c_SortByName: ${this.c_SortByName.value}`);
            // console.log(`Can Read c_SortByClassStatus: ${this.c_SortByClassStatus.value}`);
            // console.log(`Can Read c_SortByStatus: ${this.c_SortByStatus.value}`);
            // console.log(`Can Read c_Page: ${this.c_Page.value}`);
            // console.log(`Can Read c_RowsPerPage: ${this.c_RowsPerPage.value}`);


        this.paginatedReq = {
            Search: this.c_SearchKeyword.value,
            SearchFilter: [
                {key: "Code", value: this.c_SearchByCode.value, isFuzzy: this.c_SearchByCode_isFuzzy.value}, 
                {key: "Name", value: this.c_SearchByName.value, isFuzzy: this.c_SearchByName_isFuzzy.value}, 
                {key: "Status", value: this.c_OnlyActiveChapter.value ? 'active' : '_', isFuzzy: !this.c_OnlyActiveChapter.value}, 
                {key: "ClassCode", value: this.c_SearchByClassCode.value, isFuzzy: this.c_SearchByClassCode_isFuzzy.value}, 
                {key: "ClassName", value: this.c_SearchByClassName.value, isFuzzy: this.c_SearchByClassName_isFuzzy.value}, 
                {key: "ClassStatus", value: this.c_OnlyActiveClass.value ? 'active' : '_', isFuzzy: !this.c_OnlyActiveClass.value}, 
                {key: "SubjectCode", value: this.c_SearchBySubjectCode.value, isFuzzy: this.c_SearchBySubjectCode_isFuzzy.value}, 
                {key: "SubjectName", value: this.c_SearchBySubjectName.value, isFuzzy: this.c_SearchBySubjectName_isFuzzy.value}, 
                {key: "SubjectStatus", value: this.c_OnlyActiveSubject.value ? 'active' : '_', isFuzzy: !this.c_OnlyActiveSubject.value}, 
            ],
            Order: [
                {Column_Name: "ClassCode", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByClassCode.value)},
                {Column_Name: "SubjectCode", Order_Mode: EnumMapper.ToOrderMode(this.c_SortBySubjectCode.value)},
                {Column_Name: "Code", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByCode.value)},
                {Column_Name: "ClassName", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByClassName.value)},
                {Column_Name: "SubjectName", Order_Mode: EnumMapper.ToOrderMode(this.c_SortBySubjectName.value)},
                {Column_Name: "Name", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByName.value)},
                {Column_Name: "ClassStatus", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByClassStatus.value)}, 
                {Column_Name: "SubjectStatus", Order_Mode: EnumMapper.ToOrderMode(this.c_SortBySubjectStatus.value)}, 
                {Column_Name: "Status", Order_Mode: EnumMapper.ToOrderMode(this.c_SortByStatus.value)}
            ],
            Pagination: {Page_Number: this.c_Page.value ?? 1, Rows_Per_Page: Number.parseInt(this.c_RowsPerPage.value)}
        }
        this.loading_list = true;

        this.chapterService.getFilteredChapters(this.paginatedReq).subscribe({
            next: (response: IChapterDetails) => {
              this.chapters = response.item1 ?? [];
              this.pages = response.item2 ?? {};
            },
            error: (error) => {
                this.chapters = [];
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

    onPageChange(newPage: number) {
        this.filter();
    }

};

