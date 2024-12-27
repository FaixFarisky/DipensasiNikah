import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Pimpinan = () => {
    const [listPimpinan, setListPimpinan] = useState([]);
    const [selectedPimpinan, setSelectedPimpinan] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Mendapatkan data selectedPenduduk dari state sebelumnya
    const { selectedPenduduk } = location.state || {};

    const getListPimpinan = async () => {
        try {
            const response = await axios.get("http://localhost/dispensasi_api/getPimpinan.php"); // Mengganti dengan endpoint API PHP
            setListPimpinan(response.data); // Sesuaikan dengan format respons API PHP
            console.log(response.data); // Melihat response API di console
        } catch (error) {
            console.error("Error fetching pimpinan:", error);
            alert("Terjadi kesalahan saat mengambil data pimpinan.");
        }
    };

    useEffect(() => {
        getListPimpinan();
    }, []);

    const handleSelectPimpinan = (pimpinan) => {
        // Memilih satu data pimpinan
        setSelectedPimpinan(pimpinan);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (confirmDelete) {
            try {
                console.log("Deleting ID:", id); // Menampilkan ID untuk memastikan
                const response = await axios.delete(`http://localhost/dispensasi_api/deletePimpinan.php?id=${id}`);
                console.log(response.data); // Cek respon dari server
                alert("Data berhasil dihapus!");
                getListPimpinan(); // Refresh daftar pimpinan
            } catch (error) {
                console.error("Error deleting pimpinan:", error);
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="flex flex-row justify-between ml-72 mt-24">
                <h1 className="text-3xl font-extrabold mt-2">Data Pimpinan</h1>
            </div>
            <div className="container mx-auto">
                {/* Header bagian atas tabel */}
                <table className="text-center border-collapse w-9/12 ml-72 mt-2 bg-gray-800 rounded-xl">
                    <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-900 text-black font-bold">
                        <tr>
                            <td className="px-6 py-3 font-medium">No</td>
                            <td className="px-6 py-3 font-medium">NIP</td>
                            <td className="px-6 py-3 font-medium">Nama</td>
                            <td className="px-6 py-3 font-medium">Jabatan</td>
                            <td className="px-6 py-3 font-medium">Detail</td>
                            <td className="px-6 py-3 font-medium">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listPimpinan.map((pimpinans, idx) => (
                            <tr key={pimpinans.id} className="border-b dark:border-gray-700 text-white">
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4">{pimpinans.nip}</td>
                                <td className="px-6 py-4">{pimpinans.nama}</td>
                                <td className="px-6 py-4">{pimpinans.jabatan}</td>
                                <td className="px-6 py-4">
                                    <Link to={`/detail_pimpinan/${pimpinans.id}`} className="border bg-yellow-500 hover:bg-yellow-600 rounded-lg p-1 inline-block">
                                        <InfoOutlinedIcon sx={{ fontSize: 35 }}>Detail</InfoOutlinedIcon>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <Link to={`/edit_pimpinan/${pimpinans.id}`} className="border rounded-lg p-2 inline-block bg-blue-500 hover:bg-blue-700">
                                        <BorderColorIcon>Edit</BorderColorIcon>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(pimpinans.id)} 
                                        className="border rounded-lg p-2 inline-block bg-red-500 hover:bg-red-700"
                                    >
                                        <DeleteIcon>Hapus</DeleteIcon>
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

export default Pimpinan;
