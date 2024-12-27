import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apis from "../api/penduduk";
import logo from "../img/logo.png";
import axios from "axios";

const Login = () => {
    const [identifier, setIdentifier] = useState('');  // identifier digunakan untuk username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  // Reset error message

        try {
            // Kirim identifier (username) dan password ke backend untuk verifikasi
            // Menggunakan POST untuk login
            const response = await axios.post("http://localhost/dispensasi_api/login.php", {
                identifier: identifier,  // username
                password: password,      // password
            });
  
            console.log('Respons Backend:', response.data); // Debugging: periksa respons backend

            // Pastikan data user ada di respons
            if (response.data && response.data.user && response.data.user.username) {
                console.log('Login berhasil:', response.data.user); // Debug data user
                const username = response.data.user.username;
                alert(`Login berhasil. Selamat datang, ${username}!`);

                // Simpan token JWT ke local storage
                localStorage.setItem('jwt', response.data.jwt);

                // Redirect ke halaman home setelah login berhasil
                navigate('/home');
            } else {
                setError('Data user tidak ditemukan.');
            }

        } catch (error) {
            console.error('Login gagal:', error.response?.data || error);
            setError('Login gagal, periksa kembali username dan password Anda.');
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="max-w-sm w-full px-6 lg:px-8 border border-black rounded-xl p-10">
                <div className="mx-auto">
                    <img className="mx-auto h-40 w-auto" src={logo} alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="mt-5 space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Belum punya akun?
                    <Link to="register">
                        <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
