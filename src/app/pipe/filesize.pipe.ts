import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(bytes: number, decimalPoint?: number): string {

    if (bytes === 0) {
      return '0 Bytes';
    }

    const _k = 1000;
    const _dm = decimalPoint || 2;
    const _sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const _i = Math.floor(Math.log(bytes) / Math.log(_k));

    return parseFloat((bytes / Math.pow(_k, _i)).toFixed(_dm)) + ' ' + _sizes[_i];
  }
}
