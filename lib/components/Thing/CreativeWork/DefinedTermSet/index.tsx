import type BaseProps from "../../../../types/index.ts"
import type DefinedTermSetProps from "../../../../types/Thing/CreativeWork/DefinedTermSet/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DefinedTermSetProps & BaseProps

export default function DefinedTermSet({
	hasDefinedTerm,
	_type = "DefinedTermSet",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				hasDefinedTerm,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
