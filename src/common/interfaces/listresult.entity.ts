export class ListResult<T> {
    data: T[];
    count?: number;
    page?: number;
    pageSize?: number;
}
