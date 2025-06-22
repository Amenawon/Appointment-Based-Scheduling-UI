import apiClient from './client';
import { jwtDecode } from 'jwt-decode';

export async function login(email, password) {
        try {

            const response = await apiClient.post('/api/User/login', { email, password });
        
            const { token } = response.data;

            console.log('Response data:', response.data);

            console.log('Token:', token.result);

            const decoded = jwtDecode(token.result);
            const emailClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
            const userEmail = decoded[emailClaim];
            console.log('Email:', userEmail);

            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', userEmail);

        return { 
            success: true,
            data: { email: userEmail }
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Login failed'
        };
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export function isLoggedIn() {
    return !!localStorage.getItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}