import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanitizeHtmlPipe } from "../../../../Pipe/sanitizer";
import { TextBoxComponent } from '../../../../Element/TextBox/textBox.component';
import { IconButtonComponent } from "../../../../Element/iconButton/iconButton.component";
import { DropdownComponent } from "../../../../Element/DropDown/dropDown.component";
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from "../../../../Element/Toggle/toggle.component";
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../../../../Services/classroom.service';
import { IClassroom } from '../../../../Interfaces/IClassRoom';

@Component({
    selector: 'app-viewClassrooom',
    styleUrl: './viewClassroom.component.css',
    templateUrl: './viewClassroom.component.html',
    standalone: true,
    // inputs: ['props'],
    imports: [SanitizeHtmlPipe, TextBoxComponent, IconButtonComponent, DropdownComponent, FormsModule, ToggleComponent],
    // encapsulation: ViewEncapsulation.None
})

export class viewClassroomComponent {
    @Input({ required: true }) props: Partial<IViewClassroom> = {};
    fromRoute_code: string = '';

    constructor(
        private route: ActivatedRoute,
        private classroomService: ClassroomService
      ) {}
    
    classCode: string = '';
    className: string = '';
    isActive: boolean = false;

    ngOnInit(): void {
        this.fromRoute_code = this.route.snapshot.paramMap.get('code');
        // make a server response, get the response, display
        this.classCode = this.props.classCode ?? "No Code Provided";
        this.className = this.props.className ?? "No Name Provided";
        this.isActive = this.props.isActive ?? false;


        // Fetch the ID from the route
        this.fromRoute_code = this.route.snapshot.paramMap.get('id');
    
        if (this.fromRoute_code) {
            this.classroomService.getClassroom(this.fromRoute_code).subscribe({
                next: (response: IClassroom) => {
                  this.classCode = response.Code ?? "No Code Provided";
                  this.className = response.Name ?? "No Name Provided";
                  this.isActive = response.IsActive ?? false;
                },
                error: (error) => {
                  console.error("Error fetching classroom data:", error);
                  this.classCode = "Error";
                  this.className = "Error";
                  this.isActive = false;
                },
                complete: () => {
                  console.log("Classroom data fetching complete.");
                }
              });
        }
    }


};

export interface IViewClassroom {
    classCode?: string;
    className?: string;
    isActive?: boolean;
}