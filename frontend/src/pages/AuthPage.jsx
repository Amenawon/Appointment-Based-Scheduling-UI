import './AuthPage.css';

function AuthPage() {
    return (
        <div className="auth-form">
            <h1>Login page</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="auth-submit-btn">Submit</button>
        </div>
    );
}

export default AuthPage;