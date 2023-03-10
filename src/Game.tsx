import { type Component, createSignal, createEffect } from "solid-js"
import Cell from "./Components/Cell"

type GridType = "X" | "O" | ""
type WhoWonType = "X" | "O" | "Draw" | "" | null

const Game: Component = () => {
	const [grid, setGrid] = createSignal<GridType[]>(["", "", "", "", "", "", "", "", ""])
	const [turn, setTurn] = createSignal<GridType>("X")
	const [winner, setWinner] = createSignal<WhoWonType>(null)

	const handleClick = (index: number) => {
		if (grid()[index] == "" && winner() == null) {
			let cop = [...grid()]
			cop[index] = turn()
			setGrid(cop)
			setTurn(turn() == "O" ? "X" : "O")
		}
	}

	const handleCheck = (a: GridType[]) => {
		// Check rows
		for (let i = 0; i < 9; i += 3) {
			if (a[i] !== "" && a[i] === a[i + 1] && a[i] === a[i + 2]) {
				setWinner(a[i])
			}
		}

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (a[i] !== "" && a[i] === a[i + 3] && a[i] === a[i + 6]) {
				setWinner(a[i])
			}
		}

		// Check diagonals
		if (a[0] !== "" && a[0] === a[4] && a[0] === a[8]) {
			setWinner(a[0])
		}
		if (a[2] !== "" && a[2] === a[4] && a[2] === a[6]) {
			setWinner(a[2])
		}

		// Check draw
		let hasBlanks: boolean
		for (let i = 0; i < 9; i++) {
			if (a[i] == "") {
				hasBlanks = true
			}
		}

		if (!hasBlanks && winner() === null) {
			setWinner("Draw")
		}
	}

	const handleRestart = () => {
		setGrid(["", "", "", "", "", "", "", "", ""])
		setTurn("X")
		setWinner(null)
	}

	createEffect(() => handleCheck(grid()))

	return (
		<main class="h-screen">
			<div class="absolute min-w-full flex justify-center items-center top-10">
				{winner() === "O" || winner() === "X" || winner() === "Draw" ? (
					<h1>
						{winner()} {winner() !== "Draw" ? "Won" : null}
					</h1>
				) : null}
			</div>
			<div class="flex justify-center items-center flex-col min-h-full min-w-full">
				<div>
					{[0, 3, 6].map((startIndex) => (
						<div class="flex">
							{grid()
								.slice(startIndex, startIndex + 3)
								.map((value, index) => (
									<div
										onClick={() => {
											handleClick(startIndex + index)
										}}
										class="p-1 border w-20 h-20 hover:cursor-pointer flex justify-center items-center"
									>
										<Cell key={startIndex + index} value={value} />
									</div>
								))}
						</div>
					))}
				</div>
				<div class="m-6">
					{winner() === "O" || winner() === "X" || winner() === "Draw" ? (
						<button onClick={handleRestart}>Play again?</button>
					) : null}
				</div>
			</div>
		</main>
	)
}

export default Game
