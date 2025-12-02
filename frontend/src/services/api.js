const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
const DEFAULT_ERROR_MESSAGE =
  "Não foi possível carregar. Verifique a URL e tente novamente.";

const buildUrl = (path) => {
  if (!path) {
    throw new Error("Path é obrigatório para chamadas à API");
  }
  return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
};

const tryParseJson = async (response) => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return null;
};

const handleResponse = async (response) => {
  const data = await tryParseJson(response);
  if (!response.ok) {
    const message = data?.message ?? DEFAULT_ERROR_MESSAGE;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

const request = async (path, options = {}) => {
  const { headers = {}, body, ...rest } = options;
  const isJsonBody = body && !(body instanceof FormData);
  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let finalBody = body;
  if (isJsonBody && typeof body !== "string") {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] ?? "application/json";
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), {
    method: "GET",
    ...rest,
    headers: finalHeaders,
    body: rest.method === "GET" || rest.method === "HEAD" ? undefined : finalBody,
  });

  return handleResponse(response);
};

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};

export { API_BASE_URL, DEFAULT_ERROR_MESSAGE };
