import request from "@/utils/request";
import kw from "./kw";
import kg from "./kg";
import tx from "./tx";
import mg from "./mg";
import wy from "./wy";
const sources = {
  sources: [
    {
      name: "酷我音乐",
      id: "kw",
    },
    {
      name: "酷狗音乐",
      id: "kg",
    },
    {
      name: "QQ音乐",
      id: "tx",
    },
    {
      name: "网易音乐",
      id: "wy",
    },
    {
      name: "咪咕音乐",
      id: "mg",
    },
  ],
  kw,
  kg,
  tx,
  wy,
  mg,
};

export default {
  ...sources,

  async searchMusic({ query, source: s, page = 1, limit = 20 }) {
    const trimStr = (str) => (typeof str == "string" ? str.trim() : str);
    const queryStr = trimStr(query);

    return await sources[s].musicSearch
      .search(queryStr.trim(), page, limit)
      .catch(() => null);
  },

  async getMusicURL({ musicId, source: s, quality = "128k" }) {
    if (!musicId) {
      throw new Error("音乐ID不能为空");
    }

    let res;
    if (s === "mobi") {
      res = await kw.musicURL(musicId, quality);
    } else {
      res = await this._getMusicURL(musicId, s, quality);
    }
    return Promise.resolve(res)
      .then((res) => {
        const rawData = res.data;
        if (!rawData || !rawData.url) {
          throw new Error("获取音乐URL失败");
        }
        return {
          url: rawData.url,
        };
      })
      .catch((err) => {
        console.error("获取音乐URL失败:", err);
        throw err;
      });
  },

  async downloadMusic({ url, name }) {
    if (!url) {
      throw new Error("音乐URL不能为空");
    }

    await request
      .post("/music/download", { url, name }, { timeout: 5 * 60 * 1000 })
      .then((res) => {
        console.log("下载结果:", res);
      });
  },

  async _getMusicURL(musicId, source, quality = "128k") {
    return request.get("/music/ikun/getMusicURL", {
      params: {
        musicId: musicId,
        source: source,
        quality: quality,
      },
    });
  },
};
