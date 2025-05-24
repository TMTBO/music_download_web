import request from "@/utils/request";
import { decodeName, formatDuration } from "../utils";
import { formatSinger } from "./utils";

export default {
  regExps: {
    mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
  },
  qualityTypes: {
    128: "128k",
    192: "192k",
    320: "320k",
    2000: "flac",
    4000: "hires",
    // 20000: "master", // zpMB
    20201: "master",
    20501: "master",
    20900: "master",
  },

  /**
   * 酷我音乐搜索
   * @param {string} str 搜索关键词
   * @param {number} page 页码（从1开始）
   * @param {number} limit 每页数量
   * @returns {Promise<MusicInfo[]>} 搜索结果
   */
  async search(str, page = 1, limit = 20) {
    const params = {
      keyword: str,
      page: page - 1,
      limit: limit,
    };

    const res = await request.get("/music/kw/search", { params });
    // 兼容返回数据格式
    let list = [];
    if (res.data && Array.isArray(res.data.abslist)) {
      list = res.data.abslist
        .filter(
          (item) => item && item.MUSICRID && item.SONGNAME && item.N_MINFO
        )
        .map((item) => {
          const qualities = item.N_MINFO.split(";")
            .map((item) => item.match(this.regExps.mInfo))
            .flatMap((item) => {
              const type = this.qualityTypes[item[2]];
              if (!type) {
                console.warn(
                  "Unknown quality type:",
                  item[2],
                  "size:",
                  item[4],
                  "format:",
                  item[3]
                );
                return null;
              }
              return {
                type: type || item[2],
                size: item[4].toLocaleUpperCase(),
              };
            })
            .filter((item) => item !== null)
            .reverse();

          return {
            id: item.MUSICRID.replace("MUSIC_", "") || "",
            name: decodeName(item.SONGNAME) || "",
            singer: formatSinger(decodeName(item.ARTIST)) || "",
            source: "kw",
            interval: item.DURATION ? formatDuration(item.DURATION) : null,
            qualities: qualities,
            meta: {
              songId: item.MUSICRID || "",
              albumName: item.ALBUM || "",
              // picUrl: item.ALBUMPIC || null,
            },
          };
        });
    }
    const cPage =
      res.data && res.data.PN ? parseInt(res.data.PN, 10) + 1 : page;
    const total = res.data && res.data.TOTAL ? parseInt(res.data.TOTAL, 10) : 0;
    const cLimit = res.data && res.data.RN ? parseInt(res.data.RN, 10) : limit;
    return {
      list,
      page: cPage,
      total,
      limit: cLimit,
    };
  },
};
