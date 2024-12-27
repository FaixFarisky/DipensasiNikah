import React from 'react';

import logo from '../img/logo.png';
// import { useLocation } from 'react-router-dom';
// import { Document, Packer, Paragraph, TextRun ,ImageRun ,Table,TableRow, TableCell, WidthType, AlignmentType} from 'docx';
// import fileDownload from 'js-file-download';
import { useEffect, useState, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { render } from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Transaksic = () => {
    // const { state } = useLocation();
    const [formData, setFormData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [nomorSurat, setNomorSurat] = useState(0);
    const [selectedPimpinan, setSelectedPimpinan] = useState(null);

    const [tanggalData, setTanggalData] = useState({
        tanggalPernikahan: "",
        // tanggalSurat: "",
    });

    useEffect(() => {
        // Ambil nomor surat yang sudah diinput dari halaman sebelumnya
        const nomorSuratFromPrevPage = localStorage.getItem("nomorSurat");
        if (nomorSuratFromPrevPage) {
            setNomorSurat(nomorSuratFromPrevPage);  // Set nomor surat yang diambil dari localStorage
        }
    }, []);

    useEffect(() => {
        // Mengambil data pimpinan yang dipilih dari localStorage
        const storedPimpinan = localStorage.getItem("selectedPimpinan");
        if (storedPimpinan) {
            setSelectedPimpinan(JSON.parse(storedPimpinan));
        }
    }, []);

    useEffect(() => {
        const savedTanggalData = JSON.parse(localStorage.getItem("tanggalData"));
        if (savedTanggalData) {
            setTanggalData(savedTanggalData);
        }
    }, []);

    const downloadPDF = () => {
        // Pastikan elemen yang ingin di-capture benar
        const capture = document.querySelector(".cetak");
    
        // Cek jika elemen ada sebelum melanjutkan
        if (!capture) {
            console.error("Elemen tidak ditemukan!");
            return;
        }
    
        setLoader(true); // Menyalakan loading indicator
    
        // Menggunakan html2canvas untuk merender elemen ke dalam canvas
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('image/png'); // Menyimpan gambar dalam format PNG
            const doc = new jsPDF('p', 'mm', 'a4'); // Membuat objek jsPDF dengan format A4
            const componentWidth = doc.internal.pageSize.getWidth(); // Lebar halaman
            const componentHeight = doc.internal.pageSize.getHeight(); // Tinggi halaman
    
            // Menambahkan gambar ke PDF, menyesuaikan dengan ukuran halaman A4
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    
            setLoader(false); // Menonaktifkan loading indicator setelah proses selesai
    
            // Menyimpan file PDF
            doc.save('dispensasi.pdf');
        }).catch(error => {
            console.error("Error saat menangkap elemen:", error);
            setLoader(false); // Menonaktifkan loading indicator jika terjadi error
        });
    };

    // useEffect(() => {
    //     // Ambil nomor surat terakhir dari local storage
    //     const lastNumber = localStorage.getItem("lastSuratNumber");
    //     setNomorSurat(lastNumber ? parseInt(lastNumber) + 1 : 1);
    //   }, []);

    const handlePrint = () => {
        window.print();
    };


      const handleCombinedActions = () => {
        console.log("handleCombinedActions called");
        downloadPDF();
        handlePrint();
    };

    const handleResetNomorSurat = () => {
        localStorage.removeItem("lastSuratNumber"); // Menghapus data dari localStorage
        setNomorSurat(1); // Mengatur ulang nomor surat menjadi 1
    };
    
    

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
    const { calonSuami, calonIstri, } = formData;
    const {wali} = formData;
    const roles = ["Calon Suami", "Calon Istri", "Tanggal Pernikahan"];
    const dino = ["Nama Wali"]

    // Format tanggal surat
    const getMonthName = (monthNumber) => {
        const monthNames = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[monthNumber - 1]; // -1 karena indeks array mulai dari 0
    };

        // Format hari surat
        const getDayName = (dateString) => {
            const dayNames = [
                "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
            ];
            const date = new Date(dateString);
            return dayNames[date.getDay()];
        };
    
    // Format tanggal surat
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${getMonthName(currentDate.getMonth() + 1)} ${currentDate.getFullYear()}`;
    
    const formatDateWithDay = (dateString) => {
        const dayName = getDayName(dateString); // Nama hari
        const [year, month, day] = dateString.split('-');
        const monthName = getMonthName(parseInt(month)); // Nama bulan
        return `${dayName}, ${day} ${monthName} ${year}`;
    };
    
    
    const formattedTanggalPernikahan = formatDateWithDay(tanggalData.tanggalPernikahan);

    
    return (

        <div className='p-4 mt-4 border border-gray-300 rounded-lg shadow-lg ml-80 mr-24 w-[70rem]'>
        <div className='cetak mb-20'>
            <div className="flex items-center justify-center ml-16 mt-16 mr-10">
                <img src={logo} alt="Logo Pemerintah" className="h-40 w-30 mr-2 mt-6" />
                <div className="text-center flex-grow -ml-20">
                    <h1 className="text-2xl">PEMERINTAH KABUPATEN BANYUWANGI</h1>
                    <h1 className="text-3xl font-bold">KANTOR KECAMATAN SINGOJURUH</h1>
                    <p className="text-xl">Jalan Singojuruh - Gendoh No. 85 Singojuruh</p>
                    <p className="text-xl">Telepon: (0333) 631002 Faks: (0333) 636359</p>
                    <p className="text-lg underline">
                        Email: singojuruhkecamatan@gmail.com Website: www.banyuwangikab.go.id
                    </p>
                </div>
            </div>
            <p className='font-extrabold'>____________________________________________________________________________________________________________________________________________________________________</p>
            <div className="ml-16 mr-10 mt-5">
                <h2 className="text-xl font-bold text-center mb-2 underline">SURAT DISPENSASI NIKAH</h2>
                <p className="text-lg text-center mb-4">Nomor : 848/{nomorSurat}/429.508/{new Date().getFullYear()}</p>
                <div className="text-xl text-justify mb-4 mr-16">
                    <p className='indent-20 text-lg text-justify'>
                        Yang bertanda tangan dibawah ini, Camat Singojuruh, Kabupaten Banyuwangi, dengan ini atas nama Bupati Banyuwangi, memenuhi Undang – Undang Nomor 1 Tahun 1974 sebagaimana diubah dengan Undang-undang No 16 Tahun 2019 dan Peraturan Pemerintah Nomor 9 Tahun 1975 pasal 3 ayat 3, memberikan dispensasi nikah bagi pernikahan yang kurang dari 10 hari kerja, kepada:
                    </p>
                </div>
                {[calonSuami, calonIstri,].map((penduduk, index) => (
                    <div key={penduduk.id} className="mb-4">
                        <div className='flex'>
                            <h1 className='text-lg'>{index + 1}.</h1>
                            <p className='text-lg font-bold mb-2 ml-12'>{roles[index]}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Nama</p>
                            <p className='text-lg ml-52'>:</p>
                            <p className='text-lg font-bold ml-6'>{penduduk.nama}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>NIK</p>
                            <p className='text-lg ml-[14.2rem]'>:</p>
                            <p className='text-lg ml-6 '> {penduduk.nik}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Tempat, Tanggal Lahir</p>
                            <p className='text-lg ml-[5.2rem]'>:</p>
                            <p className='text-lg ml-6 '> {penduduk.tempat_tanggal_lahir}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>BIN</p>
                            <p className='text-lg ml-[14.2rem]'>:</p>
                            <p className='text-lg ml-6 '>{penduduk.bin}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Alamat</p>
                            <p className='text-lg ml-[12.5rem]'>:</p>
                            <p className='text-lg ml-6 '> Dusun/Link</p>
                            <p className='text-lg ml-[2.3rem]'>:</p>
                            <p className='text-lg ml-6 '>{penduduk.dusun}</p>
                        </div>
                        <div className='flex'>
                            <p className='text-lg ml-[21.5rem] '>Desa</p>
                            <p className='text-lg ml-[5.5rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.desa}</p>
                        </div> 
                        <div className='flex'>
                            <p className='text-lg ml-[21.52rem] '>Kecamatan</p>
                            <p className='text-lg ml-[2.5rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.kecamatan}</p>
                        </div> 
                        <div className='flex'>
                            <p className='text-lg ml-[21.5rem] '>Kabupaten</p>
                            <p className='text-lg ml-[2.6rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.kabupaten}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Status</p>
                            <p className='text-lg ml-[13rem]'>:</p>
                            <p className='text-lg ml-6 '>{penduduk.status_pernikahan}</p>
                        </div>
                    </div>
                ))}
                {[wali].map((penduduk, index) => (
                    <div key={penduduk.id} className="mb-4">
                        <div className='flex'>
                            <h1 className='text-lg'>{index + 3}.</h1>
                            <p className='text-lg font-bold mb-2 ml-12'>{dino[index]}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Nama</p>
                            <p className='text-lg ml-52'>:</p>
                            <p className='text-lg font-bold ml-6'>{penduduk.nama}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>NIK</p>
                            <p className='text-lg ml-[14.2rem]'>:</p>
                            <p className='text-lg ml-6 '> {penduduk.nik}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Tempat, Tanggal Lahir</p>
                            <p className='text-lg ml-[5.2rem]'>:</p>
                            <p className='text-lg ml-6 '> {penduduk.tempat_tanggal_lahir}</p>
                        </div>
                        <div className='flex ml-5'>
                            <p className='text-lg ml-10'>Alamat</p>
                            <p className='text-lg ml-[12.5rem]'>:</p>
                            <p className='text-lg ml-6 '> Dusun/Link</p>
                            <p className='text-lg ml-[2.3rem]'>:</p>
                            <p className='text-lg ml-6 '>{penduduk.dusun}</p>
                        </div>
                        <div className='flex'>
                            <p className='text-lg ml-[21.5rem] '>Desa</p>
                            <p className='text-lg ml-[5.5rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.desa}</p>
                        </div> 
                        <div className='flex'>
                            <p className='text-lg ml-[21.52rem] '>Kecamatan</p>
                            <p className='text-lg ml-[2.5rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.kecamatan}</p>
                        </div> 
                        <div className='flex'>
                            <p className='text-lg ml-[21.5rem] '>Kabupaten</p>
                            <p className='text-lg ml-[2.6rem] '>:</p>
                            <p className='text-lg ml-6 '>{penduduk.kabupaten}</p>
                        </div>
                    </div>
                ))}
                <div className="flex">
                <p className='space-between text-lg mb-2 mr-1'>4. </p>
                 <p className="text-lg ml-10">Tanggal Pernikahan</p>
                 <p className='text-lg ml-[6.5rem] '>:</p>
                 <p className='text-lg ml-6 '>{formattedTanggalPernikahan}</p>
                    {/* <p className="text-lg">Tanggal Surat: {tanggalData.tanggalSurat}</p> */}
                </div>
                <p className="text-lg mb-4 ml-10 mt-4">
                    Demikian surat dispensasi nikah ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
                </p>
                {selectedPimpinan ? (
                <div className="text-right mt-4 mr-16">
                    <p className="text-lg">Singojuruh, {formattedDate}</p>
                    {/* <div>
                        <div className="border p-6 rounded-lg shadow-lg bg-white w-max mx-auto">
                            <p className="text-lg font-bold mr-[50px]">{selectedPimpinan.jabatan}</p>
                            <p className="text-lg font-bold underline mt-16 mr-[140px]">{selectedPimpinan.nama}</p>
                            <p className="text-lg mr-[162px]">Pembina</p>
                            <p className="text-lg mr-[95px]">NIP. {selectedPimpinan.nip}</p>
                        </div>
                    </div> */}
                    <div className='text-right'>
                        <div className='flex ml-[651px]'>
                            <p className='text-lg font-bold ml-6 '>{selectedPimpinan.jabatan}</p>
                        </div>
                        <div className='flex ml-[653px] '>
                            <p className='text-lg font-bold underline mt-16 ml-6 '>{selectedPimpinan.nama}</p>
                        </div>
                        <div className='flex ml-[652px]'>
                            <p className='text-lg ml-6 '>{selectedPimpinan.nip}</p>
                        </div>
                    </div>
                    <div className='p-4 text-white'>.</div>
                </div>
                ):(
                    <div className="flex justify-center mt-10 mb-20">
                    <p className="text-xl">Data pimpinan tidak ditemukan.</p>
                </div> 
                )}
            </div>
        </div>
        <button onClick={handleCombinedActions} disabled={!(loader === false)} className="bg-blue-500 text-white px-4 py-2 rounded">
                {loader ? (
                    <span>Downloading...</span>
                ) : (
                    <span>Download PDF</span>
                )}
            </button>
        
        {/* <div>
        <button
            onClick={handleResetNomorSurat}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
            Reset Nomor Surat
        </button>
        </div> */}

    </div>
    
    );
};

export default Transaksic;
