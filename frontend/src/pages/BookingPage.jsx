import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingPage.css';
import React, { useState } from 'react';
import BookingService from '../api/bookingService'; 

function BookingPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        listAttendees: '',
        duration: '',
        title: '',
        description: '',
        location: '',
        timeSlot: '',
        status: '',
        organiserEmail: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        console.log("Submit triggered!", { selectedDate, formData });
        // Validate required fields
        if (!selectedDate || !formData.title || !formData.duration) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            // Prepare data for API
            const appointmentData = {
                date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                time: formData.timeSlot, 
                listAttendees: formData.listAttendees
                .split(',')
                .map(email => email.trim())
                .filter(email => email.length > 0)
                .map(email => ({
                    attendeeEmail: email,
                    role: 'Attendee',
                    rsvpStatus: 'Accepted'
                })),
                durationMinutes: parseInt(formData.duration),
                title: formData.title,
                description: formData.description,
                location: formData.location,
                status: formData.status,
                organiserEmail: formData.organiserEmail
            };

            //Call your booking service
            const response = await BookingService.createAppointment(appointmentData);
            
            // Handle success
            console.log('Booking successful:', response);
            alert('Appointment booked successfully!');
            
            // Reset form (optional)
            setSelectedDate(null);
            setFormData({
                listAttendees: '',
                duration: '',
                title: '',
                description: '',
                location: '',
                timeSlot: '',
                status: '',
                organiserEmail: ''
            });

        } catch (err) {
            console.error('Booking failed:', err);
            setError(err.message || 'Failed to book appointment');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>Booking page</h1>
        <div className="booking-container">
            <div className="column left-column">
                <h2>Choose attendees</h2>
                <input 
                    type="text" 
                    name="listAttendees" 
                    value={formData.listAttendees}
                    onChange={(e) =>{
                        setFormData(prev => ({
                            ...prev,
                            listAttendees: e.target.value
                        }));
                    }}
                    placeholder="Enter attendee emails" 
                    className="attendees-textbox"
                />
                <h2>Add Organiser email</h2>
                <input 
                    type="text" 
                    name="organiserEmail" 
                    value={formData.organiserEmail}
                    onChange={handleInputChange}
                    placeholder="Enter Organiser email here" 
                    className="organiser-email-textbox"
                />
                <h2>Appointment duration</h2>
                <input 
                    type="text" 
                    name="duration" 
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Enter duration here" 
                    className="appointment-duration-textbox"
                />
                <h2>Appointment title</h2>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title here" 
                    className="appointment-title-textbox"
                />
                <h2>Appointment description</h2>
                <input 
                    type="text" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter description here" 
                    className="appointment-description-textbox"
                />
                <h2>Appointment status</h2>
                <input 
                    type="text" 
                    name="status" 
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="Enter appointment status here" 
                    className="appointment-status-textbox"
                />
            </div>
            <div className="column middle-column">
                <h2>Choose appointment date</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                />
            </div>
            <div className="column right-column">
                <h2>Available time slots</h2>
                <button className="app-book-btn" onClick={handleSubmit}>Book</button>
            </div>
        </div>
        </div>
    );
}

export default BookingPage;