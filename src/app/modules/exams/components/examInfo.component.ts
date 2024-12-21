import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/DataService';
import { Student } from '../../../models/Student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartEvent } from 'chart.js';

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
    imports: [FormsModule, CommonModule, BaseChartDirective]
})
export class ExamInfoComponent implements OnInit, OnDestroy {

    private routeSubscription: Subscription | null = null;

    examId: number | null = null;
    examInfo: Exams | null = null;
    filteredParticipants: Participants[] = [];
    qualifiedOnly = false;
    qualifiedCount: number = 0;
    scoreRanges = [
        { min: 0, max: 20, label: '0-20' },
        { min: 21, max: 40, label: '21-40' },
        { min: 41, max: 60, label: '41-60' },
        { min: 61, max: 80, label: '61-80' },
        { min: 81, max: 100, label: '81-100' }
    ];

    // Chart properties
    public barChartType: ChartType = 'bar';
    public barChartData: ChartConfiguration['data'] = {
        datasets: [{
            data: [],
            label: 'Score Distribution',
            backgroundColor: ["black"],
            hoverBackgroundColor: ["#505050"],
        }],
        labels: []
    };

    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Number of Students'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Scores Obtained'
                }
            }
        },
    };

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

    ngOnDestroy(): void {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
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
            this.qualifiedCount = this.calculateQualifiedCount();

            // Calculate score distribution
            this.calculateScoreDistribution();
        }
    }

    private calculateScoreDistribution(): void {
        if (!this.examInfo) return;

        const distribution = this.scoreRanges.map(range => {
            return this.examInfo!.participants.filter(p =>
                p.score >= range.min && p.score <= range.max
            ).length;
        });

        this.barChartData = {
            datasets: [{
                data: distribution,
                label: 'Number of Students',
                backgroundColor: ["white"],
                hoverBackgroundColor: ["#a0a0a0"],

            }],
            labels: this.scoreRanges.map(r => r.label)
        };
    }

    chartClicked(event: any): void {

        this.qualifiedOnly = false;

        const activeElements: any[] = event.active

        if (!activeElements || activeElements.length === 0) {
            this.filteredParticipants = this.examInfo?.participants || [];
            return;
        }

        const clickedIndex = activeElements[0].index;

        const selectedRange = this.scoreRanges[clickedIndex];

        this.filteredParticipants = this.examInfo?.participants.filter(participant =>
            participant.score >= selectedRange.min &&
            participant.score <= selectedRange.max
        ) || [];


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