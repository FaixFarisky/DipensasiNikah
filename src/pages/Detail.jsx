import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import apis from "../api/penduduk"; // Mengimpor API penduduk yang telah diperbarui
import ClearIcon from '@mui/icons-material/Clear';

const Detail = () => {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const [penduduk, setPenduduk] = useState(null); // State untuk menyimpan data penduduk

    useEffect(() => {
        apis.getPendudukById(id)
        .then(response => {
            console.log(response); // Log data respons API untuk memeriksa struktur data
            setPenduduk(response);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [id]);
    

    if (!penduduk) {
        return <p>Loading data...</p>; // Tampilkan loading jika data belum tersedia
    }

    return (
        <div>
            <Sidebar />
            <div className="flex flex-row justify-between ml-72 mt-24">
                <h1 className="text-3xl font-extrabold mt-2">Data : {penduduk.data.nama} </h1>
            </div>
            <Link to="/home">
                <div className="flex justify-start w-9/12 ml-[500px] mt-5">
                    <ClearIcon
                        className="cursor-pointer text-red-500 bg-gray-200 rounded-full p-1 hover:bg-red-500 hover:text-red-100"
                        sx={{ fontSize: 40 }}
                    >
                        Delete
                    </ClearIcon>
                </div>
            </Link>
            <div className="container mx-auto">
                <table className="text-center border-collapse w-9/12 ml-72 mt-5 bg-gray-800 rounded-xl">
                    <tbody>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                Nama
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {penduduk.data.nama}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                NIK
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {penduduk.data.nik}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                Tempat, Tanggal Lahir
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {penduduk.data.tempat_tanggal_lahir}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                Bin
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {penduduk.data.bin}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700">
                            <td className="px-6 py-5 font-medium text-gray-800 whitespace-nowrap">
                                Alamat
                            </td>
                            <td className="px-6 py-5 font-medium text-white whitespace-nowrap">
                                Alamat
                            </td>
                        </tr>
                        <tr className="dark:border-gray-400 text-white">
                            <td className="px-6 py-4 font font-medium pl-5">
                                Dusun/Link.
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap">
                            {penduduk.data.dusun}
                            </td>
                        </tr>
                        <tr className=" dark:border-gray-700 text-white">
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Desa/Kel.
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap">
                            {penduduk.data.desa}
                            </td>
                        </tr>
                        <tr className=" dark:border-gray-700 text-white">
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Kecamatan
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap">
                            {penduduk.data.kecamatan}
                            </td>
                        </tr>
                        <tr className=" dark:border-gray-700 text-white">
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Kabupaten
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap">
                            {penduduk.data.kabupaten}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Provinsi
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-4 font-medium  whitespace-nowrap">
                            {penduduk.data.provinsi}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                Status
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {penduduk.data.status_pernikahan}
                            </td>
                        </tr>
                    </tbody>
                </table>          
            </div>
        </div>
    );
}

export default Detail;
