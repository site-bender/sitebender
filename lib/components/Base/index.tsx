import BaseProps from "../../types/index.ts"

const isJSXElement = (obj: unknown): obj is { type: unknown; props: unknown } =>
    obj !== null && 
    typeof obj === 'object' && 
    'type' in obj && 
    'props' in obj

const shouldSkipProperty = (key: string, value: unknown): boolean =>
    key === 'children' && Array.isArray(value) && value.length === 0

const flattenSubtypeProperties = (obj: Record<string, unknown>): Record<string, unknown> => {
    if ('subtypeProperties' in obj && typeof obj.subtypeProperties === 'object' && obj.subtypeProperties !== null) {
        const { subtypeProperties, ...rest } = obj
        return {
            ...rest,
            ...(subtypeProperties as Record<string, unknown>)
        }
    }
    return obj
}

const processProps = (obj: unknown): unknown => {
    if (obj === null || obj === undefined) {
        return obj
    }

    // Check if this is a rendered component (has type: "pre" with JSON children)
    if (isJSXElement(obj) && obj.type === 'pre' && obj.props && typeof (obj.props as any).children === 'string') {
        try {
            const parsed = JSON.parse((obj.props as any).children)
            return processProps(parsed)
        } catch {
            return obj
        }
    }

    if (isJSXElement(obj)) {
        return processProps(obj.props)
    }

    if (Array.isArray(obj)) {
        return obj.map(processProps)
    }

    if (typeof obj === 'object') {
        const processed = Object.entries(obj)
            .filter(([key, value]) => !shouldSkipProperty(key, value))
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: processProps(value)
            }), {})
        
        // Flatten subtypeProperties if present
        return flattenSubtypeProperties(processed)
    }

    return obj
}

export default function Base({
    children: _,
    ...props
}: BaseProps): JSX.Element {
    const processedProps = processProps(props)
    
    return (
        <pre>
            {JSON.stringify(processedProps, null, 2)}
        </pre>
    )
}
