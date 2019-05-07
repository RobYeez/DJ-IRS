import axios from 'axios';
const KEY = 'AIzaSyBvkAwQ9WozNOpKZDbfM1ol2w9eadSwh7A';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 15,
        key: KEY
    }
})