import {FileItem } from 'ng2-file-upload';

export class FileModel {
    public id: number;
    public fileItem: FileItem;

    constructor(id: number, fileItem: FileItem) {
        this.id = id;
        this.fileItem = fileItem;
    }
}