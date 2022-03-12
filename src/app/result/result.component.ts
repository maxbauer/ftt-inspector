import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  isFinished = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;
    this.analyzeFile(fileToAnalyze);
  }

  analyzeFile(fileToAnalyze: File) {


    
    // throw new Error('Method not implemented.');
  }

}
