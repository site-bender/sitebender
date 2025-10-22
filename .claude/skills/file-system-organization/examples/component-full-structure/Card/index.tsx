import _Div from "./_Div/index.tsx"
import _H2 from "./_H2/index.tsx"

export type Props = {
	readonly title: string
	readonly children?: JSX.Element | Array<JSX.Element>
}

//++ Displays a card component with title and content
export default function Card(props: Props) {
	return (
		<_Div class="pw-card">
			<_H2>{props.title}</_H2>
			{props.children}
		</_Div>
	)
}
