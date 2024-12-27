import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";  // Import axios

const Edit_pimpinan = () => {
    const { id } = useParams(); // Dapatkan ID dari URL parameter
    const [nama, setNama] = useState('');
    const [nip, setNip] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [loading, setLoading] = useState(true); // Tambahkan loading state untuk UX lebih baik

    // Fungsi untuk mengambil data pimpinan berdasarkan ID
    useEffect(() => {
        const getPimpinan = async () => {
            try {
                const response = await axios.get(`http://localhost/dispensasi_api/getPimpinanById.php?id=${id}`); // Ganti dengan endpoint yang benar
                const pimpinan = response.data;
                setNama(pimpinan.nama || '');
                setNip(pimpinan.nip || '');
                setJabatan(pimpinan.jabatan || '');
                setLoading(false); // Set loading selesai
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        getPimpinan();
    }, [id]);

    const updatePimpinan = async () => {
        if (!nama || !nip || !jabatan) {
            alert('Isi semua kolom');
            return;
        }
        try {
            const pimpinanUp = {
                nama,
                nip,
                jabatan,
            };
    
            // Pastikan id ada dan pengiriman data dilakukan dengan benar
            console.log("Mengirim data:", { id, ...pimpinanUp });
    
            // Kirim data dengan axios PUT
            const response = await axios.put(
                "http://localhost/dispensasi_api/updatePimpinan.php",
                { id, ...pimpinanUp },
                { headers: { "Content-Type": "application/json" } } // Pastikan header Content-Type adalah application/json
              );
              
            
            // Periksa respons dari API
            if (response.data.message === "Data berhasil diperbarui") {
                alert(`Data ${nama} berhasil diperbarui!`);
            } else {
                alert("Gagal memperbarui data");
            }
        } catch (error) {
            console.error("Gagal memperbarui data:", error);
        }
    };
    

    return (
        <>
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-24 mr-14">
                <h1 className="text-2xl font-semibold mb-6">Edit Data Pimpinan</h1>

                <form>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Nama Lengkap"
                            required
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nip" className="block mb-2 text-base font-medium text-gray-900">
                            NIP
                        </label>
                        <input
                            type="text"
                            id="nip"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="NIP"
                            required
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="jabatan" className="block mb-2 text-base font-medium text-gray-900">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            id="jabatan"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Jabatan"
                            required
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                        />
                    </div>
                    <Link to={`/pimpinan`}>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={updatePimpinan}
                        >
                            Simpan
                        </button>
                    </Link>
                </form>
            </main>
        </>
    );
};

export default Edit_pimpinan;
