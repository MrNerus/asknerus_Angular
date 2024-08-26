export class ClassList {
    static classList: any = [
        {id: 1, name:"First Semester", classCode: "BCAS1"},
        {id: 2, name:"Second Semester", classCode: "BCAS2"},
        {id: 3, name:"Third Semester", classCode: "BCAS3"},
        {id: 4, name:"Fourth Semester", classCode: "BCAS4"},
        {id: 5, name:"Fifth Semester", classCode: "BCAS5"},
        {id: 6, name:"Sixth Semester", classCode: "BCAS6"},
        {id: 7, name:"Seventh Semester", classCode: "BCAS7"},
        {id: 8, name:"Eighth Semester", classCode: "BCAS8"}
    ];

    static getClassList(): any[] {
        return this.classList;
    }
}