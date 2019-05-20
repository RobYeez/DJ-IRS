import axios from 'axios';
const KEY = 'AIzaSyBMxjR2X4WOIn6jgG5MFH_1g-4f5Jo0bQI';
    
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 15,
        key: KEY
    }
})