import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
export default function Otp() {
    const host = process.env.REACT_APP_API_URL
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password, setpassword] = useState({
        password1: "",
        password2: ""
    })
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null)
    const { state } = useLocation();
    const Navigate = useNavigate()
    const email = state?.email;  // received from recovery page
    const [otp, setotp] = useState({
        otp: "",
    })
    const handleChange = (e) => {
        setotp({ ...otp, [e.target.name]: e.target.value })
        setpassword({ ...password, [e.target.name]: e.target.value })
    }
    const send = async (e) => {

        const { password1 } = password
        e.preventDefault()
        try {
            if (!email) {
                Navigate('/recovery');
                return;
            }
            console.log("Email type before fetch:", typeof email, email);
            if (!otp.otp) {
                setMessage("Please Otp first")
                setIsSuccess(true)
                return
            }
            if (!password.password1 && !password.password2) {
                setMessage("please enter the both passwords field first")
                setIsSuccess(false)
                return
            }
            if (!password.password1 || !password.password2) {
                setMessage("please enter the password field first")
                setIsSuccess(false)
                return
            }
            if (password.password1.trim() !== password.password2.trim()) {
                setMessage("the passwords should match")
                setIsSuccess(false)
                return
            }
            const response = await fetch(`${host}/api/auth/createpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, otp: otp.otp, password: password1 })
            })
            const json = await response.json()
            console.log(json)
            if (!json.success) {
                setMessage(json.error)
                setIsSuccess(true)
                return
            }
            setMessage("Password Updated...")
            setTimeout(() => {
                setMessage(null)
                setIsSuccess(null)
                Navigate('/login')
            }, 4000);
        } catch (error) {
            setMessage(error)
            setIsSuccess(true)
            setTimeout(() => {
                setMessage(null)
                setIsSuccess(null)
            }, 4000);

        }
    }

    return (
        <>
            {/* Full viewport height + flex centering */}
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
            <section className="vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-5">
                                    {/* Illustration + Form side by side */}
                                    <div className="row">
                                        {/* Left: Illustration */}
                                        <div className="col-lg-6 d-none d-lg-block text-center">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                                className="img-fluid"
                                                alt="Phone illustration"
                                            />
                                        </div>

                                        {/* Right: Form */}
                                        <div className="col-lg-6">
                                            <h3 className="text-center mb-4 fw-bold">Reset Your Password</h3>
                                            <p className="text-center text-muted mb-4">
                                                Enter OTP sent to <strong>YOUR EMAIL</strong>
                                            </p>

                                            {/* OTP Inputs */}
                                            <div className="d-flex justify-content-center gap-2 mb-4">

                                                <input
                                                    type="text"
                                                    name='otp'
                                                    className="form-control form-control-lg pe-5"
                                                    value={otp.otp}
                                                    placeholder='Otp Here....'
                                                    onChange={handleChange}

                                                />

                                            </div>

                                            {/* Password 1 */}
                                            <div className="form-outline mb-4 position-relative">
                                                <input
                                                    type={showPassword1 ? 'text' : 'password'}
                                                    id="password1"
                                                    name="password1"
                                                    value={password.password1}
                                                    onChange={handleChange}
                                                    className="form-control form-control-lg pe-5"
                                                    placeholder="Create Password"
                                                />
                                                <label className="form-label" htmlFor="password1">
                                                    Create Password
                                                </label>
                                                <i
                                                    className={`fa-solid ${showPassword1 ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y me-3`}
                                                    style={{ cursor: 'pointer', zIndex: 10 }}
                                                    onClick={() => setShowPassword1(!showPassword1)}
                                                />
                                            </div>

                                            {/* Password 2 */}
                                            <div className="form-outline mb-4 position-relative">
                                                <input
                                                    type={showPassword2 ? 'text' : 'password'}
                                                    id="password2"
                                                    name="password2"
                                                    value={password.password2}
                                                    onChange={handleChange}
                                                    className="form-control form-control-lg pe-5"
                                                    placeholder="Confirm Password"
                                                />
                                                <label className="form-label" htmlFor="password2">
                                                    Confirm Password
                                                </label>
                                                <i
                                                    className={`fa-solid ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y me-3`}
                                                    style={{ cursor: 'pointer', zIndex: 10 }}
                                                    onClick={() => setShowPassword2(!showPassword2)}
                                                />
                                            </div>


                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg w-100"
                                                onClick={send}
                                            >
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
