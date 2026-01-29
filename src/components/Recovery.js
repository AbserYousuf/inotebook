import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
export default function Recovery() {
    const host = process.env.REACT_APP_API_URL
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const Navigate = useNavigate()
    const [Email, setEmail] = useState({
        email: ""
    })
    const handleChange = (e) => {
        setEmail({ ...Email, [e.target.name]: e.target.value })
    }
    const send = async (e) => {
        console.log("click")
        e.preventDefault()
        try {
            const userEmail = Email.email.toLowerCase().trim()
            const response = await fetch(`${host}/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userEmail })
            })
            const json = await response.json()
            if (json.success) {
                setMessage(json.message)
                setIsSuccess(true)
                setTimeout(() => {
                    setMessage(null)
                    setIsSuccess(null)
                    Navigate('/otp', { state: { email: userEmail } })
                }, 7000);
            }
        } catch (error) {
            setMessage(error)
            setIsSuccess(true)
        }
    }
    return (
        <>
            {message && (
                <div
                    className={`alert ${isSuccess ? "alert-success" : "alert-danger"} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow`}
                    role="alert"
                    style={{
                        zIndex: 1050, // above most elements
                        minWidth: "300px", // decent width on mobile
                        maxWidth: "90vw",
                    }}
                >
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            <div
                className="vh-100 d-flex justify-content-center align-items-center bg-light p-4"
                style={{ minHeight: '100vh' }}
            >
                <div
                    className="card shadow-lg border-0"
                    style={{ maxWidth: '420px', width: '100%' }}
                >
                    <div className="card-body p-5 text-center">
                        {/* Icon & Title */}
                        <div className="mb-4">
                            <i className="fa fa-lock fa-5x text-primary mb-3"></i>
                            <h2 className="fw-bold">Forgot Password?</h2>
                            <p className="text-muted">
                                You can reset your password here.
                            </p>
                        </div>

                        {/* Form */}
                        <form id="register-form" onSubmit={send} autoComplete="off">
                            {/* Email Input */}
                            <div className="mb-4">
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="fa fa-envelope text-primary"></i>
                                    </span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your Recovery email address"
                                        required
                                        value={Email.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                name="recover-submit"
                                className="btn btn-primary btn-lg w-100"
                            >
                                Send Email
                            </button>

                            {/* Hidden token (if needed) */}
                          
                        </form>

                        {/* Back to login link */}
                        <p className="mt-4 text-muted small">
                            Remember your password? <Link to="/login" className="text-primary">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
