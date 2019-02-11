import {isDevMode} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import { saveAs } from 'file-saver';

export function saveFileAs(data:any, filename:string, ): void {
  const blob = new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, filename);
}
