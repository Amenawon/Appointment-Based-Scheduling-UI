import apiClient from './client';

const BookingService = {
  async getAppointments() {
    try {
      const response = await apiClient.get('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  async createAppointment(appointmentData) {
    try {
      const response = await apiClient.post('/api/Appointment', appointmentData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with 4XX/5XX status
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'Booking failed');
      } else {
        // Network or other errors
        console.error('Network Error:', error.message);
        throw new Error('Network error. Please try again.');
      }
    }
  }
};

export default BookingService;