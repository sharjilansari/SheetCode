import { MemberExpression } from './../../node_modules/acorn/dist/acorn.d';
class ApiResponse {

    private statusCode: number
    private data: string | null | Object | Promise<any>
    private message: string
    private success: boolean

    constructor(statusCode: number, data: string | Promise<any> | Object | any, message: string = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400 ;
    }
}

export {ApiResponse};