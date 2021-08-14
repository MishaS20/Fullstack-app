import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Bid, BidPosition } from '../shared/interfaces';
import { BidService } from '../shared/services/bid.services';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('modal') modalRef: ElementRef
    modal: MaterialInstance
    oSub: Subscription
    isRoot: boolean
    pending = false
    constructor(private router: Router, public bidService: BidService) { }

    ngOnInit(): void {
        this.isRoot = this.router.url == '/order'
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) { this.isRoot = this.router.url == '/order' }
        })
    }
    deleteBid(bidPosition: BidPosition) {
        this.bidService.delete(bidPosition)
    }
    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }

    ngOnDestroy() {
        this.modal.destroy()
        if (this.oSub) {
            this.oSub.unsubscribe()
        }
    }

    openModal() {
        this.modal.open()
    }
    closeModal() {
        this.modal.close()
    }

    onSubmit() {
        this.pending = true
        this.modal.close()
        const bid: Bid = {
            list: this.bidService.list.map(item => {
                delete item._id
                return item
            })
        }

        this.oSub = this.bidService.addBd(bid).subscribe(
            newBid => {
                MaterialService.toast(`Ставки были добавлены.`)
                this.bidService.clear()
            },
            error => { MaterialService.toast(error.error.meessage) },
            () => {
                this.modal.close()
                this.pending = false
            }
        )
    }

}
