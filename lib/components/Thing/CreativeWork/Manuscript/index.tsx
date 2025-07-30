import type BaseProps from "../../../../types/index.ts"
import type ManuscriptProps from "../../../../types/Thing/CreativeWork/Manuscript/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ManuscriptProps & BaseProps

export default function Manuscript({
	_type = "Manuscript",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
