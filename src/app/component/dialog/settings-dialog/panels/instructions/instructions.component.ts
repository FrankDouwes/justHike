import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.sass']
})
export class InstructionsComponent implements OnInit {

  public slides = [
    {image: 'assets/images/slides/instructions-1.jpg'},
    {image: 'assets/images/slides/instructions-2.jpg'},
    {image: 'assets/images/slides/instructions-3.jpg'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
