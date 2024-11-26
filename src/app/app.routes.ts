import { Routes } from '@angular/router';
import { AddClassroomComponent } from './Component/Page/classroom/addClassroom/addClassroom.component';
import { editClassroomComponent } from './Component/Page/classroom/editClassroom/editClassroom.component';
import { ViewClassroomComponent } from './Component/Page/classroom/viewClassroom/viewClassroom.component';
import { addSubjectComponent } from './Component/Page/Subjects/Subject_Add/addSubject.component';
import { EditSubjectComponent } from './Component/Page/Subjects/Subject_Edit/editSubject.component';
import { ViewSubjectComponent } from './Component/Page/Subjects/Subject_View/viewSubject.component';
import { AddChapterComponent } from './Component/Page/Chapters/Chapter_Add/addChapter.component';
import { ViewChapterComponent } from './Component/Page/Chapters/Chapter_View/viewChapter.component';
import { EditChapterComponent } from './Component/Page/Chapters/Chapter_Edit/editChapter.component';
import { listClassroomComponent } from './Component/Page/classroom/listClassroom/listClassroom.component';
import { ListChapterComponent } from './Component/Page/Chapters/Chapter_List/listChapter.component';
import { ListSubjectComponent } from './Component/Page/Subjects/Subject_List/listSubject.component';
import { AddQuestionComponent } from './Component/Page/Questions/Question_Add/addQuestion.component';
import { EditQuestionComponent } from './Component/Page/Questions/Question_Edit/editQuestion.component';
import { ViewQuestionComponent } from './Component/Page/Questions/Question_View/viewQuestion.component';
import { ListQuestionomponent } from './Component/Page/Questions/Querstion_List/listQuestion.component';

export const routes: Routes = [
    { path: 'classroom/add', component: AddClassroomComponent },
    { path: 'classroom/add/', component: AddClassroomComponent },
    { path: 'classroom/edit/:code', component: editClassroomComponent },
    { path: 'classroom/view/:code', component: ViewClassroomComponent },
    { path: 'classroom', component: listClassroomComponent },
    
    { path: 'subjects/add', component: addSubjectComponent },
    { path: 'subjects/add/', component: addSubjectComponent },
    { path: 'subjects/edit/:code', component: EditSubjectComponent },
    { path: 'subjects/view/:code', component: ViewSubjectComponent },
    { path: 'subjects', component: ListSubjectComponent },

    { path: 'chapters/add', component: AddChapterComponent },
    { path: 'chapters/add/', component: AddChapterComponent },
    { path: 'chapters/edit/:code', component: EditChapterComponent },
    { path: 'chapters/view/:code', component: ViewChapterComponent },
    { path: 'chapters', component: ListChapterComponent },

    { path: 'questions/add', component: AddQuestionComponent },
    { path: 'questions/edit', component: EditQuestionComponent },
    { path: 'questions/view', component: ViewQuestionComponent },
    { path: 'questions', component: ListQuestionomponent },
];
