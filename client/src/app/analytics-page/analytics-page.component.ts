import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js'
import { AnalyticsPage, ChartConfig } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.services';

Chart.register(...registerables)

@Component({
    selector: 'app-analytics-page',
    templateUrl: './analytics-page.component.html',
    styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {


    @ViewChild('gain') gainRef: ElementRef
    @ViewChild('bid') bidRef: ElementRef
    aSub: Subscription
    average: number
    pending = true

    constructor(private serviceAnalytics: AnalyticsService) { }

    ngAfterViewInit() {
        const gainConfig: any = {
            label: 'Прибыль',
            color: 'rgb(255, 99, 132)'
        }
        const bidConfig: any = {
            label: 'Ставки',
            color: 'rgb(54, 162, 235)'
        }

        this.aSub = this.serviceAnalytics.getAnalytics().subscribe((data: AnalyticsPage) => {
            this.average = data.average
            gainConfig.labels = data.chart.map(item => item.label)
            gainConfig.data = data.chart.map(item => item.gain)


            bidConfig.labels = data.chart.map(item => item.label)
            bidConfig.data = data.chart.map(item => item.bid)

            const gainContext = this.gainRef.nativeElement.getContext('2d')
            const bidContext = this.bidRef.nativeElement.getContext('2d')
            gainContext.canvas.height = '300px'
            bidContext.canvas.height = '300px'

            new Chart(gainContext, createChartConfig(gainConfig))
            new Chart(bidContext, createChartConfig(bidConfig))
            this.pending = false
        })
    }
    ngOnDestroy() {
        if (this.aSub) { this.aSub.unsubscribe() }
    }
}

function createChartConfig({ labels, data, label, color }: ChartConfig): any {
    return {
        type: 'line',
        options: {
            responsive: true
        },
        data: {
            labels,
            datasets: [{
                label, data,
                borderColor: color,
                steppedLine: false,
                fill: false
            }]
        }
    }
}