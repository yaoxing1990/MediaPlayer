import {Component, Input, OnInit} from '@angular/core';
import {PlayService} from './play.service';

@Component({
    selector: 'my-item',
    templateUrl: './playListItem.component.html'
})

export class PlayListItemComponent {
    @Input() name: string;

    constructor(private playService: PlayService) {}

    play() {
        this.playService.name = this.name;
        this.playService.nameChanged.next(<any>(this.name.slice()));
    }

}