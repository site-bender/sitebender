import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"

async function fixChildrenAsProps(filePath: string): Promise<boolean> {
    const content = await Deno.readTextFile(filePath)
    
    // Skip Base component - it's the final destination
    if (filePath.includes('/Base/index.tsx')) {
        return false
    }
    
    let fixed = content
    let wasChanged = false
    
    // Pattern 1: Remove Fragment wrapping and spread syntax
    // <SomeComponent><>{...children}</></SomeComponent>
    const fragmentPattern = /(<(\w+)([^>]*?)>)<>\{\.\.\.children\}<\/>\s*<\/\2>/g
    if (fragmentPattern.test(content)) {
        fixed = fixed.replace(fragmentPattern, '$1$3 children={children} />')
        wasChanged = true
    }
    
    // Pattern 2: Standard JSX children
    // <SomeComponent>{children}</SomeComponent>
    const standardPattern = /(<(\w+)([^>]*?)>)\{children\}\s*<\/\2>/g
    if (standardPattern.test(fixed)) {
        fixed = fixed.replace(standardPattern, '$1$3 children={children} />')
        wasChanged = true
    }
    
    // Pattern 3: Self-closing with children prop already
    // Make sure we don't duplicate children prop
    const duplicateChildrenPattern = /(\w+)([^>]*?)\s+children=\{children\}([^>]*?)\s+children=\{children\}/g
    if (duplicateChildrenPattern.test(fixed)) {
        fixed = fixed.replace(duplicateChildrenPattern, '$1$2 children={children}$3')
        wasChanged = true
    }
    
    if (wasChanged) {
        await Deno.writeTextFile(filePath, fixed)
        return true
    }
    
    return false
}

async function main() {
    let fixedCount = 0
    const fixedFiles: string[] = []
    
    for await (const entry of walk("lib/components", { 
        exts: [".tsx"], 
        includeDirs: false 
    })) {
        if (entry.name === "index.tsx") {
            try {
                const wasFixed = await fixChildrenAsProps(entry.path)
                if (wasFixed) {
                    console.log(`✅ Fixed children as props: ${entry.path}`)
                    fixedFiles.push(entry.path)
                    fixedCount++
                }
            } catch (error) {
                console.error(`❌ Error fixing ${entry.path}:`, error.message)
            }
        }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} files to use children as props`)
    console.log('\nFixed files:')
    fixedFiles.forEach(file => console.log(`  - ${file}`))
}

if (import.meta.main) {
    main()
}