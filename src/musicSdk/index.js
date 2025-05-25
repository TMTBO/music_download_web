import request from "@/utils/request";
import kw from "./kw";
import kg from "./kg";
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
    // {
    //   name: "QQ音乐",
    //   id: "tx",
    // },
    // {
    //   name: "网易音乐",
    //   id: "wy",
    // },
    // {
    //   name: "咪咕音乐",
    //   id: "mg",
    // },
  ],
  kw,
  kg,
  //   tx,
  //   wy,
  //   mg,
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
    return await sources[s].musicURL
      .getMusicURL(musicId, quality)
      .catch(() => null);
  },

  async downloadMusic({ url, name }) {
    if (!url) {
      throw new Error("音乐URL不能为空");
    }

    await request.post("/music/download", { url, name }).then((res) => {
      console.log("下载结果:", res);
    });
  },
};
