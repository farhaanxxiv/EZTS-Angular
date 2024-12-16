import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/DataService';
import { Student } from '../../../models/Student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

export interface Exams {
    examId: number;
    examName: string;
    cutoff: number;
    totalScore: number;
    participants: Participants[];
}

export interface Participants {
    studentId: number;
    score: number;
    student: Student;
}

@Component({
    selector: 'app-exam-info',
    templateUrl: 'examInfo.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class ExamInfoComponent implements OnInit {

    private routeSubscription: Subscription | null = null;

    examId: number | null = null;
    examInfo: Exams | null = null;
    filteredParticipants: Participants[] = [];
    qualifiedOnly = false;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.routeSubscription = this.route.paramMap.subscribe(params => {
            const examIdParam = params.get('examId');

            if (examIdParam) {
                this.examId = Number(examIdParam);
                this.loadExamInfo();
            }
        });
    }

    private loadExamInfo(): void {
        if (this.examId === null) return;

        this.examInfo = this.dataService.getExamById(this.examId);

        if (this.examInfo) {

            this.examInfo.participants.sort((a, b) => a.studentId - b.studentId);

            this.examInfo.participants.forEach(participant => {
                participant.student = this.dataService.getStudentById(participant.studentId);
            });

            this.filteredParticipants = this.examInfo.participants;
        }
    }

    filterQualified(): void {
        if (!this.examInfo) return;

        this.filteredParticipants = this.qualifiedOnly
            ? this.examInfo.participants.filter(participant =>
                participant.score >= this.examInfo!.cutoff
            )
            : this.examInfo.participants;
    }

    calculateQualifiedCount(): number {
        return this.examInfo
            ? this.examInfo.participants.filter(participant =>
                participant.score >= this.examInfo!.cutoff
            ).length
            : 0;
    }
}