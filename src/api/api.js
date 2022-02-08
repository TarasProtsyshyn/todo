import axios from "axios";
import queryString from "query-string";

class Api {
  constructor() {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Referrer-Policy": "no-referrer",
      },
    });

    this.api = api;
  }

  async get({ path, params }) {
    try {
      const res = await this.api.get(path, {
        params,
        paramsSerializer: queryString.stringify,
      });

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async patch({ path, body }) {
    try {
      const res = await this.api.patch(path, body);

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async post({ path, body }) {
    try {
      const res = await this.api.post(path, body);

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async put({ path, body }) {
    try {
      const res = await this.api.put(path, body);

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async delete({ path, body }) {
    try {
      const res = await this.api.delete(path, {
        data: body,
      });

      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new Api();
