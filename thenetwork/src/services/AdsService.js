import { Ad } from "@/models/Ad.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";



class AdsService {
    async getAds() {
        const res = await api.get('api/ads');
        console.log("getAds:", res.data);
        AppState.ads = res.data.map(ad => new Ad(ad));
    }

    /**
     * @param {number} adNumber
     */
    async getAdsByNumber(adNumber) {
        const res = await api.get(`api/ads?count=${adNumber}`);
        console.log("getAdsByNumber:", res.data);        
        AppState.ads = res.data.map(ad => new Ad(ad));
    }
}

export const adsService = new AdsService();