import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import logo from '../img/logo.png';

const Transaksi = () => {
    const [formData, setFormData] = useState(null);

    // Mengambil data dari localStorage saat komponen dimuat
    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData)); // Parse data dari localStorage
        } else {
            alert('Data tidak ditemukan. Silakan kembali ke halaman sebelumnya.');
        }
    }, []);

    if (!formData) {
        return <p className="text-center text-lg mt-10">Memuat data...</p>;
    }

    const { calonSuami, calonIstri, wali } = formData;

    return (
        <div>
            <Sidebar />
            <div className="p-4 mt-4 border border-gray-300 rounded-lg shadow-lg ml-80 mr-24 w-[70rem]">
                {/* Header Surat */}
                <div className="flex items-center justify-center border-b border-black pb-4">
                    <img src={logo} alt="Logo Pemerintah" className="h-40 w-auto mr-6" />
                    <div className="text-center flex-grow">
                        <h1 className="text-3xl font-bold">PEMERINTAH KABUPATEN BANYUWANGI</h1>
                        <h2 className="text-4xl font-bold">KANTOR KECAMATAN SINGOJURUH</h2>
                        <p className="text-xl">Jalan Songojuruh - Gendoh No. 85 Singojuruh</p>
                        <p className="text-xl">Telepon: (0333) 631002 | Faks: (0333) 636359</p>
                        <p className="text-lg underline">
                            Email: singojuruhkecamatan@gmail.com | Website: www.banyuwangikab.go.id
                        </p>
                    </div>
                </div>

                {/* Judul Surat */}
                <div className="text-center my-6">
                    <h2 className="text-xl font-bold underline">SURAT DISPENSASI NIKAH</h2>
                    <p className="text-lg">Nomor: 123/Dispensasi/2024</p>
                </div>

                {/* Isi Surat */}
                <div className="text-xl mb-6">
                    <p className="indent-10 mb-4">
                        Yang bertanda tangan di bawah ini, Camat Singojuruh, Kabupaten Banyuwangi, memberikan dispensasi nikah kepada:
                    </p>
                </div>

                {/* Data Penduduk */}
                {[calonSuami, calonIstri, wali].map((penduduk, index) => (
                    <div key={index} className="mb-6">
                        <div className="flex items-center mb-2">
                            <span className="text-lg">{index + 1}.</span>
                            <p className="text-lg font-bold ml-4">{['Calon Suami', 'Calon Istri', 'Wali'][index]}</p>
                        </div>
                        <div className="ml-6">
                            <p className="text-lg">Nama: <strong>{penduduk.nama || '-'}</strong></p>
                            <p className="text-lg">NIK: {penduduk.nik || '-'}</p>
                            <p className="text-lg">Tempat, Tanggal Lahir: {penduduk.tempat_tanggal_lahir || '-'}</p>
                            <p className="text-lg">BIN: {penduduk.bin || '-'}</p>
                            <p className="text-lg">
                                Alamat: Dusun/Link: {penduduk.dusun || '-'}, Desa: {penduduk.desa || '-'}, Kecamatan: {penduduk.kecamatan || '-'}, Kabupaten: {penduduk.kabupaten || '-'}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Penutup Surat */}
                <div className="mt-6">
                    <p className="text-lg indent-10">
                        Demikian surat dispensasi nikah ini dibuat untuk dipergunakan sebagaimana mestinya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Transaksi;
