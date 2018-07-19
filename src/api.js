import axios from 'axios';

export function getLocationList(criteria, cancelToken){
    return axios.get("http://internship-proxy.aw.ee:3001/location?query="+criteria.toLowerCase().trim(), {cancelToken: cancelToken})
}

export function getWeatherInformation(woeid, cancelToken){
    return axios.get("http://internship-proxy.aw.ee:3001/location/"+woeid, {cancelToken: cancelToken})
}