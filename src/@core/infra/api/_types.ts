import { RequestInit } from "next/dist/server/web/spec-extension/request";

export interface IApiClient {
  token: string;
}
export interface IApiParams<T> {
  payload?: T;
  options?: RequestInit;
}
export interface IApiPayload<T> {
  payload: T;
  options?: RequestInit;
}
