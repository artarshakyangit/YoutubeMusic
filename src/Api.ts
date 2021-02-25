import axios from 'axios';

const API_KEY = '';
const MUSIC_ID = '10';
const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {}
  }
  config.params.key = API_KEY
  // config.headers['X-Android-Package'] = 'com.youtubemusic';
  // config.headers['X-Android-Cert'] = '81:3E:86:1D:AA:51:33:7E:1E:C1:E0:2A:68:B3:5E:B0:AB:24:29:5B';
  return config;
}, (error) => Promise.reject(error));

class Api {
  static getTopMusic(nextPageToken: string, regionCode: string = 'RU') {
    const params = {
      part: 'snippet',
      chart: 'Popular Playlists',
      maxResults: 20,
      videoCategoryId: MUSIC_ID,
      regionCode,
      nextPageToken,
    };
    return api.get(`/v3/videos`, {params});
  }

  static searchMusic(search: string, nextPageToken: string, regionCode: string = 'RU') {
    const params = {
      part: 'snippet',
      type: 'music',
      maxResults: 20,
      q: search + '{Jazz}',
      regionCode,
      nextPageToken,
    };
    return api.get(`/v3/search`, {
      params
    });
  }

  static searchPredict(search: string) {
    const params = {
      client: 'firefox',
      ds: 'yt',
      q: search,
    };
    return api.get(`http://suggestqueries.google.com/complete/search`, {params});
  }
}

export default Api;
