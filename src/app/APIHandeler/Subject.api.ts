export class SubjectList {
    static subjectList: any = [
        { id: 1, code: 'CACS101', class_id: 1, name: 'Computer Fundamentals & Applications' },
        { id: 2, code: 'CACO102', class_id: 1, name: 'Society and Technology' },
        { id: 3, code: 'CAEN103', class_id: 1, name: 'English I' },
        { id: 4, code: 'CAMT104', class_id: 1, name: 'Mathematics I' },
        { id: 5, code: 'CACS105', class_id: 1, name: 'Digital Logic' },
        { id: 6, code: 'CACS151', class_id: 2, name: 'C Programming' },
        { id: 7, code: 'CAAC152', class_id: 2, name: 'Financial Accounting' },
        { id: 8, code: 'CAEN153', class_id: 2, name: 'English II' },
        { id: 9, code: 'CAMT154', class_id: 2, name: 'Mathematics II' },
        { id: 10, code: 'CACS155', class_id: 2, name: 'Microprocessor and Computer Architecture' },
        { id: 11, code: 'CACS201', class_id: 3, name: 'Data Structures and Algorithms' },
        { id: 12, code: 'CAST202', class_id: 3, name: 'Probability and Statistics' },
        { id: 13, code: 'CACS203', class_id: 3, name: 'System Analysis and Design' },
        { id: 14, code: 'CACS204', class_id: 3, name: 'OOP in Java' },
        { id: 15, code: 'CACS205', class_id: 3, name: 'Web Technology' },
        { id: 16, code: 'CACS251', class_id: 4, name: 'Operating System' },
        { id: 17, code: 'CACS252', class_id: 4, name: 'Numerical Methods' },
        { id: 18, code: 'CACS253', class_id: 4, name: 'Software Engineering' },
        { id: 19, code: 'CACS254', class_id: 4, name: 'Scripting Language' },
        { id: 20, code: 'CACS255', class_id: 4, name: 'Database Management System' },
        { id: 21, code: 'CAPJ256', class_id: 4, name: 'Project I' },
        { id: 22, code: 'CACS301', class_id: 5, name: 'MIS and E-Business' },
        { id: 23, code: 'CACS302', class_id: 5, name: 'DotNet Technology' },
        { id: 24, code: 'CACS303', class_id: 5, name: 'Computer Networking' },
        { id: 25, code: 'CAMG304', class_id: 5, name: 'Introduction to Management' },
        { id: 26, code: 'CACS305', class_id: 5, name: 'Computer Graphics and Animation' },
        { id: 27, code: 'CACS351', class_id: 6, name: 'Mobile Programming' },
        { id: 28, code: 'CACS352', class_id: 6, name: 'Distributed System' },
        { id: 29, code: 'CAEC353', class_id: 6, name: 'Applied Economics' },
        { id: 30, code: 'CACS354', class_id: 6, name: 'Advanced Java Programming' },
        { id: 31, code: 'CACS355', class_id: 6, name: 'Network Programming' },
        { id: 32, code: 'CAPJ356', class_id: 6, name: 'Project II' },
        { id: 33, code: 'CACS401', class_id: 7, name: 'Cyber Law and Professional Ethics' },
        { id: 34, code: 'CACS402', class_id: 7, name: 'Cloud Computing' },
        { id: 35, code: 'CAIN403', class_id: 7, name: 'Internship' },
        { id: 36, code: 'CACS404', class_id: 7, name: 'Image Processing' },
        { id: 37, code: 'CACS405', class_id: 7, name: 'Database Administration' },
        { id: 38, code: 'CACS406', class_id: 7, name: 'Network Administration' },
        { id: 39, code: 'CACS408', class_id: 7, name: 'Advanced Dot Net Technology' },
        { id: 40, code: 'CACS409', class_id: 7, name: 'E-Governance' },
        { id: 41, code: 'CACS410', class_id: 7, name: 'Artificial Intelligence' },
        { id: 42, code: 'CAOR451', class_id: 8, name: 'Operations Research' },
        { id: 43, code: 'CAPJ452', class_id: 8, name: 'Project III' },
        { id: 44, code: 'CACS453', class_id: 8, name: 'Database Programming' },
        { id: 45, code: 'CACS454', class_id: 8, name: 'Geographical Information System' },
        { id: 46, code: 'CACS455', class_id: 8, name: 'Data Analysis and Visualization' },
        { id: 47, code: 'CACS456', class_id: 8, name: 'Machine Learning' },
        { id: 48, code: 'CACS457', class_id: 8, name: 'Multimedia System' },
        { id: 49, code: 'CACS458', class_id: 8, name: 'Knowledge Engineering' },
        { id: 50, code: 'CACS459', class_id: 8, name: 'Information Security' },
        { id: 51, code: 'CACS460', class_id: 8, name: 'Internet of Things' }
    ]

    static getSubjectList(classId: string): any[] {
        console.log(classId);
        let r: any = this.subjectList.filter(x => x.class_id.toString() == classId)
        return r

    }
}