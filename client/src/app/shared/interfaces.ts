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
}