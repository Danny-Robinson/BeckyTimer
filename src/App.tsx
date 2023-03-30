import React from 'react';
import gopher from './assets/gopher.png';
import './App.css';
import Timer from './components/Timer';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img
					src={gopher}
					className="App-logo"
					alt="logo"
					style={{ overflow: 'hidden', height: 200, width: 200 }}
				/>
				<Timer />
			</header>
		</div>
	);
}

export default App;
