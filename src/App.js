import React from "react";
import "./index.css";
import spockFascinating from "./starTrek-sounds/voice_spock_fascinating.mp3";
import spockIllogical from "./starTrek-sounds/voice_spock_mostillogical.mp3";
import spockBluff from "./starTrek-sounds/voice_spock_vulcansneverbluff.mp3";
import dataAccess from "./starTrek-sounds/tng-data-ihaveaccess.mp3";
import dataHailed from "./starTrek-sounds/tng-data-beinghailed.mp3";
import dataSystems from "./starTrek-sounds/tng-data-allsystems.mp3";
import picardStatusReport from "./starTrek-sounds/tng-picard-statusreport.mp3";
import picardEngage from "./starTrek-sounds/tng-picard-engage.mp3";
import picardMakeItSo from "./starTrek-sounds/tng-picard-makeitso.mp3";

const audioFiles = [
  { id: "Q", label: "Spock: Fascinating", audioSrc: spockFascinating },
  { id: "W", label: "Spock: Illogical", audioSrc: spockIllogical },
  { id: "E", label: "Spock: Bluff", audioSrc: spockBluff },
  { id: "A", label: "Data: Access", audioSrc: dataAccess },
  { id: "S", label: "Data: Hailed", audioSrc: dataHailed },
  { id: "D", label: "Data: Systems", audioSrc: dataSystems },
  { id: "Z", label: "Picard: Engage", audioSrc: picardEngage },
  { id: "X", label: "Picard: Status Report", audioSrc: picardStatusReport },
  { id: "C", label: "Picard: Make It So", audioSrc: picardMakeItSo },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundId: "",
    };
    this.audioPlayer = Array.from({ length: 9 }, () => React.createRef());
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const { key } = event;
    const button = audioFiles.find((item) => item.id === key.toUpperCase());
    if (button) {
      const index = audioFiles.indexOf(button);
      this.playSound(index);
    }
  };

  playSound(index) {
    const audio = this.audioPlayer[index].current;
    this.setState({ soundId: audioFiles[index].label });

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Playback error:", error);
      }
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">
          <h1>{this.state.soundId}</h1>
        </div>
        {audioFiles.map((button, index) => (
          <button
            key={index}
            className="drum-pad"
            id={button.id}
            onClick={() => this.playSound(index)}
          >
            {button.id}
            <audio
              className="clip"
              id={button.id}
              src={button.audioSrc}
              type="audio/mpeg"
              ref={this.audioPlayer[index]}
            />
          </button>
        ))}
      </div>
    );
  }
}

export default App;
