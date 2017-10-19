import {Component, OnInit} from '@angular/core';
import {PlayService} from './play.service';

@Component({
    selector: 'my-videoplayer',
    templateUrl: './videoPlayer.component.html'
})

export class VideoplayerComponent implements OnInit{
    name: string;

    constructor(private playService: PlayService) {}

    ngOnInit() {
        this.name = this.playService.name;
        this.playService.nameChanged
            .subscribe(
                (response: string) => {
                    this.name = this.playService.name;
                }
            );
    }

}