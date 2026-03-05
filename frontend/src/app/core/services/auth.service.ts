import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _http = inject(HttpClient)
    private api = 'http://localhost:4000/api/auth';

    login(data: any) {
        console.log('Login data :: ', data);
        return this._http.post<any>(`${this.api}/login`, data);
    }

    register(data: any) {
        return this._http.post(`${this.api}/register`, data);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getRole() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.clear();
    }
}
