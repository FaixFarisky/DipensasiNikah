import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost/dispensasi_api", // Ganti dengan URL folder API PHP Anda
});

const apis = {
    // CRUD untuk Penduduk
    getAllpenduduk: () => api.get('/getPenduduk.php'), // Mengambil semua data penduduk
    getPendudukById: (id) => api.get(`/getPendudukById.php?id=${id}`), // Ambil penduduk berdasarkan ID
    deletePenduduk: (id) => api.delete(`/deletePenduduk.php?id=${id}`), // Hapus penduduk berdasarkan ID
    createPenduduk: (pendudukNew) => api.post('/createPenduduk.php', pendudukNew), // Tambahkan penduduk baru
    updatePenduduk: (id, pendudukUp) => api.put(`/updatePenduduk.php?id=${id}`, pendudukUp), // Update data penduduk
    getPendudukByNik: (nik) => api.get(`/getPendudukByNik.php?nik=${nik}`), // Ambil penduduk berdasarkan NIK

    // CRUD untuk Pimpinan
    getAllpimpinan: () => api.get('/getPimpinan.php'), // Mengambil semua data pimpinan
    getPimpinanById: (id) => api.get(`/getPimpinanById.php?id=${id}`), // Ambil pimpinan berdasarkan ID
    deletePimpinan: (id) => api.delete(`/deletePimpinan.php?id=${id}`), // Hapus pimpinan berdasarkan ID
    createPimpinan: (pimpinanNew) => api.post('/createPimpinan.php', pimpinanNew), // Tambahkan pimpinan baru
    updatePimpinan: (id, pimpinanUp) => api.put(`/updatePimpinan.php?id=${id}`, pimpinanUp), // Update data pimpinan

    // Endpoint untuk Login dan Register
    register: (username, email, password) => {
        return api.post('/register.php', {
            username,
            email,
            password,
        }); // Registrasi pengguna baru
    },
    login: (username, password) => {
        return api.post('/login.php', {
            username,
            password,
        }); // Login pengguna
    },
};

export default apis;
