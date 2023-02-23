export function isAudioSupported() {
  let audio = document.createElement("audio");
  if (audio && audio.canPlayType) {
    let ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
    let mp3 = audio.canPlayType("audio/mpeg;");
    let wav = audio.canPlayType('audio/wav; codecs="1"');

    return {
      ogg: ogg === "probably" || ogg === "maybe",
      mp3: mp3 === "probably" || mp3 === "maybe",
      wav: wav === "probably" || wav === "maybe",
    };
  }
  return false;
}

interface ICreateAudioOptions {
  volume?: number;
  loop?: boolean;
}

// prettier-ignore
export function createAudio(src: string, options: ICreateAudioOptions, canplay?: any) {
  const audio = document.createElement("audio");
  const { volume, loop } = options;

  audio.addEventListener("canplay", canplay, false);
  audio.volume = options.volume ?? 0.5;
  audio.loop = loop ?? false;
  audio.src = src;


  return audio;
}
