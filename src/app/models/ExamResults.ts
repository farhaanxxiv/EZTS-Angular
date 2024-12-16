export interface ExamResults {
    examId: number;
    results: Result[];
}

interface Result {
    studentId: number;
    scores: number;
}