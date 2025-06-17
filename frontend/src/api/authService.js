import apiClient from './client';
import client from './client';

const AuthService = {
    async login(loginDetails) {
        try {
            const response = await apiClient.post('/api/User/login', loginDetails);
            return response.data;
        } catch {
            if (error.response) {
                console.error('API Error:', error.response.data);
                throw new Error(error.response.data.message || 'Booking failed');
            } else {
                console.error('Network Error:', error.message);
                throw new Error('Network Error. Please try again.');
            }
        }
    }
};