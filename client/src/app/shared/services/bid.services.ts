import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bid, BidPosition, Position } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class BidService {

    public list: BidPosition[] = []
    public summWin: number = 0
    public summLose: number = 0

    constructor(private http: HttpClient) { }

    create(position: Position) {

        const bidPosition: BidPosition = Object.assign({}, {
            name: position.title,
            summ: position.summ,
            coefficient: position.coefficient,
            result: position.result,
            win: position.win,
            _id: position._id
        })

        this.list.push(bidPosition)
        this.computeWinAndLoseSumm()
    }
    delete(bidPosition: BidPosition) {
        const idx = this.list.findIndex(position => {
            position._id == bidPosition._id
        })
        this.list.splice(idx, 1)
        this.computeWinAndLoseSumm()
    }

    fetch(params: any = {}): Observable<Bid[]> {
        return this.http.get<Bid[]>('/api/bid', {
            params: new HttpParams({
                fromObject: params
            })
        })
    }

    clear() {
        this.list = []
        this.summWin = 0
        this.summLose = 0
    }

    private computeWinAndLoseSumm() {
        this.summWin = this.list.reduce((total, item) => {
            if (item.result === 'true') {
                return total += item.win
            }
            return total
        }, 0)
        this.summLose = this.list.reduce((total, item) => {
            if (item.result === 'false') {
                return total += item.summ
            }
            return total
        }, 0)
    }


    addBd(bid: Bid): Observable<Bid> {
        return this.http.post<Bid>('/api/bid', bid)
    }
}