export interface Exams {
    examId: number;
    examName: String;
    cutoff: number;
    totalScore: number;
    participants: Participants[];
}


export interface Participants {
    studentId: number;
    score: number;
}