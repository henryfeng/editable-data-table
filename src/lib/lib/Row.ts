export default class Row {

    data: any;
    private _errors: Array<string | null> = [];

    constructor(data: any) {
        this.data = data;
        this._errors = [];
        if (data.err) {
            this._errors[3] = '';
        }
    }

    validate(): boolean {
        this._errors = [];
        return false;
    }

    getError(idx: number): string | null {
        return this._errors[idx];
    }

    get hasError(): boolean {
        return !this._errors.every(item=>item==null);
    }

}