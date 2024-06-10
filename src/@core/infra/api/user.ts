import { IUser } from "@/@core/domain/User";

import { IApiClient, IApiParams, IApiPayload } from "./_types";
import {
  ApiBaseURL,
  ApiFilterParams,
  ApiNextId,
  ApiOptions,
  ApiParseParams,
} from "./_utils";

import { ICreate, IGetAll, IGetById, IUpdate } from "./user.types";

export const apiUsers = (props: Partial<IApiClient> = {}) => {
  const { token } = props;

  const URL = ApiBaseURL("/user");

  const get = async ({ payload, options }: IApiParams<IGetAll> = {}) => {
    const { search } = payload ?? {};

    const query = ApiParseParams(ApiFilterParams(search ?? {}));

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "GET" },
    });

    const response = await fetch(`${URL}${query}`, optionsCurrent);

    const data = (await response.json()) as IUser[];

    return { status: response.status, data };
  };

  const getId = async ({ payload, options }: IApiParams<IGetById>) => {
    const { id } = payload ?? {};

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "GET" },
    });

    const response = await fetch(`${URL}/${id}`, optionsCurrent);

    const data = (await response.json()) as IUser;

    return { status: response.status, data };
  };

  const create = async ({
    payload,
    options,
  }: IApiPayload<ICreate>): Promise<{
    status: number;
    data: IUser;
  }> => {
    const nextId = await ApiNextId({ token, endpoint: URL });

    const body = JSON.stringify({
      id: nextId,
      name: payload.name,
      email: payload.email,
      token: `token-foo-${nextId}`,
    });

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "POST", body },
    });

    const response = await fetch(URL, optionsCurrent);

    const data = (await response.json()) as IUser;

    return { status: response.status, data };
  };

  const update = async ({ payload, options }: IApiPayload<IUpdate>) => {
    const body = JSON.stringify({
      id: payload.id,
      name: payload.name,
      email: payload.email,
      username: payload.username,
    });

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "PUT", body },
    });

    const response = await fetch(`${URL}/${payload.id}`, optionsCurrent);

    const data = (await response.json()) as IUser;

    return { status: response.status, data };
  };

  return { get, getId, create, update };
};
