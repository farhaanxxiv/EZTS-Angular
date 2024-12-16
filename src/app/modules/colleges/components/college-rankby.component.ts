import { Component, Input, OnInit } from '@angular/core';
import { RankByCollegePipe } from '../pipes/RankByCollege';
import { FormsModule } from '@angular/forms';
import { College, CollegeScores } from '../../../models/Colleges';
import { ExamResults } from '../../../models/ExamResults';

@Component({
  selector: 'college-rankby',
  templateUrl: 'college-rankby.component.html',
  imports: [RankByCollegePipe, FormsModule],
  providers: [RankByCollegePipe],
  styleUrls: ['college-rankby.component.scss']
})

export class CollegeRankbyComponent implements OnInit {
  filterBy = 'count';
  collegesAndScores: CollegeScores[] = [];
  filteredData: any = [];

  @Input() allColleges: College[] = [];
  @Input() allExams: ExamResults[] = [];

  constructor(private rankByPipe: RankByCollegePipe) { }

  ngOnInit() {
    this.collegesAndScores = this.transformCollege(this.allColleges, this.allExams);
    console.log('collegesAndScores :', this.collegesAndScores);
    this.calculateCollegePerformance();
    this.collegesAndScores = this.sortByStudents(this.collegesAndScores);
    console.log(this.collegesAndScores[0])
  }


  sortByStudents(colleges: CollegeScores[]): CollegeScores[] {
    return colleges.sort((a, b) => {
      const aStudentCount = Array.isArray(a.students) ? a.students.length : 0;
      const bStudentCount = Array.isArray(b.students) ? b.students.length : 0;
      return bStudentCount - aStudentCount;
    });
  }


  onFilterByChange(value: any) {
    // if (value === 'count') {
    //   this.collegesAndScores = this.sortByStudents(this.collegesAndScores); 
    // } else if (value === 'performance') {
    //   this.calculateCollegePerformance();
    // }
  }

  transformCollege(colleges: College[], exams: ExamResults[]): any[] {
    // Create a map of student scores from the exams
    const studentScores = new Map();

    // Populate studentScores with data from all exams
    exams.forEach((exam) => {
      exam.results.forEach(({ studentId, score }: any) => {
        if (!studentScores.has(studentId)) {
          studentScores.set(studentId, []);
        }
        studentScores.get(studentId).push({ examId: exam.examId, score });
      });
    });

    // Transform each college's students list
    return colleges.map(college => ({
      ...college,
      students: college.students.map((studentId: number) => ({
        studentId,
        scores: studentScores.get(studentId) || []
      }))
    }));
  }

  calculateCollegePerformance(): void {
    // Calculate performance for each college based on collegesAndScores
    const collegePerformance: any[] = this.collegesAndScores.map((college: CollegeScores) => {
      // Calculate average score across all students in this college
      const studentScores = college.students.map(student => {
        // Calculate average score for this student across all exams
        const totalScore = student.scores.reduce((sum, examScore) => {
          const score = typeof examScore.score === 'number'
            ? examScore.score
            : Number(examScore.score);
          return sum + score;
        }, 0);

        const averageStudentScore = student.scores.length > 0
          ? Number((totalScore / student.scores.length).toFixed(2))
          : 0;
        return averageStudentScore;
      });

      // Calculate college's average score
      const collegeAverageScore = studentScores.length > 0
        ? Number((studentScores.reduce((sum, score) => sum + score, 0) / studentScores.length).toFixed(2))
        : 0;

      // Calculate participation rate for the college
      const studentsWithScores = college.students.filter(student => student.scores.length > 0).length;
      const participationRate = college.students.length > 0
        ? ((studentsWithScores / college.students.length) * 100).toFixed(2)
        : '0';

      return {
        collegeId: college.collegeId,
        collegeName: college.collegeName,
        location: college.location,
        students: college.students,
        averageScore: collegeAverageScore,
        participationRate: participationRate, // Add participation rate here
      };
    });

    // Sort colleges by average score in descending order (highest first)
    this.collegesAndScores = collegePerformance.sort((a, b) => b.averageScore - a.averageScore);
  }

}