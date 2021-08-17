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