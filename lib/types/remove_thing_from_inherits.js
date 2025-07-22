const pathsData = JSON.parse(Deno.readTextFileSync('paths-final.json'));

let modifiedCount = 0;

for (const [typeName, typeData] of Object.entries(pathsData)) {
    if (typeData.inheritsFrom) {
        // Remove "Thing" from the inheritsFrom array
        const originalLength = typeData.inheritsFrom.length;
        typeData.inheritsFrom = typeData.inheritsFrom.filter(type => type !== 'Thing');
        
        if (typeData.inheritsFrom.length < originalLength) {
            modifiedCount++;
        }
    }
}

Deno.writeTextFileSync('paths-final.json', JSON.stringify(pathsData, null, 2));
console.log(`Removed Thing from inheritsFrom arrays in ${modifiedCount} types`);
