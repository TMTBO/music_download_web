import request from "@/utils/request";

export default {
  async getMusicURL(musicId, quality = "128k") {
    const params = {
      musicId: musicId,
      quality: quality,
    };

    const res = await request.get("/music/kw/getMusicURL", { params });
    return res.data;
  },
};
