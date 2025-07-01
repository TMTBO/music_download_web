import request from "@/utils/request";

export default {
  async url(music) {
    const params = {
      rid: music.id,
    };
    const res = await request.get("/music/kw/getPicURL", { params });
    return res.data["picUrl"] || "";
  },
};
