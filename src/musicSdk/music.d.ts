interface MusicInfoMeta {
    songId: string | number // 歌曲ID，mg源为copyrightId，local为文件路径
    albumName: string // 歌曲专辑名称
    picUrl?: string | null // 歌曲图片链接
}

interface MusicInfo {
    id: string
    name: string // 歌曲名
    singer: string // 艺术家名
    source: S // 源
    interval: string | null // 格式化后的歌曲时长，例：03:55
    qualities: [] // 音质，例：[{type: 320k, size: 11.27Mb }]
    meta: MusicInfoMeta
}