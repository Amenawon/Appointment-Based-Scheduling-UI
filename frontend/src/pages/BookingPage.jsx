import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingPage.css';
import React, { useEffect, useState } from 'react';
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
        organiserEmail: ''
    });
    useEffect(() => {
    // Load the organiser email from localStorage
    const email = localStorage.getItem('userEmail'); 
    if (email) {
        setFormData(prev => ({
            ...prev,
            organiserEmail: email
        }));
    }
}, []);
    const [error, setError] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');

    const hours = Array.from({ length: 13 }, (_, i) => (i + 7).toString().padStart(2, '0')); // "07" to "19"
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')); // "00" to "55"


    const handleSubmit = async () => {
        console.log("Submit triggered!", { selectedDate, formData });
        // Validate required fields
        if (!selectedDate || !formData.title || !formData.duration) {
            setError('Please fill in all required fields');
            return;
        }

        const chosenTime = selectedHour + ':' + selectedMinute;
        console.log(chosenTime);

        try {
            // Prepare data for API
            const appointmentData = {
                date: selectedDate.toLocaleString().split(',')[0] + ' ' + chosenTime, 
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
                duration: parseInt(formData.duration),
                title: formData.title,
                description: formData.description,
                location: formData.location,
                organiserEmail: formData.organiserEmail
            };
            console.log(selectedDate)
            console.log(appointmentData.date)

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
                timeSlot: ''
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
                <h2>Appointment location</h2>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter appointment location here" 
                    className="appointment-location-textbox"
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
                <h2>Choose time</h2>

                <div className="hour-row">
                    <label className="time-label">Hour: </label>
                <select className="time-select" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                    <option value="">Select Hour</option>
                    {hours.map((hour) => (
                    <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
                </div>
                
                <div className="minute-row">
                    <label className="time-label">Minute: </label>
                <select className="time-select" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
                    <option value="">Select Minute</option>
                    {minutes.map((minute) => (
                    <option key={minute} value={minute}>{minute}</option>
                    ))}
                </select>
                </div> 

                <button className="app-book-btn" onClick={handleSubmit}>Book</button>
            </div>
        </div>
        </div>
    );
}

export default BookingPage;