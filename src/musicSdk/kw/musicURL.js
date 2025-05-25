import request from "@/utils/request";

export default {
  async getMusicURL(musicId, quality = "128k") {
    const params = {
      musicId: musicId,
      quality: quality,
    };

    const res = await request.get("/music/kw/getMusicURL", { params });
    const rawData = res.data.data;
    if (!rawData || !rawData.url) {
      throw new Error("获取音乐URL失败");
    }
    return {
      url: res.data.data.url,
      format: res.data.data.format || "mp3",
    };
  },
};
