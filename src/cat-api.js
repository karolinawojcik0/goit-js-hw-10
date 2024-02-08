export { fetchCats, fetchCatsByID, url };
import axios from 'axios';

const url = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] =
  'live_IJMu9lxP10XA8y5Y4TndMu7UMriiz77cwCg3K44cOfaHGnilTrzxDohQd3qNfwLq';

const fetchCats = () => {
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const fetchCatsByID = id => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};