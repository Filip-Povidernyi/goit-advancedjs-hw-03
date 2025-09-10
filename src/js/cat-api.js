import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
    "live_W5uXEY0J2iWK60s6RGVyuG1PbAxhLRUZaeADGYiQQ3GsqYAJFUxiNXTVAeIM2Tro";

export const breeds = async () => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        return response.data;
    } catch (error) {
        console.error("Error fetching breeds:", error);
        throw error;
    }
};

export const catByBreed = async (breedId) => {
    try {
        const response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&include_breeds=true`
        );
        return response.data[0];
    } catch (error) {
        console.error("Error fetching cat by breed:", error);
        throw error;
    }
}
