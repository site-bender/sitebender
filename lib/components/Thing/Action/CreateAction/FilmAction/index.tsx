import type BaseProps from "../../../../../types/index.ts"
import type { FilmAction as FilmActionProps } from "../../../../../types/index.ts"

import CreateAction from "../index.tsx"

export type Props = FilmActionProps & BaseProps

export default function FilmAction({
	_type = "FilmAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
