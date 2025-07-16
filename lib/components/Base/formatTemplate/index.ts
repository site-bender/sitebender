import type { FormatContext } from "../../../types/formatters/index.ts"

import { FORMATS } from "./formatConstants/index.ts"
import isUserDefinedFormat from "./isUserDefinedFormat/index.ts"
import processTemplate from "./processTemplate/index.ts"
import FORMATTERS from "./processTemplate/formatters/index.ts"

export default function formatTemplate(
    format: string,
    context: FormatContext,
): (string | JSX.Element)[] {
    const fullContext = { ...context, formatters: FORMATTERS }

    if (!isUserDefinedFormat(format)) {
        // This is a predefined format - look it up in constants
        const predefinedFormat = FORMATS[format as keyof typeof FORMATS]
        if (predefinedFormat) {
            return processTemplate(predefinedFormat, fullContext)
        }
        // Fallback if format not found
        return [format]
    }

    return processTemplate(format, fullContext)
}
