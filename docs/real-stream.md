[TOC]

# Web直播流



## 直播小知识

1. 典型直播流程：

   ```mermaid
   graph LR
   a[录制] --> b[编码] 
   b --> c[网络传输]
   c --> d[解码]
   d --> e[播放]
   ```


2. `IPB`: 一种常用的视频压缩方案

   I 表示关键帧，一帧画面的完整保留

   P 帧表示差别帧, 与前一帧画面的差别的数据

   B 帧双向差别帧，本帧与前后帧的差别

3. `GOP`:  Group of picture（图像组）， 两个关键帧间的间隔

4. 音视频质量指标：内容延时、卡顿（流畅度）、首帧时长

5. 音视频直播要克服的主要问题：网络环境、多人连麦、主辅路、浏览器兼容性、CDN支持等

6. `MSE` (Media Source Extensions) : `W3C` 标准 `API` , 解决 `HTML5` 问题，允许`JavaScript` 动态构建 `video` 和 `audio`  的媒体流。可以用 `MediaSource.isTypeSupported()` 来判断是否支持某种 `MINE` 类型。`ios` 和 `Safari` 不支持

7. **文件格式/封装格式/容器格式** : 一种承载视频的格式，例如： `flv`、`avi`、`mpg`、`vob`、`mov`、`mp4`等。而视频用什么格式编码的，则与`Codec` 相关。

8. **`Codec`** : 多媒体数字信号编码解码器，能够对音视频进行压缩（CO）和解压缩 (DEC)。`Codec`技术可以有效减少数字存储占用空间。

9. **常用视频编码** ：`H246`、`MPEG` 、`WMV` 、`RealVideo`、`QuickTime`

10. **常用音频编码** ：`MP3`、 `OGG` 、`AAC` 、`PCM`、`WAV`、 `APE`、`Vorbis` 、`Opus`



## 常见直播协议

常见直播协议延时和性能数据

| 传输协议 | 播放器 | 延迟 | 内存 | CPU  |
| -------- | ------ | ---- | ---- | ---- |
| RTMP     | Flash  | 1-3s | 430M | 11%  |
| HTTP-FLV | Video  | 1-3s | 310M | 4.4% |
| HLS      | Video  | 20s  | 205M | 3%   |
| WebRTC   | Video  |      |      |      |

### `RTMP` 协议

- 基于TCP
- 浏览器端依赖Flash播放
- 2~5s延时



### `HLS` 协议

- `Http Live Streaming`, 苹果提出的基于`Http` 的流媒体传输协议
- `HTML5` 直接支持，适合`APP`直播，PC端只有 Safari 和 Edge 支持
- 必须是H264 + AAC 编码
- 传输是切割后的音视频片段，所以延时比较大



### `flv.js` 

根据推流方式的不同可以区分为 `HTTP-flv` 和 `WebSocket-flv` 两种方式，

​	

- `Blibli` 开源 `flv.js` ，解析 `flv` 数据，通过`MSE` 封装成 `fMp4` 喂给 `video` 标签

- 要求视频编码必须H.264，音频编码必须是AAC 或 MP3，由于IE11和 Edge 不支持MP3音频编码, 所以最好采用编码格式是 H.264 + AAC

- 录播依赖原生 `Video` 标签和 `MSE` API

- 同时支持录播和直播，使用 `HTTP FLV`  需要通过流式 `IO` (`fetch` 或 `stream`)  去拉取数据 

- 2~5秒延时，首帧比`RTMP` 更快

- 不需要 `flash` 支持

  

### `WebRTC` 协议

 	(Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。(2018年6月)WebRTC 1.0规范正式发布。

WebRTC学习指南

1. 架构
2. 基础
3. 协议
4. 连接
5. API 概述

​	即网页即时通信（`WEB Real Time Communication`）,是一个支持网页浏览器实时音频和视频对话的`API`。

已经成为`W3C`标准，Google 维护源库开发。

- 现代浏览器支持性较好，IE 、Android 端 `UC`、Opera Mini 不支持
- 编码格式 `H264 + OPUS` 

### RTP

​	基于`UDP`, 延时1s, 浏览器不支持



### 小程序

- 基于`RTMP`
- `live-plusher` 和 `live-player` 组件，设置好流地址参数即可（仅支持`flv`, `rtmp` 格式）



### 影响直播延时的3个地方

1. 推流端的数据缓存
2. 服务端的gop缓存
3. 播放器的buffer缓存



推荐测试播放器

VLC:  <a href="https://www.videolan.org" target="_blank">https://www.videolan.org</a>

线上直播流测试地址



**HLS 流地址** 

CCTV1高清：http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8

CCTV3高清：http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8

CCTV5高清：http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8

CCTV5+高清：http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8

CCTV6高清：http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8



参考资料地址

<a href="https://juejin.im/post/5b8d2c7b6fb9a01a0407226a" target="_blank">Web直播，你需要先知道这些</a>

<a href="https://github.com/gwuhaolin/blog/issues/3" target="_blank">使用flv.js 做直播</a>

