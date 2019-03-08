import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'offtrail-dialog',
  templateUrl: './offtrail-dialog.component.html',
  styleUrls: ['./offtrail-dialog.component.sass']
})
export class OfftrailDialogComponent implements OnInit {

  @ViewChild('simulate') simulateInput;

  public simulatedMile: number;
  public trailLength: number;

  constructor(
    private _dialogRef: MatDialogRef<OfftrailDialogComponent>,
    private _localStorage: LocalStorageService,
    @Inject(MAT_DIALOG_DATA)
    public data: object
  ) {}

  ngOnInit(): void {
    this.simulatedMile = Math.floor(Number(this.data['anchorPointDistance']));
    this.trailLength = this.data['trailLength'] - 1;
  }

  public onOk(): void {
    // const _value: number = (Math.floor(Number(this.simulateInput.nativeElement.value)) > this.trailLength) ? this.trailLength : Math.floor(Number(this.simulateInput.nativeElement.value));
    const _value: number = (Number(this.simulateInput.nativeElement.value) <= this.trailLength) ? Number(this.simulateInput.nativeElement.value) : this.trailLength;
    this.simulateInput.nativeElement.value = _value;
    const _self = this;
    setTimeout(function() {
      _self._dialogRef.close({simulatedMile: _self.simulateInput.nativeElement.value});
    }, 200);
  }

  public onCancel(): void {
    this._dialogRef.close();
  }
}
