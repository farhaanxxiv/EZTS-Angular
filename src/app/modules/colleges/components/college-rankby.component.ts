import { Component, Input, OnInit } from '@angular/core';
import { RankByPipe } from '../pipes/RankByCollege';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'college-rankby',
  templateUrl: 'college-rankby.component.html',
  imports: [RankByPipe, FormsModule]
})

export class CollegeRankbyComponent implements OnInit {

  filterBy = 'count'

  filteredData = []


  constructor() { }

  ngOnInit() {
    this.filteredData = this.allColleges
  }

  onFilterByChange(event: any) {  
    console.log(event)
  }

  @Input() allColleges: any;

}