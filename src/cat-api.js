import axios from "axios";
axios.defaults.headers.common["x-api-key"] =
    "live_xHKc8FIBjkm1E18PddbFIzDWm1A3cqdNob17m8SynQtgQRslGe43lBLgRPbecUZK";



export async function fetchBreeds() {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
}

export async function fetchCatByBreed(breedId) {
    const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
}
