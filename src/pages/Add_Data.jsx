import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios"; // Import axios

const Add_data = () => {
    const [ nama, setNama ] = useState( '' )
    const [ nik, setNik ] = useState( '' )
    const [ tempat_tanggal_lahir, setTtl ] = useState( '' )
    const [ bin, setBin ] = useState( '' )
    const [ dusun, setDusun ] = useState( '' )
    const [ desa, setDesa ] = useState( '' )
    const [ kecamatan, setKecamatan ] = useState( '' )
    const [ kabupaten, setKabupaten ] = useState( '' )
    const [ provinsi, setProvinsi ] = useState( '' )
    const [ status_pernikahan, setStatus ] = useState( '' )

    const clearForm = () => {
        setNama( '' )
        setNik( '' )
        setTtl( '' )
        setBin( '' )
        setDusun( '' )
        setDesa( '' )
        setKecamatan( '' )
        setKabupaten( '' )
        setProvinsi( '' )
        setStatus( '' )
    }

    const addPenduduk = async (e) => {
        e.preventDefault(); // Prevent form default behavior
        if ( !nama || !nik || !tempat_tanggal_lahir || !bin || !dusun || !desa || !kecamatan || !kabupaten || !provinsi || !status_pernikahan ) {

            alert( 'Isi semua kolom' )

        }
        else {
            const pendudukNew = { nama, nik, tempat_tanggal_lahir, bin, dusun, desa, kecamatan, kabupaten, provinsi, status_pernikahan };
            try {
                // Menggunakan axios untuk mengirimkan data ke API
                const response = await axios.post("http://localhost/dispensasi_api/createPenduduk.php", pendudukNew, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data); // Cek respons dari server
                alert('Data penduduk berhasil ditambahkan');
                clearForm();
            } catch (error) {
                console.error(error); // Log error ke console
                alert('Terjadi kesalahan saat menambahkan data');
            }
        }
    };

    return(
        <>
        <Sidebar/>
        <main className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-24 mr-14">
            <h1 className="text-2xl font-semibold mb-6">Tambah Data Penduduk</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nama</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Lengkap" required 
                    value={nama}
                    onChange={(e) => {setNama(e.target.value)}}/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="nik" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">NIK</label>
                    <input type="nik" id="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="NIK" required 
                    value={nik}
                    onChange={(e) => {setNik(e.target.value)}}/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tempat, Tanggal Lahir</label>
                    <input type="text" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tempat, Tanggal Lahir" required 
                    value={tempat_tanggal_lahir}
                    onChange={(e) => {setTtl(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Bin</label>
                    <input type="text" id="bin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bin" required 
                    value={bin}
                    onChange={(e) => {setBin(e.target.value)}}/>
                </div>

                <div className="grid gap-6 mb-3 md:grid-cols-2">
                    <p className="md:col-span-2 text-base font-semibold">Alamat</p> {/* Center the text and span across two columns */}
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dusun/Link.</label>
                        <input type="text" id="dusun" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dusun/RT RW" required 
                        value={dusun}
                    onChange={(e) => {setDusun(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desa/Kel.</label>
                        <input type="text" id="desa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Desa" required 
                        value={desa}
                    onChange={(e) => {setDesa(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kecamatan.</label>
                        <input type="text" id="kecamatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kecamatan" required 
                        value={kecamatan}
                    onChange={(e) => {setKecamatan(e.target.value)}}/>
                    </div>  
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kabupaten.</label>
                        <input type="text" id="kabupaten" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kabupaten" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required 
                        value={kabupaten}
                    onChange={(e) => {setKabupaten(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provinsi.</label>
                        <input type="text" id="kabupaten" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Provinsi" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required 
                        value={provinsi}
                    onChange={(e) => {setProvinsi(e.target.value)}}/>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Status</label>
                    <input type="text" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Status" required 
                    value={status_pernikahan}
                    onChange={(e) => {setStatus(e.target.value)}}/>
                </div>
 
                <Link to="/home">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 mb-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={addPenduduk}>Tambah</button>
                </Link>
            </form>
        </main>
        </>
    )
}

export default Add_data;