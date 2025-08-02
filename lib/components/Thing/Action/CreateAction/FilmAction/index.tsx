import type BaseProps from "../../../../../types/index.ts"
import type FilmActionProps from "../../../../../types/Thing/Action/CreateAction/FilmAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = FilmActionProps & BaseProps

export default function FilmAction({
	_type = "FilmAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreateAction>
	)
}
