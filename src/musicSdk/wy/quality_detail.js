import request from "@/utils/request";
import { formatSize } from "../utils";

export const getMusicQualityInfo = async (id) => {
  const params = { songId: id };
  const res = await request.get("/music/wy/qualityDetail", { params });
  const rawData = res.data.data;
  if (res.data.code !== 200 || !rawData) {
    throw new Error("Failed to get song quality information");
  }
  const qualities = [];
  if (rawData.m && rawData.m.size) {
    qualities.push({
      type: "128k",
      size: formatSize(rawData.m.size),
      format: "mp3",
    });
  } else if (rawData.l && rawData.l.size) {
    qualities.push({
      type: "128k",
      size: formatSize(rawData.l.size),
      format: "mp3",
    });
  }
  if (rawData.h && rawData.h.size) {
    qualities.push({
      type: "320k",
      size: formatSize(rawData.h.size),
      format: "mp3",
    });
  }
  if (rawData.sq && rawData.sq.size) {
    qualities.push({
      type: "flac",
      size: formatSize(rawData.sq.size),
      format: "flac",
    });
  }
  if (rawData.hr && rawData.hr.size) {
    qualities.push({
      type: "hires",
      size: formatSize(rawData.hr.size),
      format: "flac",
    });
  }
  if (rawData.db && rawData.db.size) {
    qualities.push({
      type: "dolby",
      size: formatSize(rawData.db.size),
      format: "flac",
    });
  }
  if (rawData.jm && rawData.jm.size) {
    qualities.push({
      type: "master",
      size: formatSize(rawData.jm.size),
      format: "flac",
    });
  }

  return qualities;
};
