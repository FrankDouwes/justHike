import { saveAs } from 'file-saver';

export function saveFileAs(data:any, filename:string, ): void {

  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }

  const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, filename);
}
