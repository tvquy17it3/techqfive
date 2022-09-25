import React, { useState, useRef } from 'react';
import audios from '../components/source_audios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faEllipsisH, faRandom, faStepBackward, faStepForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Intro from '../assets/intro.mp3';


function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + ':' : '';
  var mDisplay = m > 0 ? m + ':' : '00:';
  var sDisplay = s > 0 ? s : '00';
  return hDisplay + mDisplay + sDisplay;
}

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Music = () => {
  const [audioIndex, setAudioIndex] = useState(0);
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isRandomAudio, setRandomAudio] = useState(false);
  const [isRepeat, setRepeat] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };


  const SelecteAudio = (idx) => {
    if (isRepeat) {
      Progress(0);
    } else if (isRandomAudio) {
      setAudioIndex(randomNumberInRange(0, audios.length - 1));
    } else if (idx < 0) {
      setAudioIndex(audios.length - 1);
    } else {
      setAudioIndex(idx);
    }

    setTimeout(function () {
      audioRef.current.play();
    }, 150);
    setPlay(true);
  }

  const Progress = (percent) => {
    audioRef.current.currentTime = (percent / 100) * duration;
  }

  const printSpan = () => {
    const row = [];
    for (var i = 0; i < 50; i++) {
      row.push(<span key={i}></span>);
    }
    return row;
  };

  return (
    <div className= "sesion-container">
      <div className={isPlay ? "player playing" : "player"}>
        <div className="dashboard">
          <header>
            <h4>Now playing:</h4>
            <h2>{audios[audioIndex].name}</h2>
          </header>

          {/* <div className="cd">
            <div className={ isPlay ? "cd-thumb playing" : "cd-thumb" }></div>
          </div> */}

          <div className="control">
            <div className={isRepeat ? "btn btn-repeat active" : "btn btn-repeat"} onClick={() => setRepeat(!isRepeat)}>
              <FontAwesomeIcon icon={faRedo}/>
            </div>
            <div className="btn btn-prev" onClick={() => SelecteAudio((audioIndex - 1) % audios.length)}>
              <FontAwesomeIcon icon={faStepBackward}/>
            </div>
            <div className="btn btn-toggle-play" onClick={() => handlePausePlayClick()}>
              <FontAwesomeIcon icon={faPause} className="icon-pause"/>
              <FontAwesomeIcon icon={faPlay} className="icon-play"/>
            </div>
            <div className="btn btn-next" onClick={() => SelecteAudio((audioIndex + 1) % audios.length)}>
              <FontAwesomeIcon icon={faStepForward}/>
            </div>
            <div className={isRandomAudio ? "btn btn-random active" : "btn btn-random"} onClick={() => setRandomAudio(!isRandomAudio)}>
              <FontAwesomeIcon icon={faRandom}/>
            </div>
          </div>

          <div className="time-progress">
            <input id="progress" className="progress"
              type="range" step="0.01" min="0" max="100" readOnly
              onChange={(e) => Progress(e.target.value)}
              value={((currentTime/duration)*100 || currentTime).toFixed(2)}>
            </input>
            <span className="time">{secondsToHms(currentTime)}/{secondsToHms(duration)}</span>
          </div>
          <audio
            id="audio"
            ref={audioRef}
            src={audios.length > 0 ? audios[audioIndex].path : Intro}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => SelecteAudio((audioIndex + 1) % audios.length)}
          />
        </div>

        <div className="playlist">
          {audios.map((music, idx) => (
            <div className={ idx === audioIndex ? "song active" : "song" } key={idx} onClick={() => SelecteAudio(idx)}>
              <div className="thumb"></div>
              <div className="body">
                <h3 className="title">{music.name}</h3>
                <p className="author">{music.singer}</p>
              </div>
              <div className="option">
                <FontAwesomeIcon icon={faEllipsisH}/>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="background-two">
          {printSpan()}
        </div> */}
      </div>
    </div>
  );
};

export default Music;
