import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'cl-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit, AfterViewInit {

  calcDisplay: string = '';
  expresion: string = '';
  isDecimal: boolean = false;
  history: string = '';

  constructor(
    private renderer: Renderer2
  ) { }

  @ViewChildren('num') nums: QueryList<ElementRef>;
  @ViewChildren('operation') operations: QueryList<ElementRef>;
  @ViewChild('dot') dot: ElementRef;
  @ViewChild('negative') negative: ElementRef;
  @ViewChild('result') result: ElementRef;
  @ViewChild('reset') resetAC: ElementRef;

  ngOnInit() {
    console.log(`A little cheating with math.js lib :|`);
  }

  ngAfterViewInit(): void {
    this.nums.forEach((num) => {
      this.renderer.listen(num.nativeElement, 'click', (event) => {
        this.expresion += num.nativeElement.value;
        this.calcDisplay = this.expresion;
      })
    });

    this.renderer.listen(this.dot.nativeElement, 'click', (event) => {
      if (!this.isDecimal) {
        this.expresion += '.';
        this.isDecimal = true;
      }
    });

    this.renderer.listen(this.negative.nativeElement, 'click', (event) => {
      if (!(/^-/i.test(this.expresion))) {
        this.expresion = '-' + this.expresion;
        this.calcDisplay = this.expresion;
      }
    });

    this.operations.forEach((operation) => {
      this.renderer.listen(operation.nativeElement, 'click', (event) => {
        this.isDecimal = false;
        if (/\d$/i.test(this.expresion)) {
          this.expresion += operation.nativeElement.value;
        } else {
          this.expresion = this.expresion.replace(/.$/, operation.nativeElement.value);
        }
        this.calcDisplay = this.expresion;
      })
    })

    this.renderer.listen(this.result.nativeElement, 'click', (event) => {
      if (!(/\d$/i.test(this.expresion))) {
        this.expresion = this.expresion.replace(/.$/, '');
      }
      if (/(\*|\/|\-|\+)/ig.test(this.expresion)) {
        this.calcDisplay = math.eval(this.expresion);
        this.history += `${this.expresion} = ${this.calcDisplay}\n`;
        this.reset();
      }
    });

    this.renderer.listen(this.resetAC.nativeElement, 'click', (event) => {
      this.reset();
      this.history = '';
      this.calcDisplay = '';
    });
  }

  reset(): void {
    this.expresion = '';
    this.isDecimal = false;
  }

}
