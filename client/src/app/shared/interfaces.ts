export interface User {
    email: String,
    password: String,
}

export interface Category {
    name: string,
    imageSrc?: string,
    user?: string,
    _id: string
}

export interface Message {
    message: string
}
export interface Position {
    title: string,
    category: string,
    user?: string,
    _id?: string,
    result?: string,
    summ?: number,
    win?: number,
    coefficient?: number,
}

export interface Bid {
    list: BidPosition[],
    date?: Date,
    order?: number,
    user?: string,
    _id?: string
}

export interface BidPosition {
    name: string,
    summ: number,
    coefficient: number,
    result: string
    win: number,
    _id?: string
}

export interface Filter {
    start?: Date,
    end?: Date,
    order?: number
}

export interface OverviewPage {
    bids: OverviewPageItem,
    gain: OverviewPageItem
}
export interface OverviewPageItem {
    percent: number,
    compair: number,
    yesterday: number,
    isHigher: boolean
}
export interface AnalyticsPage {
    average: number,
    chart: AnalyticsChart[],
}
export interface AnalyticsChart {
    gain: number,
    bid: number,
    label: string,
}

export interface ChartConfig {
    label: string,
    color: string,
    labels: Date,
    data: number
}