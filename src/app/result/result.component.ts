import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  isFinished = true;
  textToAnalyze: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;
    this.analyzeFile(fileToAnalyze);
  }

  analyzeFile(fileToAnalyze: File) {



    // throw new Error('Method not implemented.');
  }


  mark(event: Event) {
    const markValue = (event.target as HTMLInputElement).value;
    this.clearIt()
    if (markValue.length > 2) {
      let c = new RegExp(markValue, "ig")
      const main = document.getElementById('text-block');
      main.innerHTML = main.innerHTML.replace(c, "<mark>" + markValue + "</mark>");
    }
  }

  clearIt() {
    let b = new RegExp("mark>", "ig");
    const main = document.getElementById('text-block');
    main.innerHTML = main.innerHTML.replace(b, "wbr>");
  }





}
