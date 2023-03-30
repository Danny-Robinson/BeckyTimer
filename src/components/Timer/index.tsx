import React, { useState, useEffect, useMemo, useRef } from 'react';
const audioFile = require('./timer.mp3');

function Timer() {
	const [timer, setTimer] = useState(0);
	const [patternIndex, setPatternIndex] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const [muted, setMuted] = useState(true);
	const pattern = useMemo(() => [60, 480, 60], []);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const unmute = () => {
		if (audioRef?.current?.muted) audioRef.current.muted = false;
		setMuted(false);
	};

	const handleStart = () => {
		setIsRunning(true);
	};

	const handleStop = () => {
		setIsRunning(false);
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning) {
			interval = setInterval(() => {
				setTimer((prevTimer) => {
					const nextTimer =
						prevTimer === pattern[patternIndex] ? 0 : prevTimer + 1;

					if (nextTimer === 0) {
						setPatternIndex(
							patternIndex === 2 ? 0 : patternIndex + 1
						);
						audioRef?.current?.play();
					}

					return nextTimer;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, patternIndex, pattern]);

	const nextPatternIndex = patternIndex === 2 ? 0 : patternIndex + 1;

	const minutes = (time: number) => Math.floor(time / 60);
	const seconds = (time: number) => time - minutes(time) * 60;

	const time = pattern[patternIndex] - timer;

	return (
		<div>
			<h1>{`${minutes(time) > 0 ? `${minutes(time)}mins` : ''}  ${seconds(
				time
			)}s`}</h1>
			<audio muted src={audioFile} ref={audioRef} />
			<button
				onClick={unmute}
				style={{ backgroundColor: muted ? 'red' : 'green' }}
			>
				Unmute
			</button>
			<button onClick={handleStart} disabled={isRunning}>
				Start timer
			</button>
			<button onClick={handleStop} disabled={!isRunning}>
				Pause timer
			</button>
			<div style={{ marginTop: 16 }}>
				Next alarm: {minutes(pattern[nextPatternIndex])}min
			</div>
		</div>
	);
}

export default Timer;
