const { jsonSchemaToZod } = require('json-schema-to-zod');
const fs = require('fs');
const path = require('path');
const { Z_ASCII } = require('zlib');

const schemaPath = path.resolve(
  __dirname,
  '../../json_schema/Entity and Component Definitions/jsonschema',
);

const outputDir = path.resolve(__dirname, 'src/schemas');

let indexContents = '';

const indexImportPath = path.relative(outputDir, schemaPath);

async function main() {
  const { default: camelCase } = await import('camelcase');

  function handleJsonFile(schemaFilename) {
    const jsonPath = path.join(schemaPath, schemaFilename);
    const json = fs.readFileSync(jsonPath);
    const parsedJson = JSON.parse(json);
    let module = jsonSchemaToZod(parsedJson);

    const camelized = camelCase(parsedJson.title);
    const pascalized = camelCase(parsedJson.title, { pascalCase: true });

    indexContents += `import ${camelized} from '${indexImportPath}/${schemaFilename}';\n`;

    const outputFilename = camelized + '.ts';
    const outputPath = path.join(outputDir, outputFilename);

    module = module.replace('export default ', `const ${camelized} = `);

    module += `\nexport default ${camelized};\n`;

    module += `\nexport type ${pascalized} = z.infer<typeof ${camelized}>;\n`;

    fs.writeFileSync(outputPath, module);
  }

  const jsonFiles = fs.readdirSync(schemaPath);

  jsonFiles.forEach(handleJsonFile);

  indexContents += '\n';

  indexContents += 'export const getJsonSchema = (componentType: string) => {\n';
  indexContents += '  switch(componentType) {\n';

  jsonFiles.forEach((schemaFilename) => {
    const schemaName = schemaFilename.split('.json')[0];
    const camelized = camelCase(schemaName);

    indexContents += `    case '${schemaName}':\n`;
    indexContents += `      return ${camelized};\n`;
  });

  indexContents += '  }\n';
  indexContents += '};\n';

  const indexPath = path.join(outputDir, 'index.ts');
  fs.writeFileSync(indexPath, indexContents);

  console.log('INDEX: \n', indexContents);
}

main();
