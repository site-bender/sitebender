// @sitebender/arborist/demo/examples/Button
//++ Example button component

export type ButtonProps = Readonly<{
	label: string
	onClick: () => void
	disabled?: boolean
}>

//++ Renders a button component
export default function Button(props: ButtonProps) {
	return function renderButton(): JSX.Element {
		return (
			<button
				onClick={props.onClick}
				disabled={props.disabled}
				type="button"
			>
				{props.label}
			</button>
		)
	}
}
