const STORAGE_KEY = "gp-mute";

function noiseBuffer(ctx, seconds = 0.4) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function createAudio() {
  let ctx = null;
  let master = null;
  let muted = window.localStorage.getItem(STORAGE_KEY) === "1";

  const ensure = async () => {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.26;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") await ctx.resume();
    return ctx;
  };

  const env = (node, start, peak, attack, release) => {
    node.gain.setValueAtTime(0.0001, start);
    node.gain.exponentialRampToValueAtTime(peak, start + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, start + attack + release);
  };

  const tone = (freq, type, peak, attack, release, startOffset = 0) => {
    if (!ctx || muted) return;
    const t = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    env(gain, t, peak, attack, release);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + attack + release + 0.02);
  };

  const noise = (peak, attack, release, filterFreq, startOffset = 0) => {
    if (!ctx || muted) return;
    const t = ctx.currentTime + startOffset;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = filterFreq;
    const gain = ctx.createGain();
    env(gain, t, peak, attack, release);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(t);
    src.stop(t + attack + release + 0.02);
  };

  return {
    get muted() {
      return muted;
    },
    async unlock() {
      await ensure();
    },
    setMuted(next) {
      muted = next;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      if (master) master.gain.setTargetAtTime(next ? 0 : 0.26, ctx?.currentTime ?? 0, 0.04);
    },
    toggle() {
      this.setMuted(!muted);
      return muted;
    },
    enter() {
      noise(0.14, 0.08, 0.48, 420);
      tone(98, "sine", 0.18, 0.04, 0.5);
      tone(196, "triangle", 0.07, 0.08, 0.38, 0.05);
      tone(784, "sine", 0.035, 0.1, 0.32, 0.1);
    },
    tick() {
      tone(880, "square", 0.028, 0.005, 0.04);
      tone(220, "sine", 0.035, 0.005, 0.055);
    },
    hover() {
      tone(1320, "sine", 0.02, 0.004, 0.045);
    },
    chime() {
      tone(523.25, "sine", 0.07, 0.01, 0.26);
      tone(659.25, "sine", 0.05, 0.02, 0.3, 0.04);
      tone(783.99, "triangle", 0.04, 0.03, 0.36, 0.08);
    },
    loadHit() {
      tone(55, "sine", 0.14, 0.01, 0.18);
      noise(0.07, 0.01, 0.1, 900);
    },
  };
}

export const audio = createAudio();
