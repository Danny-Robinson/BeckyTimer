import React, { useState, useEffect, useMemo, useRef } from 'react';
const audioFile = require('./timer.mp3');

function Timer() {
	const [timer, setTimer] = useState(0);
	const [patternIndex, setPatternIndex] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	// const pattern = useMemo(() => [60, 480, 80], []);
	const pattern = useMemo(() => [2, 4, 2], []);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const endAlarm = () => {
		audioRef?.current?.pause();
	};

	const unmute = () => {
		if (audioRef?.current?.muted) audioRef.current.muted = false;
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
						prevTimer === pattern[patternIndex]
							? -1
							: prevTimer + 1;

					if (nextTimer === -1) {
						setPatternIndex(
							patternIndex === 2 ? 0 : patternIndex + 1
						);
						audioRef?.current?.play();
						handleStop();
					}

					return nextTimer;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, patternIndex, pattern]);

	return (
		<div>
			<h1>{timer}</h1>
			<audio muted src={audioFile} ref={audioRef} />
			<button onClick={unmute}>Unmute</button>
			<button onClick={endAlarm}>Stop Alarm</button>
			<button onClick={handleStart} disabled={isRunning}>
				Start timer
			</button>
			<button onClick={handleStop} disabled={!isRunning}>
				Pause timer
			</button>
		</div>
	);
}

export default Timer;
