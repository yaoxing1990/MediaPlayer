import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { FileSelectDirective } from 'ng2-file-upload/file-upload/file-select.directive';
import {HttpModule} from '@angular/http';
import {VideoplayerComponent} from './videoPlayer.component';
import {PlayListComponent} from './playList.component';
import {PlayListItemComponent} from './playListItem.component';
import { Uploader } from 'angular2-http-file-upload';
import {PlayService} from './play.service';


@NgModule({
    declarations: [AppComponent,
                    FileSelectDirective,
                    VideoplayerComponent,
                    PlayListComponent,
                    PlayListItemComponent],
    imports: [BrowserModule, HttpModule],
    providers: [ Uploader, PlayService],
    bootstrap: [AppComponent]
})
export class AppModule {

}