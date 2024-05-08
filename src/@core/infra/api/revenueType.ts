import { IRevenueType } from "@/@core/domain/RevenueType";

import { IApiClient, IApiParams } from "./_types";
import {
  ApiBaseURL,
  ApiFilterParams,
  ApiOptions,
  ApiParseParams,
} from "./_utils";

import { IGetAll } from "./revenueType.types";

export const apiRevenueType = (props: Partial<IApiClient> = {}) => {
  const { token } = props;

  const URL = ApiBaseURL("/revenue-type");

  const get = async ({ payload, options }: IApiParams<IGetAll>) => {
    const { search } = payload ?? {};

    const query = ApiParseParams(ApiFilterParams(search ?? {}));

    const optionsCurrent = ApiOptions({
      token,
      options: { ...options, method: "GET" },
    });

    const response = await fetch(`${URL}${query}`, optionsCurrent);

    const data = (await response.json()) as IRevenueType[];

    return { status: response.status, data };
  };

  return { get };
};
