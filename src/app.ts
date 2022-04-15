import fs from 'fs'
import { allPossibleCases, totalOutputs } from './combination'
import drawImage from './generate'
const dir = {
  traitTypes: `${__dirname}/Traits/traits_types`,
  outputs: `./outputs`,
  background: `${__dirname}/Traits/Background`
}

export default dir;

const priorities: string[] = ['Body', 'Head', 'Outfit', 'Headwear', 'Eyes', 'Mouth', 'Nose']


const recreateOutputDir = () => {
  if (fs.existsSync(dir.outputs)) {
    fs.rmSync(dir.outputs, { recursive: true });
  }

  fs.mkdirSync(dir.outputs);

  fs.mkdirSync(`${dir.outputs}/metadata`)

  fs.mkdirSync(`${dir.outputs}/images`)
}


const main = async () => {
  const traitTypesDir = dir.traitTypes;

  const types = fs.readdirSync(traitTypesDir)

  const traitTypes = priorities.concat(types.filter(x => !priorities.includes(x)))

    .map(traitType => (
      fs.readdirSync(`${traitTypesDir}/${traitType}/`)

        .map(value => {
          return { trait_type: traitType, value: value }

        })
        // .concat({ trait_type: traitType, value: 'N/A' })
    ));

  const backgrounds = fs.readdirSync(dir.background)


  const combinations = allPossibleCases(traitTypes)


  for (let n = 0; n < combinations.length; n++) {
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)]
    await drawImage(combinations[n], randomBackground, n);
  }

}

(() => {

  recreateOutputDir();

  main();

})();


const traitTypesDir = dir.traitTypes;

const types = fs.readdirSync(traitTypesDir)

const traitTypes = priorities.concat(types.filter(x => !priorities.includes(x)))

  .map(traitType => (
    fs.readdirSync(`${traitTypesDir}/${traitType}/`)

      .map(value => {
        return { trait_type: traitType, value: value }

      })
  ));





