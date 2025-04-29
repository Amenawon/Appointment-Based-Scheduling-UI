import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingPage.css';
import React, { useState } from 'react';

function BookingPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div>
            <h1>Booking page</h1>
        <div className="booking-container">
            <div className="column left-column">
                <h2>Choose attendees</h2>
                <input type="text" placeholder="Enter attendees here" className="attendees-textbox"/>
                <h2>Insert appointment duration</h2>
                <input type="text" placeholder="Enter duration here" className="appointment-duration-textbox"/>
                <h2>Insert appointment description</h2>
                <input type="text" placeholder="Enter description here" className="appointment-description-textbox"/>
                <h2>Insert appointment location</h2>
                <input type="text" placeholder="Enter location here" className="appointment-location-textbox"/>
            </div>
            <div className="column middle-column">
                <h2>Choose appointment date</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="Select appointment date"
                />
            </div>
            <div className="column right-column">
                <h2>Available time slots</h2>
            </div>
        </div>
        </div>
    );
}

export default BookingPage;