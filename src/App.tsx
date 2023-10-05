import { useState, useEffect } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

import './App.css';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

const App = () => {
	const [board, setBoard] = useState(new Board());
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	function restart() {
		const newBoard = new Board();
		newBoard.initlCells();
		newBoard.addFigures();
		setBoard(newBoard);
	}

	function swapPlayer() {
		setCurrentPlayer(
			currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
		);
	}

	return (
		<div className='app'>
			<Timer
				restart={restart}
				currentPlayer={currentPlayer}
			/>
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>
			<div>
				<LostFigures
					title='White figures'
					figures={board.lostBlackFigures}
				/>
				<LostFigures
					title='Black figures'
					figures={board.lostWhiteFigures}
				/>
			</div>
		</div>
	);
};

export default App;
