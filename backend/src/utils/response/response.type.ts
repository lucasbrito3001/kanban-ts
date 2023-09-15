export type ResponseFormat<T = any, K = any> = {
    status: boolean
    content?: T
    error?: K
}

export interface IResponseService {
    formatSuccess(status: boolean, content: any): ResponseFormat
    formatError(status: boolean, error: any): ResponseFormat
}