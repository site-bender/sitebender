import isJsxElement from "../isJsxElement/index.ts"

export default function shouldSkipProperty(
    key: string,
    value: unknown,
): boolean {
    // Skip empty children arrays
    if (key === "children" && Array.isArray(value) && value.length === 0) {
        return true
    }

    // Skip children arrays that contain JSX elements (these should be processed as props, not children)
    if (key === "children" && Array.isArray(value)) {
        return value.some(child => isJsxElement(child))
    }

    return false
}
