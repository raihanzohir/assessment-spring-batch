import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog} from '@angular/material/dialog';

const AUTH_KEY = 'isAuthenticated';
const USER_NAME = 'User_Name';
const JWT = 'jwt';
const SESSIONID = 'sessionId';
const USER_CODE = 'User_Code';
const USER_ROLE = 'User_Role';
const SESSION_TIME = 'sessionStartTime';

export class commonResponse{
    responseCode: number;
    responseMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 

    private isAuthenticated = false;
    private userName = "";
    private jwt = "";
    private sessionId = "";
    private userCode = "";
    private userRole = "";
    private loginUrl = "http://10.11.201.214:9090/api/v1/auth/login";
    
    constructor(private httpClient: HttpClient,
        public dialog: MatDialog) {

        this.jwt = this.getJwtToken();
        this.isAuthenticated = this.getStoredAuthenticationState();
        this.sessionId = this.getSession();
        this.userCode = this.getAuthUserCode();
        this.userName = this.getAuthenticatedUserInformation();
        this.userRole = this.getAuthUserRole();
    }

    setIsAuthenticated(authenticated: boolean) {
        this.isAuthenticated = authenticated;
        this.storeAuthenticationState();        
    }
    
    setUserName(userName: string){
        this.userName = userName;
        this.storeAuthenticatedUserInformation();
    }

    setJwt(jwt: string){
        this.jwt = jwt;
        this.storeJwtToken();
    }

    setSessionId(sessionId: string){
        this.sessionId = sessionId;
        this.storeSessionId();
    }

    setUserCode(userCode: string){
        this.userCode = userCode;
        this.storeUserCode();
    }

    setUserRole(userRole: string){
        this.userRole = userRole;
        this.storeUserRole();
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getUserName(){
        return this.userName;
    }

    getJwt(){
        return this.jwt;
    }

    getSessionId(){
        return this.sessionId;
    }

    getUserCode(){
        return this.userCode;
    }

    getUserRole(){
        return this.userRole;
    }

    private storeAuthenticationState() {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(this.isAuthenticated));
    }

    private storeAuthenticatedUserInformation(){
        sessionStorage.setItem(USER_NAME, JSON.stringify(this.userName));        
    }

    private storeJwtToken(){
        sessionStorage.setItem(JWT, JSON.stringify(this.jwt));        
    }

    private storeSessionId(){
        sessionStorage.setItem(SESSIONID, JSON.stringify(this.sessionId));        
    }

    private storeUserCode(){
        sessionStorage.setItem(USER_CODE, JSON.stringify(this.userCode));        
    }

    private storeUserRole(){
        sessionStorage.setItem(USER_ROLE, JSON.stringify(this.userRole));      
    }
    
    private getStoredAuthenticationState(): boolean {
        const storedValue = sessionStorage.getItem(AUTH_KEY);
        return storedValue ? JSON.parse(storedValue) : false;
    }

    private getAuthenticatedUserInformation(): string {
        const storedUserName = sessionStorage.getItem(USER_NAME);
        return storedUserName ? JSON.parse(storedUserName) : null;
    }

    private getJwtToken(): string{
        const storedJwt = sessionStorage.getItem(JWT);
        return storedJwt ? JSON.parse(storedJwt) : null;
    }

    private getSession(): string{
        const storedSessionId = sessionStorage.getItem(SESSIONID);
        return storedSessionId ? JSON.parse(storedSessionId) : null;
    }

    private getAuthUserCode(): string{
        const storedUserCode = sessionStorage.getItem(USER_CODE);
        return storedUserCode ? JSON.parse(storedUserCode) : null;
    }

    private getAuthUserRole(): string{
        const storedUserRole = sessionStorage.getItem(USER_ROLE);
        return storedUserRole ? JSON.parse(storedUserRole) : null;
    }

    logout() {
        this.setIsAuthenticated(false);
        this.setUserName(null);
        this.setJwt(null);
        this.setSessionId(null);
        this.setUserCode(null);
        this.setUserRole(null);
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(USER_NAME);
        sessionStorage.removeItem(JWT);
        sessionStorage.removeItem(SESSIONID);
        sessionStorage.removeItem(USER_CODE);
        sessionStorage.removeItem(USER_ROLE);
        sessionStorage.removeItem(SESSION_TIME);
        this.dialog.closeAll();
    }

    //API call

    //Check user
    getLogin(loginDTO: any): Observable<any>{
        return this.httpClient.post(`${this.loginUrl}`, loginDTO);
    }

}