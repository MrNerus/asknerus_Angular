// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../Pipe/sanitizer";
import { IPagination } from '../../Interfaces/IPagination';
import { IconButtonComponent } from "../iconButton/iconButton.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  inputs: ['props'],
  imports: [SanitizeHtmlPipe, IconButtonComponent, CommonModule],
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent {
    page_Number?: number = 1;
    max_Page?: number = 1;
    rows_Count?: number = 0;
    rows_Per_Page?: number = 20;
    total_Rows?: number = 0;

    pages: number[] = [null,null,-5,-4,-3,-2,-1,0,1,2,3,4,5,null,null]

    @Input({ required: true }) props: Partial<IPagination> = {}
        
    ngOnInit(): void {
        this.page_Number = this.props.page_Number ?? 1;
        this.max_Page = this.props.max_Page ?? 1;
        this.rows_Count = this.props.rows_Count ?? 0;
        this.rows_Per_Page = this.rows_Per_Page ?? 20;
        this.total_Rows = this.total_Rows ?? 0;

        this.pages = this.paginate(this.page_Number, this.max_Page);
    }


    paginate(currentPage: number, totalPages: number): number[] {
        if (totalPages <= 0) totalPages = 1;
        currentPage = Math.max(1, Math.min(currentPage, totalPages));
    
        const paginationRange = 11; 
        const sidePages = Math.floor(paginationRange / 2);

        let startPage = Math.max(1, currentPage - sidePages);
        let endPage = Math.min(totalPages, currentPage + sidePages);
    
        if (endPage - startPage + 1 < paginationRange) {
            if (startPage === 1) { endPage = Math.min(totalPages, startPage + paginationRange - 1); } 
            else if (endPage === totalPages) { startPage = Math.max(1, endPage - paginationRange + 1); }
        }
    
        const pages: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
        }
    
        return pages;
    }

    get value(): number {
        return this.page_Number;
    }
}



