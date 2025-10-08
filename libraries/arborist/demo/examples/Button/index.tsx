//++ Generic button component with variants
//++ Follows semantic component usage patterns
//++ Returns configured button element

type ButtonProps = Readonly<{
	label: string
	variant: "primary" | "secondary" | "danger"
	disabled?: boolean
}>

export default function Button(props: ButtonProps) {
	return function renderButton() {
		const className = `button button-${props.variant}`
		const isDisabled = props.disabled ?? false

		return (
			<button className={className} disabled={isDisabled} type="button">
				{props.label}
			</button>
		)
	}
}
