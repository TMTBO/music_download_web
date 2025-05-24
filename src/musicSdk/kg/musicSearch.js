import request from "@/utils/request";
import { formatSingerName, decodeName, formatDuration } from "../utils";
import { getBatchMusicQualityInfo } from "./quality_detail";

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
    keyword: str,
    page: page,
    pagesize: limit,
  };
  const res = await request.get("/music/kg/search", { params });

  const rawData = res.data.data;

  // 兼容返回数据格式
  let ids = new Set();
  const items = [];

  rawData.lists.forEach((item) => {
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

  const hashList = items.map((item) => item.FileHash);
  let qualityInfoMap = {};
  try {
    qualityInfoMap = await getBatchMusicQualityInfo(hashList);
  } catch (error) {
    console.error("Failed to fetch quality info:", error);
  }

  let list = items.map((item) => {
    return {
      id: item.FileHash || "",
      name: decodeName(item.SongName) || "",
      singer: decodeName(formatSingerName(item.Singers, "name")) || "",
      source: "kg",
      interval: formatDuration(item.Duration),
      qualities: qualityInfoMap[item.FileHash] || {},
      meta: {
        songId: item.FileHash || "",
        albumName: decodeName(item.AlbumName) || "",
        // picUrl: item.Image || null,
      },
    };
  });

  return {
    list,
    page: rawData.page ? parseInt(rawData.page, 10) : page,
    total: rawData.total ? parseInt(rawData.total, 10) : 0,
    limit: rawData.pagesize ? parseInt(rawData.pagesize, 10) : limit,
  };
}
