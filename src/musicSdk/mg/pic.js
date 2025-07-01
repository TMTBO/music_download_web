import request from "@/utils/request";

export default {
  async url(music) {
    const params = {
      songId: music.id,
    };
    const res = await request.get("/music/mg/getPicURL", { params });
    return res.data["picUrl"] || "";
  },
};
