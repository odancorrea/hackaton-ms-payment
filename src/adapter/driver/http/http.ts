import axios from "axios"
import IHttp from "../../../core/domain/repositories/iHttp"

export default class Http implements IHttp {
    async post (url: string, data: any): Promise<any> {
        const result = await axios.post(url, data)
        return result.data
    }

    async put (url: string, data: any): Promise<any> {
        const result = await axios.put(url, data)
        return result.data
    }
}