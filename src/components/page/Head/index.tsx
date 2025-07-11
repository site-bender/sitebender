import createElement from "~utilities/createElement/index.ts"
import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	title?: string
	description?: string
	children?: unknown
}

export default function Head({
	children,
	title = "Default Title",
	description = "Default description",
}: Props) {
	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
			{children}
		</>
	)
}
