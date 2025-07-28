import BaseProps from "../../types/index.ts";

export default function Base({
	children: _,
	...props
}: BaseProps): JSX.Element {
	return (
		<pre>
			{JSON.stringify(props, null, 2)}
		</pre>
	);
}
