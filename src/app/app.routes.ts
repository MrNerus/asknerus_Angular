import { Routes } from '@angular/router';
import { addClassroomComponent } from './Component/Page/addClassroom/addClassroom.component';
import { editClassroomComponent } from './Component/Page/editClassroom/editClassroom.component';

export const routes: Routes = [
    { path: 'classroom/add', component: addClassroomComponent },
    { path: 'classroom/edit', component: editClassroomComponent },
];
