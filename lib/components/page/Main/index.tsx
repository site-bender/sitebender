import createElement from "../../../utilities/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	classes?: string[]
	route: string
}

export default function Main({ children, classes = [], ...props }: Props) {
	const clss = [...classes, "main"].join(" ")

	return (
		<main id="main-content" class={clss} {...props}>
			{children}
		</main>
	)
}
