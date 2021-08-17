import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Bid } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {

    @ViewChild('modal') modalRef: ElementRef
    @Input() bids: Bid[]
    modal: MaterialInstance
    selectorBid: Bid

    ngOnDestroy() {
        this.modal.destroy()
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }

    closeModal() {
        this.modal.close()
    }

    computeSumm(bid: Bid): number {
        return bid.list.reduce((total, item) => {
            if (item.result == 'true') {
                const summa = item.summ * item.coefficient - item.summ
                return total += Number(summa.toFixed(2))
            } else {
                return total -= item.summ
            }
        }, 0)
    }
    selectBid(bid: Bid) {
        this.selectorBid = bid
        this.modal.open()
    }
}
