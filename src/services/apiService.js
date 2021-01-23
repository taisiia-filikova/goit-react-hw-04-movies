import axios from 'axios';

const apiService = async (query, page) => {
  const API_KEY = '19086607-f63ea5bac9dbca697b9469f63';
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};

export default apiService;
