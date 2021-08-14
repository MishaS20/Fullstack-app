import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interfaces';
import { BidService } from 'src/app/shared/services/bid.services';
import { PositionsService } from 'src/app/shared/services/positions.services';

@Component({
    selector: 'app-order-positions',
    templateUrl: './order-positions.component.html',
    styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

    positions$: Observable<Position[]>

    constructor(private postionsService: PositionsService, private route: ActivatedRoute, private bid: BidService) { }

    ngOnInit() {
        this.positions$ = this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postionsService.fetch(params['id'])
            }),
            map((positions: Position[]) => {
                return positions.map(position => {
                    position.coefficient = 1.1
                    position.summ = 50
                    position.result = 'true'
                    return position
                })
            })
        )
    }
    addToBid(position: Position) {
        if (position.result === 'true') {
            let summWin = position.summ * position.coefficient - position.summ
            position.win = +summWin.toFixed(2)
        } else {
            position.win = 0
        }
        MaterialService.toast('Добавлена ставка')
        this.bid.create(position)
    }

}
