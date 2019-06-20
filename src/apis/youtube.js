import axios from 'axios';
const KEY = 'AIzaSyA83GSDeBt0bRzP53TTlRz_4xOaiHD_2fE';
    
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 15,
        key: KEY
    }
})