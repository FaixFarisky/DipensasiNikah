import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios"; // Import axios

const Add_pimpinan = () => {
    const [nama, setNama] = useState('');
    const [nip, setNip] = useState('');
    const [jabatan, setJabatan] = useState('');

    const clearForm = () => {
        setNama('');
        setNip('');
        setJabatan('');
    };

    const addPimpinan = async (e) => {
        e.preventDefault(); // Prevent form default behavior
        if (!nama || !nip || !jabatan) {
            alert('Isi semua kolom');
        } else {
            const pimpinanNew = { nama, nip, jabatan };
            try {
                // Menggunakan axios untuk mengirimkan data ke API
                const response = await axios.post("http://localhost/dispensasi_api/createPimpinan.php", pimpinanNew, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data); // Cek respons dari server
                alert('Data pimpinan berhasil ditambahkan');
                clearForm();
            } catch (error) {
                console.error(error); // Log error ke console
                alert('Terjadi kesalahan saat menambahkan data');
            }
        }
    };

    return (
        <>
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-24 mr-14">
                <h1 className="text-2xl font-semibold mb-6">Tambah Data Pimpinan</h1>
                <form>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nama</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Lengkap" required
                            value={nama}
                            onChange={(e) => { setNama(e.target.value) }} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nip" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">NIP</label>
                        <input type="text" id="nip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="NIP" required
                            value={nip}
                            onChange={(e) => { setNip(e.target.value) }} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="jabatan" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Jabatan</label>
                        <input type="text" id="jabatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jabatan" required
                            value={jabatan}
                            onChange={(e) => { setJabatan(e.target.value) }} />
                    </div>
                    <Link to="/pimpinan">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 mb-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={addPimpinan}>Tambah</button>
                    </Link>
                </form>
            </main>
        </>
    );
};

export default Add_pimpinan;
