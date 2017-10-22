import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective} from 'ng2-file-upload/ng2-file-upload';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/Rx';

const URL = 'https://blooming-ridge-67597.herokuapp.com/upload';
//const URL = 'http://localhost:3000/upload';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [FileSelectDirective, FileDropDirective],
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

    //public uploader:FileUploader = new FileUploader({url: URL});
    @ViewChild('myfile') files: ElementRef;

    fileList = [];
    fileListChanged = new Subject<File>();

    responseData: any;


    constructor(private http: Http) {
    }

    ngOnInit() {

    }

    // fileChange(event) {
    //     let fileList: FileList = event.target.files;
    //     if(fileList.length > 0) {
    //         let file: File = fileList[0];
    //         let formData:FormData = new FormData();
    //         formData.append('uploadFile', file, file.name);
    //         let headers = new Headers();
    //         headers.append('Accept', 'application/json');
    //         let options = new RequestOptions({ headers: headers });
    //         this.http.post(URL, formData, options)
    //             .map(res => res.json())
    //             .catch(error => Observable.throw(error))
    //             .subscribe(
    //                 data => console.log('success'),
    //                 error => console.log(error)
    //             )
    //     }
    // }

    addFile() {
        for(let item of this.files.nativeElement.files) {
            this.fileList.push(item.name);
            this.fileListChanged.next(<any>(this.fileList.slice()));
        }
    }

    uploadFile() {
        let headers = new Headers();
        let formData: FormData = new FormData();
        for(let item of this.files.nativeElement.files) {
            formData.append(`files`, item, item.name);
        }
        var returnReponse = new Promise((resolve, reject) => {
            this.http.post(URL, formData, {
                headers: headers;
            }).subscribe(
                res => {
                    this.responseData = res.json();
                    resolve(this.responseData);
                },
                error => {
                    reject(error);
                }
            );
        });

        // var data = new FormData();
        // data.append("file", "C:\\test.mp4");
        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         console.log(this.responseText);
        //     }
        // });
        // xhr.open("POST", "http://localhost:3000/upload");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "522a30e3-ec83-1cc1-c490-e1fc0cc72371");
        // xhr.send(data);

        // this.http.post(URL, this.file)
        //     .subscribe(
        //         (response) => {
        //             console.log(response);
        //             var tmp = this.todoList.pop();
        //             this.fileList.push(tmp);
        //             this.fileListChanged.next(<any>(this.fileList.slice()));
        //             //window.open('./upload');
        //         },
        //         (err) => {
        //             console.log(err);
        //
        //         }
        //     );
        //this.uploader.uploadAll();
    }

    // downloadFile() {
    //     this.http.get(URL).subscribe(
    //             (response) => {
    //                 console.log(response);
    //                 var tmp = this.todoList.pop();
    //                 this.fileList.push(tmp);
    //                 this.fileListChanged.next(<any>(this.fileList.slice()));
    //                 window.open('./upload');
    //             },
    //             (err) => {
    //                 console.log(err);
    //
    //             }
    //         );
    // }

    clear() {
        this.fileList = [];
        this.fileListChanged.next(<any>(this.fileList.slice()));
    }

}