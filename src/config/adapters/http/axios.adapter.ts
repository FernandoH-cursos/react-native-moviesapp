import {HttpAdapter} from './http.adapter';
import axios, {AxiosInstance} from 'axios';

interface Options {
  baseURL: string;
  params: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  //* AxiosInstance es una interfaz de axios que nos permite hacer peticiones http
  private axiosInstance: AxiosInstance;

  //* El constructor recibe un objeto de tipo Options que contiene la url base y los parámetros que se enviarán en cada petición
  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
      params: options.params,
    });
  }

  //* get() es un método que nos permite hacer peticiones http de tipo GET
  async get<T>(
    url: string,
    options?: Record<string, unknown> | undefined,
  ): Promise<T> {
    try {
      const {data} = await this.axiosInstance.get<T>(url, options);

      return data;
    } catch (error) {
      throw new Error(`Error fetching get: ${error}`);
    }
  }

  //* post() es un método que nos permite hacer peticiones http de tipo POST
  async post<T>(
    url: string,
    body: Record<string, unknown>,
    options?: Record<string, unknown> | undefined,
  ): Promise<T> {
    try {
      const {data} = await this.axiosInstance.post<T>(url, body, options);

      return data;
    } catch (error) {
      throw new Error(`Error fetching post: ${error}`);
    }
  }

  async put<T>(
    url: string,
    body: Record<string, unknown>,
    options?: Record<string, unknown> | undefined,
  ): Promise<T> {
    try {
      const {data} = await this.axiosInstance.put<T>(url, body, options);

      return data;
    } catch (error) {
      throw new Error(`Error fetching put: ${error}`);
    }
  }

  async delete<T>(
    url: string,
    options?: Record<string, unknown> | undefined,
  ): Promise<T> {
    try {
      const {data} = await this.axiosInstance.delete<T>(url, options);

      return data;
    } catch (error) {
      throw new Error(`Error fetching delete: ${error}`);
    }
  }
}
