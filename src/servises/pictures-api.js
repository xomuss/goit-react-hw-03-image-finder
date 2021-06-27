import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '21316694-ed9f7523baf223edee906888b&image_type=photo';

const fetchPictures = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `${URL}/?q=${searchQuery}&page=${currentPage}&key=${KEY}&orientation=horizontal&per_page=12`,
    )
    .then(res => res.data.hits);
};

export default { fetchPictures };
