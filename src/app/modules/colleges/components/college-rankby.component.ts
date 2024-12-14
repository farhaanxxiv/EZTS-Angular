import { Component, Input, OnInit } from '@angular/core';
import { RankByCollegePipe } from '../pipes/RankByCollege';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'college-rankby',
  templateUrl: 'college-rankby.component.html',
  imports: [RankByCollegePipe, FormsModule],
  providers: [RankByCollegePipe]
})

export class CollegeRankbyComponent implements OnInit {

  filterBy = 'count'

  filteredData: any = []


  constructor(private rankByPipe: RankByCollegePipe) { }

  ngOnInit() {
    this.filteredData = this.rankByPipe.transform([...this.allColleges], this.filterBy);
  }

  onFilterByChange(value: any) {
    this.filteredData = this.rankByPipe.transform(this.filteredData, value);
  }

  @Input() allColleges: any;

}