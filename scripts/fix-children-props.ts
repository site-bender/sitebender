import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"

async function fixComponent(filePath: string): Promise<boolean> {
    const content = await Deno.readTextFile(filePath)

    // Skip if already has children extraction and JSX children
    if (content.includes("children,") && content.includes(">{children}<")) {
        return false
    }

    // Skip Base component
    if (filePath.includes("/Base/")) {
        return false
    }

    // Look for the specific pattern in your components
    // Pattern: function signature with destructuring ending in ...props
    const functionRegex = /(export default function \w+\(\s*\{\s*)([\s\S]*?)(\s*\.\.\.props\s*\}\s*:\s*Props[^)]*\)\s*\{)/
    const functionMatch = content.match(functionRegex)

    if (!functionMatch) {
        return false
    }

    const [, beforeProps, middleProps, afterProps] = functionMatch

    // Add children before ...props
    const newFunction = `${beforeProps}${middleProps}\n\t\tchildren,${afterProps}`

    // Look for return statement with self-closing JSX
    const returnRegex = /(return \(\s*<)(\w+)(\s+\{\.\.\.props\}[^>]*?)(\s*\/>\s*\))/s
    const returnMatch = content.match(returnRegex)

    if (!returnMatch) {
        return false
    }

    const [, beforeJSX, componentName, jsxProps, afterJSX] = returnMatch

    // Convert to opening/closing tags with children
    const newReturn = `${beforeJSX}${componentName}${jsxProps}>\n\t\t\t{children}\n\t\t</${componentName}>\n\t)`

    // Apply both changes
    let newContent = content.replace(functionRegex, newFunction)
    newContent = newContent.replace(returnRegex, newReturn)

    await Deno.writeTextFile(filePath, newContent)
    return true
}

async function fixDuplicateChildren(filePath: string): Promise<boolean> {
    const content = await Deno.readTextFile(filePath)

    // Look for duplicate children parameters
    const duplicatePattern = /(\{\s*[^}]*children[^}]*,\s*children[^}]*\})/s

    if (!duplicatePattern.test(content)) {
        return false
    }

    console.log(`Found duplicate children in: ${filePath}`)

    // Remove the duplicate children parameter (keep the first one)
    const fixed = content.replace(
        /(\{\s*[^}]*)(children[^,}]*,\s*)(.*?)(children[^,}]*)(.*?\})/s,
        (match, start, firstChildren, middle, secondChildren, end) => {
            // Keep the first children, remove the second
            return `${start}${firstChildren}${middle}${end}`
        }
    )

    await Deno.writeTextFile(filePath, fixed)
    return true
}

async function main() {
    let fixedCount = 0
    let skippedCount = 0

    for await (const entry of walk("lib/components", {
        exts: [".tsx"],
        includeDirs: false
    })) {
        if (entry.name === "index.tsx") {
            try {
                const wasFixed = await fixComponent(entry.path)
                if (wasFixed) {
                    console.log(`✅ Fixed: ${entry.path}`)
                    fixedCount++
                } else {
                    console.log(`⏭️  Skipped: ${entry.path}`)
                    skippedCount++
                }
            } catch (error) {
                console.error(`❌ Error fixing ${entry.path}:`, error.message)
            }
        }
    }

    console.log(`\n🎉 Fixed ${fixedCount} components, skipped ${skippedCount}`)
}

if (import.meta.main) {
    main()
}
