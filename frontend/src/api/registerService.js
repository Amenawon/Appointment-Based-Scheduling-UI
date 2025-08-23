import apiClient from './client';

export async function register(firstName, lastName, organisation, email, password) {
    try {

        const response = await apiClient.post('/api/User/register', { firstName, lastName, organisation, email, password });

        console.log('Response data:', response.data);

    return { 
        success: true,
        data: response.data
    };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Registration failed'
        };
    }
}