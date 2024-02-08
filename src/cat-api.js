import axios from 'axios';

const url = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] =
  'live_IJMu9lxP10XA8y5Y4TndMu7UMriiz77cwCg3K44cOfaHGnilTrzxDohQd3qNfwLq';

const fetchBreeds = () => {
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch cat breeds');
    });
};

const fetchCatByBreed = (breedId) => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch cat information');
    });
};

export { fetchBreeds, fetchCatByBreed, url };
