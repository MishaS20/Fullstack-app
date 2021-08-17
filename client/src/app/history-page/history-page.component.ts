import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Bid, Filter } from '../shared/interfaces';
import { BidService } from '../shared/services/bid.services';


const STEP = 2

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('tooltip') tooltipRef: ElementRef
    tooltip: MaterialInstance
    isFilterVisibly = false
    oSub: Subscription
    offset = 0
    limit = STEP
    bids: Bid[] = []
    filter: Filter = {}
    loading = false
    reloading = false
    noMoreBids = false

    constructor(private bidService: BidService) { }

    ngOnInit(): void {
        this.reloading = true
        this.fetch()
    }

    private fetch() {

        const params = Object.assign({}, this.filter, {
            offset: this.offset,
            limit: this.limit
        })
        this.oSub = this.bidService.fetch(params).subscribe(
            newbids => {
                this.bids = this.bids.concat(newbids)
                this.noMoreBids = newbids.length < STEP
                this.loading = false
                this.reloading = false
            })
    }

    loadMore() {
        this.loading = true
        this.offset += STEP
        this.fetch()
    }

    ngAfterViewInit() {
        this.tooltip = MaterialService.initTooltip(this.tooltipRef)
    }

    ngOnDestroy() {
        this.tooltip.destroy()
        this.oSub.unsubscribe()
    }

    applyFilter(filter: Filter) {
        this.bids = []
        this.offset = 0
        this.filter = filter
        this.reloading = true
        this.fetch()
    }

    isFiltered(): boolean {
        return Object.keys(this.filter).length !== 0
    }

}
