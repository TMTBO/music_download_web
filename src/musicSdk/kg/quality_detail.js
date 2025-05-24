import request from "@/utils/request";
import { formatSize } from "../utils";

const qualityTypes = {
  128: "128k",
  320: "320k",
  flac: "flac",
  high: "hires",
  viper_clear: "master",
  viper_atmos: "atmos",
};

export const getBatchMusicQualityInfo = async (hashList) => {
  const res = await request.post("/music/kg/qualityDetail", hashList);
  const qualitiesMap = {};
  res.data.data
    .filter((item) => item && item.relate_goods)
    .forEach((item) => {
      const qualities = item.relate_goods
        .map((quality_data) => {
          const type = qualityTypes[quality_data.quality];
          if (!type) {
            console.warn(
              "Unknown quality type:",
              quality_data.quality,
              "format:",
              quality_data.info.extname
            );
            return null;
          }
          return {
            type: type,
            hash: quality_data.hash,
            size: formatSize(quality_data.info.filesize),
          };
        })
        .filter((q) => q !== null);
      qualitiesMap[item.hash] = qualities;
    });

  return qualitiesMap;
};
