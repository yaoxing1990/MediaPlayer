import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PlayService {
    name: string;
    nameChanged = new Subject<string>();

    play() {
        this.nameChanged.next(<any>(this.name.slice()));
    }
}