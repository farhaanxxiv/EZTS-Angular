
export interface Student {
    studentId?: number;
    name?: string;
    collegeId?: number;
    year: number;
    examResults?: ExamResults[];
}

interface ExamResults {
    examId: number;
    score: number;
}