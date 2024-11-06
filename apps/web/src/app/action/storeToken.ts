"use server"
import { cookies } from "next/headers";
function getAccessToken() {
    return cookies().get('access_token');
}
function getRefreshToken() {
    return cookies().get('refresh_token');
}

function setTokenFromCookies(token: string) {
    cookies().set('access-token', token, {
        httpOnly: true,  
        secure: true,   
        maxAge: 60 * 60 ,  
        path: "/",      
        sameSite: "strict",
    });
}
function removeTokenFromCookies() {
    cookies().delete('access_token');
    cookies().delete('refresh_token');
}

export { getAccessToken, removeTokenFromCookies ,setTokenFromCookies, getRefreshToken};
