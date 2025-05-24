/**
 * 格式化歌手
 * @param singers 歌手数组
 * @param nameKey 歌手名键值
 * @param join 歌手分割字符
 */
export const formatSingerName = (singers, nameKey = "name", join = "、") => {
  if (Array.isArray(singers)) {
    const singer = [];
    singers.forEach((item) => {
      let name = item[nameKey];
      if (!name) return;
      singer.push(name);
    });
    return decodeName(singer.join(join));
  }
  return decodeName(String(singers ?? ""));
};

export const decodeName = (str) => {
  if (!str) return "";
  return new window.DOMParser().parseFromString(str, "text/html").body
    .textContent;
};

/**
 * 毫秒或秒转 mm:ss
 * @param {string|number} duration
 * @returns {string}
 */
export const formatDuration = (duration) => {
  let sec = Number(duration);
  if (sec > 1000) sec = Math.floor(sec / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
