const API_BASE_URL =
  import.meta.env.VITE_ENDPOINT_BASE_URL || "http://localhost:8000";

export const $fetch = {
  get: async (url, params = {}) => {
    try {
      return await fetch(
        API_BASE_URL + url + (params ? "?" + new URLSearchParams(params) : "")
      ).then((res) => res.json());
    } catch (e) {
      return e;
    }
  },
  post: async (
    url,
    body = {},
    args = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ) => {
    try {
      return await fetch(`${API_BASE_URL}${url}`, {
        method: args.method,
        headers: {
          "Content-Type": "application/json",
          ...args.headers,
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    } catch (e) {
      return e;
    }
  },
};
