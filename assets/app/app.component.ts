import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective} from 'ng2-file-upload/ng2-file-upload';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/Rx';

const URL = 'http://localhost:3000/upload';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [FileSelectDirective, FileDropDirective],
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

    public uploader:FileUploader = new FileUploader({url: URL});

    fileList = [];
    todoList = [];
    fileListChanged = new Subject<FileItem>();

    constructor(private http: Http) {
    }

    ngOnInit() {

    }

    uploadFile() {
        for(let item of this.uploader.queue) {
            this.todoList.push(item.file.name);
            this.fileListChanged.next(<any>(this.fileList.slice()));
        }
        this.uploader.uploadAll();
    }

    downloadFile() {
        this.http.get('http://localhost:3000/upload')
            .subscribe(
                (response) => {
                    console.log(response);
                    var tmp = this.todoList.pop();
                    this.fileList.push(tmp);
                    this.fileListChanged.next(<any>(this.fileList.slice()));
                    window.open('./upload');


                },
                (err) => {
                    console.log(err);

                }
            );
    }

    clear() {
        this.fileList = [];
        this.fileListChanged.next(<any>(this.fileList.slice()));
    }

}