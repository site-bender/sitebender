const pathsData = JSON.parse(Deno.readTextFileSync('paths.json'));
const result = {};

for (const [typeName, typeData] of Object.entries(pathsData)) {
    // Skip types with re-exports (multiple inheritance)
    if (typeData.reExports.length > 0) {
        continue;
    }
    
    // Parse the location to get inheritance chain
    const location = typeData.location;
    // Remove "/TypeName/index.ts" from the end
    const pathWithoutFile = location.replace(`/${typeName}/index.ts`, '');
    
    // Split into inheritance chain
    const inheritanceChain = pathWithoutFile.split('/');
    
    // Generate imports
    const imports = [];
    
    for (let i = 0; i < inheritanceChain.length; i++) {
        const ancestorType = inheritanceChain[i];
        const levelsUp = inheritanceChain.length - i;
        const relativePath = '../'.repeat(levelsUp) + 'index.ts';
        
        if (ancestorType === 'Thing') {
            // Thing gets default import
            imports.push(`import type Thing from "${relativePath}"`);
        } else {
            // Others get Props import
            imports.push(`import type { ${ancestorType}Props } from "${relativePath}"`);
        }
    }
    
    // Add to result
    result[typeName] = {
        location: typeData.location,
        reExports: typeData.reExports,
        imports: imports
    };
}

Deno.writeTextFileSync('paths-single.json', JSON.stringify(result, null, 2));
console.log(`Processed ${Object.keys(result).length} single inheritance types`);
