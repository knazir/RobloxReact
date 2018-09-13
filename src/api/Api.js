export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
  }
}

class Api {
  constructor(subdomain) {
    this._baseUrl = `https://${subdomain}.${config.SITE_URL}`;
  }

  _handleError(path, res, json) {
    const message = json && json.error;
    if (res.status === 400 && message) throw new ApiError(message);
    if (res.status !== 401) throw new Error(`API: ${status} error to ${path}: ${message || JSON.stringify(json)}`);
  }

  async _send(method, path, body) {
    const opts = {
      method: method,
      credentials: "include",
      headers: {}
    };
    if (body) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(`${this._baseUrl}${path}`, opts);
    let json;
    try {
      json = await res.json();
    } catch (e) {
      const text = e.message ? e.message : await res.text();
      throw new Error(`API: Non-JSON response to ${path}: ${text}`);
    }
    if (!res.ok) this._handleError(path, res, json);
    return json;
  }
}

for (const method of ["delete", "get", "patch", "post", "put"]) {
  Api.prototype[method] = async function(path, queryParams, body) {
    const fulllPath = `${path}${queryParams ? "?" : ""}${queryParams || ""}`;
    return this._send(method, fulllPath, body);
  };
}

export default Api;
