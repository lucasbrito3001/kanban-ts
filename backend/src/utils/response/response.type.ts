export type ResponseFormat<T = any, K = any> = {
    status: boolean
    content?: T
    errorType?: string
    error?: K
}

export interface IResponseService {
    formatSuccess(content: any): ResponseFormat
    formatError(errorType: string, error?: any): ResponseFormat
}