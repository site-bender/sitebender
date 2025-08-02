import type BaseProps from "../../../../types/index.ts"
import type ComputerLanguageProps from "../../../../types/Thing/Intangible/ComputerLanguage/index.ts"

import Intangible from "../index.tsx"

export type Props = ComputerLanguageProps & BaseProps

export default function ComputerLanguage({
	_type = "ComputerLanguage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
