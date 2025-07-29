import flattenSubtypeProperties from "./flattenSubtypeProperties/index.ts"
import isJsxElement from "./isJsxElement/index.ts"
import shouldSkipProperty from "./shouldSkipProperty/index.ts"

export default function processProps(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
        return obj
    }

    // Handle JSX elements (components)
    if (isJsxElement(obj)) {
        console.log('🔍 Processing JSX element:', { type: obj.type, props: obj.props })
        const { type, props } = obj

        if (typeof type === 'function') {
            // For metadata components, extract their props directly to get schema data
            if (props && typeof props === 'object') {
                console.log('📦 Original props:', props)
                // Filter out component-specific props and process the schema data
                const { children, format, element, property, ...schemaProps } = props as any
                console.log('✂️ Schema props after filtering:', schemaProps)
                const result = processProps(schemaProps)
                console.log('✅ Final JSX result:', result)
                return result
            }
        }

        // Fallback: process the props directly
        return processProps(props)
    }

    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(processProps)
    }

    // Handle objects
    if (typeof obj === 'object') {
        const processed = Object.entries(obj)
            .filter(([key, value]) => !shouldSkipProperty(key, value))
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: processProps(value)
            }), {})

        return flattenSubtypeProperties(processed)
    }

    return obj
}
