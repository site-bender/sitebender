/** @jsx createElement */

import createElement from "../../utilities/createElement/index.ts"
import formatTemplate from "./formatTemplate/index.ts"
import type { ElementAttributeMap } from "../../types/JSX/attributes/index.ts"

export interface BaseProps<T extends keyof ElementAttributeMap = "span"> {
    format?: string
    props: Record<string, unknown>
    element?: T
    children?: never
}

export default function Base<T extends keyof ElementAttributeMap = "span">({
    format,
    props,
    element = "span" as T,
    ...elementAttributes
}: BaseProps<T> & ElementAttributeMap[T]) {
    // Generate formatted content if format is provided
    const formattedContent = format
        ? formatTemplate(format, { props })
        : null

    const Element = element

    return formattedContent
        ? (
            <Element {...elementAttributes}>
                {formattedContent.map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </Element>
        )
        : (
            <Element {...elementAttributes}>
                <pre>{JSON.stringify(props, null, 2)}</pre>
            </Element>
        )
}
