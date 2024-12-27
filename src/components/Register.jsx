import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apis from "../api/penduduk";
import logo from "../img/logo.png";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await apis.register(username, email, password);
            console.log('Registrasi berhasil:', response.data);

            // Redirect ke halaman login setelah registrasi berhasil
            navigate('/');
        } catch (error) {
            console.error('Registrasi gagal:', error.response?.data || error);
            setError('Registrasi gagal, periksa kembali data yang Anda masukkan.');
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="max-w-sm w-full px-6 lg:px-8 border border-black rounded-xl p-10">
                <div className="mx-auto">
                    <img className="mx-auto h-40 w-auto" src={logo} alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register to your account
                    </h2>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* <form className="mt-5 space-y-5" >
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form> */}

                <form className="mt-5 space-y-5" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button type="submit" className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Sudah punya akun?<Link to="/"><a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a></Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
