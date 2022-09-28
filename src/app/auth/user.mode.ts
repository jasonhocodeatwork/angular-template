export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpDate: Date) 
        {}

    get token() {
        // no token OR token expired
        if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
            return null;
        }
        return this._token;
    }
}