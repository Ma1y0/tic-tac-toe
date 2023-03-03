import { type Component } from "solid-js"

type propsType = {
	value: "X" | "O" | ""
}

const Cell: Component = (props: propsType) => <p class="font-semibold text-4xl">{props.value}</p>

export default Cell
