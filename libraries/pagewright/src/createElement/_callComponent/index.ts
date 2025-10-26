import type { Component, Props, ElementConfig } from "../../types/index.ts"

/*++
 + Calls a component function with props
 + Component is guaranteed to be a function by this point
 */
export default function _callComponent(component: Component) {
	return function _callComponentWithComponent(props: Props): ElementConfig {
		/*++
		 + [EXCEPTION] Type assertion required - we know component is function by this point
		 + createElement checks with isFunction before calling this helper
		 */
		return (component as (props: Props) => ElementConfig)(props)
	}
}
