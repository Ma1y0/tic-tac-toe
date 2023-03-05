import { type Component } from "solid-js"

type propsType = {
	value: "X" | "O" | ""
}

const Cell: Component = (props: propsType) => (
	<div class="h-16 w-16 flex items-center justify-center">
		<svg viewBox="0 0 100 100" class="h-16 w-16">
			{props.value === "X" ? (
				<>
					<line x1="20" y1="20" x2="80" y2="80" stroke="#f92f60" stroke-width="8" />
					<line x1="20" y1="80" x2="80" y2="20" stroke="#f92f60" stroke-width="8" />
				</>
			) : props.value === "O" ? (
				<circle cx="50" cy="50" r="40" stroke="#0074ba" stroke-width="8" fill="none" />
			) : null}
		</svg>
	</div>
)

export default Cell
