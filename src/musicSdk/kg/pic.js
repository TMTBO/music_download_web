import request from "@/utils/request";

export default {
  async url(music) {
    // :param songname: 歌曲名
    // :param songmid: 歌曲ID. Audioid
    // :param albumId: 专辑ID
    // :param hash: 歌曲哈希值
    const params = {
      songname: `${music.singer} - ${music.name}`,
      songmid: music.meta.songId, // Audioid
      albumId: music.meta.albumId || "",
      hash: music.id || "",
    };
    const res = await request.get("/music/kg/getPicURL", { params });
    return res.data["picUrl"] || "";
  },
};
