import request from "@/utils/request";
import kw from "./kw";
import kg from "./kg";
import tx from "./tx";
import mg from "./mg";
import wy from "./wy";
import mobi from "./kw/mobi";
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
  source: [
    { name: "mobi 音源(酷我破解)", id: "mobi" },
    { name: "ikun 音源", id: "ikun" },
  ],
  kw,
  kg,
  tx,
  wy,
  mg,
  mobi,
};

export default {
  ...sources,

  async searchMusic({ query, source: s, page = 1, limit = 20 }) {
    const trimStr = (str) => (typeof str == "string" ? str.trim() : str);
    const queryStr = trimStr(query);

    return await sources[s].musicSearch
      .search(queryStr.trim(), page, limit)
      .catch((err) => {
        console.error("搜索音乐失败:", err);
        return Promise.reject(err);
      });
  },

  async getMusicURL({ musicId, source: s, quality = "128k", activeSource }) {
    if (!musicId) {
      console.error("音乐ID不能为空");
      return Promise.reject(new Error("音乐ID不能为空"));
    }

    // 判断 activeSource 是否为 mobi
    const realSource = activeSource === "mobi" ? "mobi" : s;

    let res;
    if (realSource === "mobi") {
      res = await mobi.musicURL.getMusicURL(musicId, quality);
    } else {
      res = await this._getMusicURL(musicId, realSource, quality);
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
        return Promise.reject(err);
      });
  },

  async getPicURL(music) {
    return await sources[music.source].getPic.url(music).catch((err) => {
      console.error("获取音乐封面失败:", err);
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
    return request
      .get("/music/ikun/getMusicURL", {
        params: {
          musicId: musicId,
          source: source,
          quality: quality,
        },
      })
      .catch((err) => {
        console.error("获取音乐URL失败:", err);
        return Promise.reject(err);
      });
  },
};
