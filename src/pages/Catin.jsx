import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Catin = () => {
    const navigate = useNavigate();

    // State untuk menyimpan daftar pimpinan dan pimpinan yang dipilih
    const [listPimpinan, setListPimpinan] = useState([]);
    const [selectedPimpinan, setSelectedPimpinan] = useState({
        nama: "",
        nip: "",
        jabatan: "",
    });

    const [formData, setFormData] = useState({
        calonSuami: {
            nik: "",
            nama: "",
            tempat_tanggal_lahir: "",
            bin: "",
            dusun: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            status_pernikahan: "",
        },
        calonIstri: {
            nik: "",
            nama: "",
            tempat_tanggal_lahir: "",
            bin: "",
            dusun: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            status_pernikahan: "",
        },
        wali: {
            nik: "",
            nama: "",
            tempat_tanggal_lahir: "",
            bin: "",
            dusun: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            status_pernikahan: "",
        },
        tanggalPernikahan: new Date().toISOString().split("T")[0],
        nomorSurat: "",
    });

    const [isExisting, setIsExisting] = useState({
        calonSuami: false,
        calonIstri: false,
        wali: false,
    });

    // Fungsi untuk mendapatkan data pimpinan
    const fetchPimpinan = async () => {
        try {
            const response = await fetch("http://localhost/dispensasi_api/getPimpinan.php");
            const data = await response.json();
            setListPimpinan(data);
        } catch (error) {
            console.error("Error fetching data pimpinan:", error);
        }
    };

    useEffect(() => {
        fetchPimpinan();
    }, []);

    const handleInputChange = (key, field, value) => {
        if (key === "tanggalPernikahan" || key === "nomorSurat") {
            setFormData({
                ...formData,
                [key]: value,
            });
        } else {
            setFormData({
                ...formData,
                [key]: {
                    ...formData[key],
                    [field]: value,
                },
            });
        }
    };

const searchNik = async (key) => {
    const nik = formData[key].nik;
    if (!nik) {
        alert("Masukkan NIK terlebih dahulu.");
        return;
    }

    try {
        const response = await fetch(`http://localhost/dispensasi_api/getPendudukByNik.php?nik=${nik}`);
        const data = await response.json();

        if (data && !data.error) { // Pastikan data valid dan tidak ada error
            setFormData({
                ...formData,
                [key]: {
                    ...formData[key],
                    ...data, // Langsung gunakan data
                },
            });
            setIsExisting({ ...isExisting, [key]: true });
        } else {
            setIsExisting({ ...isExisting, [key]: false });
            alert(data.error || "NIK tidak terdaftar.");
        }
    } catch (error) {
        console.error("Error searching NIK:", error);
    }
};


    const handleSubmit = async () => {
        if (!selectedPimpinan || !selectedPimpinan.nama) {
            alert("Pilih pimpinan terlebih dahulu.");
            return;
        }
        if (!formData.nomorSurat) {
            alert("Nomor surat harus diisi.");
            return;
        }

        try {
            localStorage.setItem("selectedPimpinan", JSON.stringify(selectedPimpinan));
            localStorage.setItem("nomorSurat", formData.nomorSurat);
            localStorage.setItem("tanggalData", JSON.stringify({ tanggalPernikahan: formData.tanggalPernikahan }));

            const pendingPromises = [];
            for (const key of Object.keys(formData)) {
                if (key !== "tanggalPernikahan" && key !== "nomorSurat" && !isExisting[key]) {
                    pendingPromises.push(fetch("http://localhost/dispensasi_api/createPenduduk.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData[key]),
                    }));
                }
            }
            await Promise.all(pendingPromises);

            localStorage.setItem("formData", JSON.stringify(formData));

            alert("Data berhasil disimpan.");
            navigate("/transaksic");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

    const renderDateInput = (title, key) => (
        <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData[key]} // Ambil langsung dari state
                onChange={(e) => handleInputChange(key, null, e.target.value)} // Update nilai langsung
            />
        </div>
    );    

    const renderForm = (title, key) => (
        <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="flex items-center mb-3">
                <div className="flex-grow">
                    <label className="block mb-2 text-base font-medium text-gray-900">
                        NIK
                    </label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Masukkan NIK"
                        value={formData[key].nik}
                        onChange={(e) => handleInputChange(key, "nik", e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 ml-2 mt-8"
                    onClick={() => searchNik(key)}
                >
                    Cari
                </button>
            </div>
            {["nama", "tempat_tanggal_lahir", "bin", "dusun", "desa", "kecamatan", "kabupaten", "provinsi", "status_pernikahan"].map(
                (field) => (
                    <div className="mb-3" key={field}>
                        <label className="block mb-2 text-base font-medium text-gray-900">
                            {field.replace(/_/g, " ")}
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={field.replace(/_/g, " ")}
                            value={formData[key][field]}
                            onChange={(e) =>
                                handleInputChange(key, field, e.target.value)
                            }
                        />
                    </div>
                )
            )}
        </div>
    );
    

    return (
        <>
            <Sidebar />
            <div className="flex-1 p-6 bg-blue-500 rounded-xl ml-80 mt-24 mr-14 flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-black">
                    Form Data Pernikahan
                </h1>
            </div>
    
            <form>
                <div className="flex items-center me-3">
                    <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-10 mr-14">
                        {renderForm("Data Calon Suami", "calonSuami")}
                    </div>
                    <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-10 mt-10 mr-14">
                        {renderForm("Data Calon Istri", "calonIstri")}
                    </div>
    
                    <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-10 mt-10 mr-14">
                        {renderForm("Data Wali Nikah", "wali")}
                    </div>
                </div>
    
                <div className="flex">
                    <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-10 mr-14">
                        {renderDateInput("Tanggal Pernikahan", "tanggalPernikahan")}
                    </div>
                </div>
    
                {/* Form Select untuk memilih Pimpinan */}
                <div className="flex items-center justify-center mt-10">
                    <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mr-14">
                        <label className="block mb-2 text-gray-900 text-lg font-bold">
                            Pilih Pimpinan
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={selectedPimpinan.nama}
                            onChange={(e) => {
                                const selected = listPimpinan.find(
                                    (pimpinan) => pimpinan.nama === e.target.value
                                );
                                setSelectedPimpinan({
                                    nama: selected?.nama || "",
                                    nip: selected?.nip || "",
                                    jabatan: selected?.jabatan || "",
                                });
                            }}
                        >
                            <option value="">Pilih salah satu...</option>
                            {listPimpinan.map((pimpinan) => (
                                <option key={pimpinan.id} value={pimpinan.nama}>
                                    {pimpinan.nama} - {pimpinan.jabatan}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
    
                <div className="flex-1 p-6 bg-gray-200 rounded-xl ml-80 mt-10 mr-14">
                    <h2 className="text-lg font-bold mb-4">Nomor Surat</h2>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Masukkan Nomor Surat"
                        value={formData.nomorSurat}
                        onChange={(e) => handleInputChange("nomorSurat", null, e.target.value)}
                    />
                </div>
    
                <div className="flex justify-center mt-10 mb-20 ml-56">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={handleSubmit}
                    >
                        Simpan dan Lanjutkan
                    </button>
                </div>
            </form>
        </>
    );
    
};

export default Catin;
