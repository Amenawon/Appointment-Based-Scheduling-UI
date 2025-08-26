import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/dashboard" element={<BookingPage />} />
            </Routes>
        </Router>
    );
}

export default App;