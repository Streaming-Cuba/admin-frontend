import axios, {AxiosInstance, AxiosResponse} from "axios";
import Event from "../../types/Event";
import { getToken } from "../../redux/store";
import MediaItem from "../../types/MediaItem";
import Account from "../../types/Account";
import Role from "../../types/Role";
import Vote from "../../types/Vote";
import VideosInfo from "../../types/VideosInfo";

const API_URL = process.env.REACT_APP_API_URL;

class ServerManager {
  apiAxios: AxiosInstance;

  constructor() {
    this.apiAxios = axios.create({
      baseURL: API_URL,
    });

    this.apiAxios.interceptors.response.use(
      function (response) {
        if (response.status === 401) return response;
        return response;
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }

  refreshInstance() {
    this.apiAxios = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<{ token: string }>> {
    let url = `/api/v1/auth/sign-in`;
    return this.apiAxios.post(url, {
      email,
      password,
    });
  }

  uploadFile(file: File, path?: string) {
    let url = `/api/v1/media/file`;
    if (path) url = url + `/${path}`;
    const formData = new FormData();
    formData.append("file", file);
    return this.apiAxios.post<MediaItem>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  createFolder(path: string) {
    let url = `/api/v1/media/folder/${path}`;
    return this.apiAxios.post<MediaItem>(url);
  }

  loadMedia(path?: string) {
    let url = "/api/v1/media/folder";
    if (path) url = url + `/${path}`;
    return this.apiAxios.get<MediaItem[]>(url);
  }

  getAccountInfo(email: string): Promise<AxiosResponse<Account>> {
    let url = `/api/v1/account?email=${email}`;
    return this.apiAxios.get(url);
  }

  getCurrentUserInfo(): Promise<AxiosResponse<Account>> {
    let url = `/api/v1/auth/me`;
    return this.apiAxios.get(url);
  }

  loadVotes(eventIdentifier: string, voteType: string, limit?: number) {
    let url = `/api/v1/event/${eventIdentifier}/votes?type=${voteType}&limit=${limit}`;
    return this.apiAxios.get<Vote[]>(url);
  }

  loadEvents(
    currentPage?: number,
    pageSize?: number
  ): Promise<AxiosResponse<Event[]>> {
    let url = `/api/v1/event`;
    return this.apiAxios.get<Event[]>(url);
  }

  /**
   * Load roles
   * @param currentPage
   * @param pageSize
   * @returns
   */
  loadRoles(currentPage: number, pageSize: number) {
    let url = `/api/v1/account/role`;
    return this.apiAxios.get<Role[]>(url);
  }

  loadEventByIdentifier(identifier: string): Promise<AxiosResponse<Event>> {
    let url = `/api/v1/event/${identifier}`;
    return this.apiAxios.get<Event>(url);
  }

  loadVideosInfo(since: string, until: string): Promise<AxiosResponse<VideosInfo>> {
    let  url = `/api/v1/facebook/videos-info?since=${since}&until=${until}`;
    return this.apiAxios.get<VideosInfo>(url)
  }

  loadAccount() {
    let url = "/api/v1/account?email=admin@streamingcuba.com"
    return this.apiAxios.get(url)
  }

  createAccount(data: {
    email: string,
    password: string,
    name: string,
    lastName: string,
    rolId: number
  }){
    let url = "/api/v1/account"
    return this.apiAxios.post(url, {
      email: data.email,
      password: data.password,
      name: data.name,
      lastName: data.lastName,
      rolesId: [data.rolId]
    })
  }
}

export default ServerManager;
