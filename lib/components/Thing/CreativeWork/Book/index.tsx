import type BaseProps from "../../../../types/index.ts"
import type { Book as BookProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BookProps & BaseProps & { name?: string | null }

export default function Book({
	_type = "Book",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
