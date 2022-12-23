import { ListResult } from "../interfaces/listresult.entity";

export class ResponseData<T>  extends ListResult<T>{
    statusCode: number;
    message: [string];
}
