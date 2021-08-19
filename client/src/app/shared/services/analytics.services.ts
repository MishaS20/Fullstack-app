import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnalyticsPage, OverviewPage } from "../interfaces";



@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    constructor(private htpp: HttpClient) { }

    getOverview(): Observable<OverviewPage> {
        return this.htpp.get<OverviewPage>('/api/analytics/overview')
    }

    getAnalytics(): Observable<AnalyticsPage> {
        return this.htpp.get<AnalyticsPage>('/api/analytics/analytics')
    }
}