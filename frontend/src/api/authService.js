import apiClient from './client';
import client from './client';

export async function login(email, password) {
        try {
            const response = await apiClient.post('/api/User/login', { email, password });
                    // If the server returns a token?
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        return { success: true, data: user };
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