import {Component, OnInit, Output} from '@angular/core';
import {FileItem} from 'ng2-file-upload';
import {AppComponent} from './app.component';

@Component({
    selector: 'my-playlist',
    templateUrl: './playList.component.html'
})

export class PlayListComponent implements OnInit{
    videoList = [];

    constructor(private appComponent: AppComponent) {}

    ngOnInit() {
        this.videoList = this.appComponent.fileList;
        this.appComponent.fileListChanged
            .subscribe(
                (item: FileItem) => {
                    this.videoList = this.appComponent.fileList;
                }
            );
    }

}