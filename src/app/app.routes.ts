import { Routes } from '@angular/router';
import { addClassroomComponent } from './Component/Page/classroom/addClassroom/addClassroom.component';
import { editClassroomComponent } from './Component/Page/classroom/editClassroom/editClassroom.component';
import { viewClassroomComponent } from './Component/Page/classroom/viewClassroom/viewClassroom.component';

export const routes: Routes = [
    { path: 'classroom/add', component: addClassroomComponent },
    { path: 'classroom/edit', component: editClassroomComponent },
    { path: 'classroom/view', component: viewClassroomComponent },
];
