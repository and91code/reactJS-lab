export const ApiBaseURL = (endpoint: string) => {
  return process.env.NEXT_URL_API + endpoint;
};

export const ApiOptions = ({
  token,
  options,
}: {
  token?: string;
  options?: RequestInit;
}): RequestInit => {
  const payload = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  // if (!token) {
  //   return payload;
  // }
  // return { ...payload, Authorization: `Bearer ${token}` };

  return payload;
};

export const ApiFilterParams = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (Array.isArray(v)) {
        return !!v.length;
      }
      return v !== null && v !== "" && v !== undefined;
    })
  );
};

export const ApiParseParams = (data: Object) => {
  const paramsEntries = Object.entries(data);
  const paramsLength = paramsEntries.length;

  if (!paramsLength) {
    return "";
  }

  return paramsEntries.reduce((acc, item, i) => {
    const [key, value] = item;
    const paramIndex = i + 1;

    const isArray = Array.isArray(value);

    if (isArray) {
      const valueLength = value.length;

      value.forEach((v: string, i: number) => {
        const strConcat = valueLength !== i + 1 ? "&" : "";

        acc += `${key}[]=${v}${strConcat}`;
      });
    }

    if (!isArray) {
      acc += `${key}=${value}`;
    }

    if (paramsLength !== paramIndex) {
      acc += "&";
    }

    return acc;
  }, "?");
};

export const ApiNextId = async ({
  token,
  endpoint,
}: {
  token?: string;
  endpoint: string;
}): Promise<number> => {
  const optionsCurrent = ApiOptions({
    token,
    options: { method: "GET", cache: "no-cache" },
  });

  const response = await fetch(endpoint, optionsCurrent);

  const users = (await response.json()) as { id: number }[];

  const [{ id }] = users.slice(-1);

  return Number(id ?? 0) + 1;
};
