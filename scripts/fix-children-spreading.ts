import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"

async function fixChildrenSpreading(filePath: string): Promise<boolean> {
    const content = await Deno.readTextFile(filePath)

    // Better regex that preserves the closing tag
    const fixed = content.replace(
        />\{children\}</g,
        '><>{...children}</>'
    )

    if (fixed !== content) {
        await Deno.writeTextFile(filePath, fixed)
        return true
    }

    return false
}

async function main() {
    let fixedCount = 0

    for await (const entry of walk("lib/components", {
        exts: [".tsx"],
        includeDirs: false
    })) {
        if (entry.name === "index.tsx") {
            try {
                const wasFixed = await fixChildrenSpreading(entry.path)
                if (wasFixed) {
                    console.log(`✅ Fixed children spreading: ${entry.path}`)
                    fixedCount++
                }
            } catch (error) {
                console.error(`❌ Error fixing ${entry.path}:`, error.message)
            }
        }
    }

    console.log(`\n🎉 Fixed ${fixedCount} files with children spreading`)
}

main()
