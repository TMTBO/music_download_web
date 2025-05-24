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
};
