export interface College {
    collegeId: number;
    collegeName: String;
    location: String;
    students: number[];
}

export interface CollegeScores {
    averageScore: number;
    collegeId: number;
    collegeName: String;
    location: String;
    students: StudentInfo[];
    participationRate: number;
}

interface StudentInfo {
    studentId: number,
    scores: Scores[]
}

interface Scores {
    examId: number,
    score: number
}