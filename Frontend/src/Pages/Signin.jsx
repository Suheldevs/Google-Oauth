import React, { useState, useEffect } from 'react';
import { Alert, Button, FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase';

function Signin() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);  

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        if (password.toString().length < 6) {
            return setError('Password length must be 6 or more characters');
        }
        const name = e.target.name.value.trim();
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            return setError('Password does not match!');
        }

        const uploadedImage = URL.createObjectURL(e.target.image.files[0]);
        setFormData({
            name: name,
            email: e.target.email.value,
            password: password,
            image: uploadedImage,
        });
    };

    // Google authentication
    const handleGoogleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const user = resultFromGoogle.user;
            console.log(user);
            setFormData({
                name: user.displayName,
                email: user.email,
                password: 'Random-Pass', 
                image: user.photoURL,
            });
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (formData) {
            navigate('/user-details', { state: formData });
        }
    }, [formData, navigate]);  

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-50">
            <div className="lg:w-96 w-full px-6 bg-white shadow-lg rounded-lg">
                <form className="my-4 flex flex-col gap-1" onSubmit={handleSubmit}>
                    <div className="text-center font-bold text-2xl m-4">Sign In</div>
                    {error ? <Alert color="red">{error}</Alert> : ''}
                    <Label value="Name" />
                    <TextInput type="text" placeholder="Enter Your Name" name="name" required />
                    <Label value="Email" />
                    <TextInput type="email" placeholder="Enter Your Email" name="email" required />
                    <Label value="Password" />
                    <TextInput type="password" className="mb-2" placeholder="Enter a Password" name="password" required />
                    <TextInput type="password" className="mb-2" placeholder="Confirm Password" name="confirmPassword" required />
                    <FileInput type="file" className="mb-2" name="image" required />
                    <Button color="dark" type="submit" className="w-full my-2 mb-4" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;<span> Processing..</span>
                            </>
                        ) : (
                            'SIGN IN'
                        )}
                    </Button>
                    <Button color="dark" className="w-full my-2 mb-4" disabled={loading} outline onClick={handleGoogleClick}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;<span> Processing..</span>
                            </>
                        ) : (
                         <>   <FaGoogle size={'20px'} /> &nbsp; SIGN IN WITH GOOGLE </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signin;
