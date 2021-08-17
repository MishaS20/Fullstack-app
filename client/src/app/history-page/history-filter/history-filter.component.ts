import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { EventEmitter } from '@angular/core';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
    selector: 'app-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

    @Output() onFilter = new EventEmitter<Filter>()
    @ViewChild('start') startRef: ElementRef
    @ViewChild('end') endRef: ElementRef

    order: number
    start: MaterialDatepicker
    end: MaterialDatepicker
    isValid = true

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.start.destroy()
        this.end.destroy()
    }

    ngAfterViewInit() {
        this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this))
        this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this))
    }

    validate() {
        if (!this.start.date || !this.end.date) {
            this.isValid = true
            return
        }
        this.isValid = this.start.date < this.end.date
    }


    submitFilter() {
        const filter: Filter = {}
        if (this.start.date) {
            filter.start = this.start.date
        }
        if (this.end.date) {
            filter.end = this.end.date
        }

        if (this.order) {
            filter.order = this.order
        }
        this.onFilter.emit(filter)
    }

}
