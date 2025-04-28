import './BookingPage.css';

function BookingPage() {
    return (
        <div className="booking-container">
            <h1>Booking page</h1>
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
                <h1>Choose appointment date</h1>
            </div>
            <div className="column right-column">
                <h1>Available time slots</h1>
            </div>
        </div>
    );
}

export default BookingPage;