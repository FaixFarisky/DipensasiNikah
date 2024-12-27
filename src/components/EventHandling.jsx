import {useState} from "react"

const EventHandling = () => {
    const [name, setName] = useState ('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    const [selectedOption, setSelectedOption] = useState ('S1 Teknik Informatika');

    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    const [gender, setGender] = useState ('Pria');

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleClick() {
        alert('Formulir Sudah Terkirim');
    }

    return (
        <>
        <div className="mt-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nama:</label>
            <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Masukan Nama Anda"
                    value={name}
                    onChange={handleNameChange}/>
            <p className="text-gray-600 text-xs italic mt-2">Nama Anda : {name} </p>
        </div>

        <div className="mt-8">
            <label htmlFor="program-studi" className="block text-gray-700 font-bold mb-2">Program Studi:</label>
            <select id="program-studi" 
                    className="shadow appearance-none border rounded w-full py-2 px-3
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                    <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                    <option value="D3 Manajemen Informatika">D3 Manajemen Informatika</option>
            </select>
            <p className="text-gray-600 text-xs italic mt-2">Prodi : {selectedOption} </p>
        </div>

        <div className="mt-8">
            <span className="block text-gray-700 font-bold mb-2">Gender:</span>
            <div className="flex flex-row items-center">
                <label className="inline-flex items-center mr-6">
                    <input type="radio" className="form-radio text-indigo-600" name="gender"
                            value="Pria" checked={gender === 'Pria'} onChange={handleGenderChange}/>
                    <span className="ml-2">Pria</span>
                </label>
                <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-indigo-600" name="gender"
                            value="Wanita" checked={gender === 'Wanita'} onChange={handleGenderChange}/>
                    <span className="ml-2">Wanita</span>
                </label>
            </div>
            <p className="text-gray-600 text-xs italic mt-2">Gender : {gender} </p>
        </div>

        <div className="container mt-4 ml-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}>Kirim!</button>
        </div>
        </>
    )
}

export default EventHandling