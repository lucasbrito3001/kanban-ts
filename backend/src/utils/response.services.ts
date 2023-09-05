export class InternalServerErrorResponse {
	public statusCode = 500;
	public message = "Internal Server Error";
}

export class BadRequestResponse {
	public statusCode = 400;
	public message = "Bad Request";

	constructor(public error: any) {}
}

export class CreatedResponse {
	public statusCode = 201;
	public message = "Created";
}

export class OkResponse {
    public statusCode = 200;
    public message = "Ok";

    constructor(public data: any) {}
}