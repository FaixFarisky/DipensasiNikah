import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios";

const Home = () => {
    const [listPenduduk, setListPenduduk] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fungsi untuk mendapatkan data penduduk
    const getListPenduduk = async () => {
        try {
            const response = await axios.get("http://localhost/dispensasi_api/getPenduduk.php");
            setListPenduduk(response.data);
            console.log(response.data); // Debugging
        } catch (error) {
            console.error("Error fetching penduduk:", error);
            alert("Terjadi kesalahan saat mengambil data penduduk.");
        }
    };

    // Panggil fungsi saat komponen di-mount
    useEffect(() => {
        getListPenduduk();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (confirmDelete) {
            try {
                console.log("Deleting ID:", id); // Menampilkan ID untuk memastikan
                const response = await axios.delete(`http://localhost/dispensasi_api/deletePenduduk.php?id=${id}`);
                console.log(response.data); // Cek respon dari server
                alert("Data berhasil dihapus!");
                getListPenduduk(); // Refresh daftar penduduk
            } catch (error) {
                console.error("Error deleting penduduk:", error);
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="flex flex-row justify-between ml-72 mt-24">
                <h1 className="text-3xl font-extrabold mt-2">Data Penduduk</h1>
            </div>

            <div className="max-w-md mx-auto mt-3 mb-5">
                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder="Cari Nama"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="container mx-auto">
                <table className="text-center border-collapse w-9/12 ml-72 mt-5 bg-gray-800 rounded-xl">
                    <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-900 text-black font-bold">
                        <tr>
                            <td className="px-6 py-3 font-medium">No</td>
                            <td className="px-6 py-3 font-medium">NIK</td>
                            <td className="px-6 py-3 font-medium">Nama</td>
                            <td className="px-6 py-3 font-medium">Detail</td>
                            <td className="px-6 py-3 font-medium">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listPenduduk
                            .filter((penduduk) => penduduk.nama.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((penduduk, idx) => (
                                <tr key={penduduk.id} className="border-b dark:border-gray-700 text-white">
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{penduduk.nik}</td>
                                    <td className="px-6 py-4">{penduduk.nama}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/detail/${penduduk.id}`} className="border bg-yellow-500 hover:bg-yellow-600 rounded-lg p-1 inline-block">
                                            <InfoOutlinedIcon sx={{ fontSize: 35 }} />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link to={`/edit_data/${penduduk.id}`} className="border rounded-lg p-2 inline-block bg-blue-500 hover:bg-blue-700">
                                            <BorderColorIcon /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(penduduk.id)}
                                            className="border rounded-lg p-2 inline-block bg-red-500 hover:bg-red-700"
                                        >
                                            <DeleteIcon /> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
