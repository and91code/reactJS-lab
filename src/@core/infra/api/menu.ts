import { IMenu } from "@/@core/domain/Menu";

import { IApiClient, IApiParams, IApiPayload } from "./_types";
import {
  ApiBaseURL,
  ApiFilterParams,
  ApiNextId,
  ApiOptions,
  ApiParseParams,
} from "./_utils";

import { ICreate, IDelete, IGetAll, IGetById, IUpdate } from "./menu.types";

export const apiMenus = (props: Partial<IApiClient> = {}) => {
  const { token } = props;

  const URL = ApiBaseURL("/menu");

  const get = async ({ payload, options }: IApiParams<IGetAll>) => {
    const { search } = payload ?? {};

    const query = ApiParseParams(ApiFilterParams(search ?? {}));

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "GET" },
    });

    const response = await fetch(`${URL}${query}`, optionsCurrent);

    const data = (await response.json()) as IMenu[];

    return { status: response.status, data };
  };

  const getId = async ({ payload, options }: IApiParams<IGetById>) => {
    const { id } = payload ?? {};

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "GET" },
    });

    const response = await fetch(`${URL}/${id}`, optionsCurrent);

    const data = (await response.json()) as IMenu;

    return { status: response.status, data };
  };

  const create = async ({
    payload,
    options,
  }: IApiPayload<ICreate>): Promise<{
    status: number;
    data: IMenu;
  }> => {
    const nextId = await ApiNextId({ token, endpoint: URL });

    const body = JSON.stringify({
      id: nextId,
      name: payload.name,
      user_id: payload.user_id,
    });

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "POST", body },
    });

    const response = await fetch(URL, optionsCurrent);

    const data = (await response.json()) as IMenu;

    return { status: response.status, data };
  };

  const update = async ({ payload, options }: IApiPayload<IUpdate>) => {
    const body = JSON.stringify({
      id: payload.id,
      name: payload.name,
      user_id: payload.user_id,
    });

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "PUT", body },
    });

    const response = await fetch(`${URL}/${payload.id}`, optionsCurrent);

    const data = (await response.json()) as IMenu;

    return { status: response.status, data };
  };

  const remove = async ({ payload, options }: IApiPayload<IDelete>) => {
    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "DELETE" },
    });

    const response = await fetch(`${URL}/${payload.id}`, optionsCurrent);

    return { status: response.status };
  };

  return { get, getId, create, update, remove };
};
