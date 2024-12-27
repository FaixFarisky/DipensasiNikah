import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import logo from "../img/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Transaksic = () => {
    const [formData, setFormData] = useState(null);
    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector(".cetak");

        if (!capture) {
            console.error("Elemen tidak ditemukan!");
            return;
        }

        setLoader(true);

        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF("p", "mm", "a4");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();

            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save("dispensasi.pdf");
        }).catch((error) => {
            console.error("Error saat menangkap elemen:", error);
            setLoader(false);
        });
    };

    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        } else {
            alert("Data tidak ditemukan. Silakan kembali ke halaman sebelumnya.");
        }
    }, []);

    if (!formData) {
        return <p className="text-center text-lg mt-10">Memuat data...</p>;
    }

    const { calonSuami, calonIstri, wali, tanggal_pernikahan } = formData;

    // Format tanggal surat
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    return (
        <div className="p-4 mt-4 border border-gray-300 rounded-lg shadow-lg ml-80 mr-24 w-[70rem]">
            <div className="cetak">
                <div className="flex items-center justify-center border-b border-black pb-2 ml-16 mt-16 mr-10">
                    <img src={logo} alt="Logo Pemerintah" className="h-40 w-30 mr-2" />
                    <div className="text-center flex-grow -ml-20">
                        <h1 className="text-3xl">PEMERINTAH KABUPATEN BANYUWANGI</h1>
                        <h1 className="text-4xl font-bold">KANTOR KECAMATAN SINGOJURUH</h1>
                        <p className="text-xl">Jalan Songojuruh - Gendoh No. 85 Singojuruh</p>
                        <p className="text-xl">Telepon: (0333) 631002 Faks: (0333) 636359</p>
                        <p className="text-lg underline">
                            Email: singojuruhkecamatan@gmail.com Website: www.banyuwangikab.go.id
                        </p>
                    </div>
                </div>
                <div className="ml-16 mr-10 mt-10">
                    <h2 className="text-xl font-bold text-center mb-2 underline">SURAT DISPENSASI NIKAH</h2>
                    <p className="text-lg text-center mb-4">Nomor : 848/ ... /429.508/2023</p>
                    <div className="text-xl text-justify mb-4 mr-16">
                        <p className="indent-20 text-justify">
                            Yang bertanda tangan dibawah ini, Camat Singojuruh, Kabupaten Banyuwangi, dengan ini atas nama Bupati Banyuwangi, memenuhi Undang – Undang Nomor 1 Tahun 1974 sebagaimana diubah dengan Undang-undang No 16 Tahun 2019 dan Peraturan Pemerintah Nomor 9 Tahun 1975 pasal 3 ayat 3, memberikan dispensasi nikah bagi pernikahan yang kurang dari 10 hari kerja, kepada:
                        </p>
                    </div>
                    {[calonSuami, calonIstri, wali].map((penduduk, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-lg font-bold mb-2">{`(${index + 1}) ${penduduk.nama}`}</p>
                            <p className="text-lg">NIK: {penduduk.nik}</p>
                            <p className="text-lg">Tempat, Tanggal Lahir: {penduduk.tempat_tanggal_lahir}</p>
                            <p className="text-lg">Bin: {penduduk.bin}</p>
                            <p className="text-lg">
                                Alamat: {`${penduduk.dusun}, ${penduduk.desa}, ${penduduk.kecamatan}, ${penduduk.kabupaten}`}
                            </p>
                        </div>
                    ))}
                    <p className="text-lg mb-4">Tanggal Pernikahan: {`${tanggal_pernikahan.tanggal}-${tanggal_pernikahan.bulan}-${tanggal_pernikahan.tahun}`}</p>
                    <p className="text-lg mb-4">
                        Demikian surat dispensasi nikah ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>
                <div className="text-right mt-10 mr-16">
                    <p className="text-lg">Banyuwangi, {formattedDate}</p>
                    <p className="text-lg">Camat Singojuruh</p>
                </div>
            </div>
            <button
                onClick={downloadPDF}
                disabled={loader}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                {loader ? "Sedang memproses..." : "Unduh PDF"}
            </button>
        </div>
    );
};

export default Transaksic;
