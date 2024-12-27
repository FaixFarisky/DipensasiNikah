import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import apis from "../api/penduduk";

const DataWali = () => {
    const [nama, setNama] = useState('');
    const [nik, setNik] = useState('');
    const [tempat_tanggal_lahir, setTtl] = useState('');
    const [bin, setBin] = useState('');
    const [dusun, setDusun] = useState('');
    const [desa, setDesa] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kabupaten, setKabupaten] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [status_pernikahan, setStatus] = useState('');
    const [isExisting, setIsExisting] = useState(false);
    const navigate = useNavigate(); // Untuk navigasi ke halaman lain

    const clearForm = () => {
        setNama('');
        setNik('');
        setTtl('');
        setBin('');
        setDusun('');
        setDesa('');
        setKecamatan('');
        setKabupaten('');
        setProvinsi('');
        setStatus('');
        setIsExisting(false);
    };

    const searchNik = async () => {
        if (!nik) {
            alert('Masukkan NIK terlebih dahulu.');
            return;
        }

        try {
            const response = await apis.getPendudukByNik(nik);
            if (response.data.data.length > 0) {
                const data = response.data.data[0].attributes;
                setNama(data.nama);
                setTtl(data.tempat_tanggal_lahir);
                setBin(data.bin);
                setDusun(data.dusun);
                setDesa(data.desa);
                setKecamatan(data.kecamatan);
                setKabupaten(data.kabupaten);
                setProvinsi(data.provinsi);
                setStatus(data.status_pernikahan);
                setIsExisting(true); // Data ditemukan
            } else {
                clearForm();
                setIsExisting(false); // Data tidak ditemukan
                alert('Nik tidak terdaftar')
            }
        } catch (error) {
            console.error('Error searching NIK:', error);
        }
    };

    const handleButtonClick = async () => {
        if (isExisting) {
            // Jika data ada, langsung pindah halaman
            navigate('/riwayat');
        } else {
            // Jika data tidak ada, tambahkan data baru dan pindah halaman
            if (!nama || !nik || !tempat_tanggal_lahir || !bin || !dusun || !desa || !kecamatan || !kabupaten || !provinsi || !status_pernikahan) {
                alert('Isi semua kolom.');
                return;
            }

            const pendudukNew = {
                nama,
                nik,
                tempat_tanggal_lahir,
                bin,
                dusun,
                desa,
                kecamatan,
                kabupaten,
                provinsi,
                status_pernikahan,
            };

            try {
                await apis.createPenduduk(pendudukNew);
                alert('Data berhasil disimpan.');

                const riwayatNew = {
                    nama,
                    nik,
                    tempat_tanggal_lahir,
                    bin,
                    dusun,
                    desa,
                    kecamatan,
                    kabupaten,
                    provinsi,
                    status_pernikahan,
                };

                await apis.createRiwayat(riwayatNew);
                alert('data berhasil disimpan')

                // Menyimpan data ke localStorage
                localStorage.setItem('dataWali', JSON.stringify(pendudukNew));

                navigate('/riwayat'); // Pindah ke halaman lain setelah menyimpan
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    };

    return (
        <>
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-10 mr-14">
                <h1 className="text-2xl font-semibold mb-6">Data Wali</h1>
                <form>
                    <div className="flex items-center mb-3">
                        <div className="flex-grow">
                            <label htmlFor="nik" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">NIK</label>
                            <input
                                type="text"
                                id="nik"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Masukkan NIK"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
                            onClick={searchNik}
                        >
                            Cari
                        </button>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="text" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nama</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Lengkap" required 
                    value={nama}
                    onChange={(e) => {setNama(e.target.value)}}/>
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

                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 mb-5"
                        onClick={handleButtonClick}
                    >
                        {isExisting ? 'Lanjutkan' : 'Tambah dan Lanjutkan'}
                    </button>
                </form>
            </main>
        </>
    );
};

export default DataWali;
