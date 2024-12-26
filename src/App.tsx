import { useState, useContext, createContext } from "react";

import AmbientEnum from "./models/enums";
import Ambient from "./models/ambient";
import Soundboard from "./models/soundboard";

const AmbientCtx = createContext(new Ambient());
const SoundboardCtx = createContext(new Soundboard());

function App() {
  const ambient = useContext(AmbientCtx);
  const soundboard = useContext(SoundboardCtx);

  const [playIcon, setPlayIcon] = useState("gg-play-button-o");
  const choiceIcon = (): string => ambient.io ? "gg-play-pause-o" : "gg-play-button-o";

  const [bg, setBg] = useState({ backgroundImage: `url('${ambient.img}')` })
  const updateBg = () => setBg({ backgroundImage: `url('${ambient.img}')` })

  const isActive = (obtained: string, wanted: string): string => obtained === wanted ? "active" : "inactive";

  const update = (e: AmbientEnum) => {
    if (e === ambient.ambient)
      return;

    ambient.set_ambient(e)
    updateBg()
    soundboard.switch(ambient.ambient, ambient.io);
  }

  const updatePlay = () => {
    ambient.toggle();
    soundboard.switch(ambient.ambient, ambient.io)
    setPlayIcon(choiceIcon());
  }

  const handleKeys = (code: string) => {
    switch (code) {
      case "Space":
        updatePlay();
        break;
      default:
        break;
    }
  }

  return (
    <div className="App" tabIndex={-1} onKeyDown={(e) => handleKeys(e.code)}>

      <div id="bg" className="bg" style={bg}></div>

      <div className="top gr">
        <div className={isActive(ambient.ambient, AmbientEnum.RAIN)} onClick={() => { update(AmbientEnum.RAIN); }}>{AmbientEnum.RAIN}</div>
        <div className={isActive(ambient.ambient, AmbientEnum.RAIN_H)} onClick={() => { update(AmbientEnum.RAIN_H); }}>{AmbientEnum.RAIN_H}</div>
        <div className={isActive(ambient.ambient, AmbientEnum.THUNDER)} onClick={() => { update(AmbientEnum.THUNDER); }}>{AmbientEnum.THUNDER}</div>
        <div className={isActive(ambient.ambient, AmbientEnum.OFFICE)} onClick={() => { update(AmbientEnum.OFFICE); }}>{AmbientEnum.OFFICE}</div>
        <div className={isActive(ambient.ambient, AmbientEnum.NOISE_W)} onClick={() => { update(AmbientEnum.NOISE_W) }}>{AmbientEnum.NOISE_W}</div>
      </div>

      <div className="bottom padded-2" onClick={() => { updatePlay() }}>
        <i className={playIcon}></i>
      </div>
    </div >
  );
}

export default App;
