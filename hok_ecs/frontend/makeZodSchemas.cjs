const { jsonSchemaToZod } = require('json-schema-to-zod');
const fs = require('fs');
const path = require('path');
const { Z_ASCII } = require('zlib');

const schemaPath = path.resolve(
  __dirname,
  '../../json_schema/Entity and Component Definitions/jsonschema',
);

const outputDir = path.resolve(__dirname, 'src/schemas');

async function main() {
  const { default: camelCase } = await import('camelcase');

  function handleJsonFile(schemaFilename) {
    const jsonPath = path.join(schemaPath, schemaFilename);
    const json = fs.readFileSync(jsonPath);
    const parsedJson = JSON.parse(json);
    let module = jsonSchemaToZod(parsedJson);

    const camelized = camelCase(parsedJson.title);
    const pascalized = camelCase(parsedJson.title, { pascalCase: true });
    const outputFilename = camelized + '.ts';
    const outputPath = path.join(outputDir, outputFilename);

    module = module.replace('export default ', `const ${camelized} = `);

    module += `\nexport default ${camelized};\n`;

    module += `\nexport type ${pascalized} = z.infer<typeof ${camelized}>;\n`;

    fs.writeFileSync(outputPath, module);
  }

  fs.readdirSync(schemaPath).forEach(handleJsonFile);
}

main();
