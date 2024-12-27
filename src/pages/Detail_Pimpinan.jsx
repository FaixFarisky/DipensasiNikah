import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import apis from "../api/penduduk"; // Pastikan API pimpinan sudah benar
import ClearIcon from '@mui/icons-material/Clear';

const Detail_pimpinan = () => {
    const { id } = useParams();
    const [pimpinan, setPimpinan] = useState(null);
  
    useEffect(() => {
      // Panggil API untuk mengambil data pimpinan berdasarkan ID
      apis.getPimpinanById(id)
        .then(response => {
            console.log(response);
            setPimpinan(response.data); // Set data pimpinan
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, [id]);
  
    if (!pimpinan) {
      return <p>Loading data...</p>; // Tampilkan loading jika data belum tersedia
    }
  
    return (
        <div>
            <Sidebar />
            <div className="flex flex-row justify-between ml-72 mt-24">
                <h1 className="text-3xl font-extrabold mt-2">Data : {pimpinan.nama} </h1>
            </div>
            <Link to="/pimpinan">
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
                            {pimpinan.nama}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                NIP
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {pimpinan.nip}
                            </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 text-white">
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                Jabatan
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap ">
                                :
                            </td>
                            <td className="px-6 py-5 font-medium  whitespace-nowrap">
                            {pimpinan.jabatan}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Detail_pimpinan;
