import React, { useState } from "react";

export default function MuteButton({ audio }) {
  const [muted, setMuted] = useState(audio.muted);

  const onClick = async () => {
    await audio.unlock();
    audio.toggle();
    audio.tick();
    setMuted(audio.muted);
  };

  return (
    <button
      type="button"
      className={`icon-btn mute${muted ? " is-muted" : ""}`}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      onClick={onClick}
    >
      <span className="mute-wave" aria-hidden="true" />
    </button>
  );
}
