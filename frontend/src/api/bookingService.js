import apiClient from './client'; // Import from your centralized config

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
      console.log("Would send to API:", appointmentData);
      return { success: true, appointmentData }; // Mock response
      const response = await apiClient.post('/appointments', appointmentData);
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
  // ... other methods
};

export default BookingService;