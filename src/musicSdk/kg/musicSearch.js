import request from "@/utils/request";
import { formatSingerName, decodeName, formatDuration } from "../utils";

export default {
  search,
};

/**
 * 酷狗音乐搜索
 * @param {string} str 搜索关键词
 * @param {number} page 页码（从1开始）
 * @param {number} limit 每页数量
 * @returns {Promise<MusicInfo[]>} 搜索结果
 */
export async function search(str, page = 1, limit = 20) {
  const params = {
    keyword: encodeURIComponent(str),
    page: page,
    pagesize: limit,
  };
  const res = await request.get("/music/kg/search", { params });

  // 兼容返回数据格式
  let ids = new Set();
  const items = [];

  res.data.data.lists.forEach((item) => {
    const key = item.Audioid + item.FileHash;
    if (!ids.has(key)) {
      ids.add(key);
      items.push(item);
    }

    for (const childItem of item.Grp || []) {
      const childKey = childItem.Audioid + childItem.FileHash;
      if (!ids.has(childKey)) {
        ids.add(childKey);
        items.push(childItem);
      }
    }
  });

  let list = items.map((item) => {
    // const { types = [], _types = {} } = qualityInfoMap[item.FileHash] || {};

    return {
      id: item.FileHash || "",
      name: decodeName(item.SongName) || "",
      singer: decodeName(formatSingerName(item.Singers, "name")) || "",
      source: "kg",
      interval: formatDuration(item.Duration),
      meta: {
        songId: item.FileHash || "",
        albumName: decodeName(item.AlbumName) || "",
        picUrl: item.Image || null,
      },
    };
  });

  return {
    list,
    page:
      res.data && res.data.data && res.data.data.page
        ? parseInt(res.data.data.page, 10)
        : page,
    total:
      res.data && res.data.data && res.data.data.total
        ? parseInt(res.data.data.total, 10)
        : 0,
    limit:
      res.data && res.data.data && res.data.data.pagesize
        ? parseInt(res.data.data.pagesize, 10)
        : limit,
  };
}
