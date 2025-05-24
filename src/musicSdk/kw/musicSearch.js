import request from "@/utils/request";
import { decodeName, formatDuration } from "../utils";
import { formatSinger } from "./utils";

export default {
  search,
};

/**
 * 酷我音乐搜索
 * @param {string} str 搜索关键词
 * @param {number} page 页码（从1开始）
 * @param {number} limit 每页数量
 * @returns {Promise<MusicInfo[]>} 搜索结果
 */
async function search(str, page = 1, limit = 20) {
  const params = {
    keyword: str,
    page: page - 1,
    limit: limit,
  };
  const res = await request.get("/music/kw/search", { params });
  // 兼容返回数据格式
  let list = [];
  if (res.data && Array.isArray(res.data.abslist)) {
    list = res.data.abslist.map((item) => ({
      id: item.MUSICRID.replace("MUSIC_", "") || "",
      name: decodeName(item.SONGNAME) || "",
      singer: formatSinger(decodeName(item.ARTIST)) || "",
      source: "kw",
      interval: item.DURATION ? formatDuration(item.DURATION) : null,
      meta: {
        songId: item.MUSICRID || "",
        albumName: item.ALBUM || "",
        picUrl: item.ALBUMPIC || null,
      },
    }));
  }
  return {
    list,
    page: res.data && res.data.PN ? parseInt(res.data.PN, 10) + 1 : page,
    total: res.data && res.data.TOTAL ? parseInt(res.data.TOTAL, 10) : 0,
    limit: res.data && res.data.RN ? parseInt(res.data.RN, 10) : limit,
  };
}
