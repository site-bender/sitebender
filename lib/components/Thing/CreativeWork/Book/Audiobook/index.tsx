import type BaseProps from "../../../../../types/index.ts"
import type { AudiobookProps } from "../../../../../types/Thing/CreativeWork/Book/Audiobook/index.ts"

import Book from "../index.tsx"

export type Props = AudiobookProps & BaseProps

export default function Audiobook({
	duration,
	readBy,
	_type = "Audiobook",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Book
			{...props}
			_type={_type}
			subtypeProperties={{
				duration,
				readBy,
				...subtypeProperties,
			}}
		/>
	)
}
