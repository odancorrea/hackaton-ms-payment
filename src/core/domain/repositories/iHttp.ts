export default interface IHttp {
  post(url: string, data: any): Promise<any>
  put(url: string, data: any): Promise<any>
}