import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import dir from './app'
import { totalOutputs } from './combination'
const canvas = createCanvas(160, 160)
const ctx = canvas.getContext('2d')

const drawImage = async (traitTypes, background, index) => {

  // draw background

  const backgroundIm = await loadImage(`${dir.background}/${background}`);

  ctx.drawImage(backgroundIm, 0, 0, 160, 160);


  const drawableTraits = traitTypes.filter(x => x.value !== 'N/A')

  // draw all the trait layers for this one image

  for (let index = 0; index < drawableTraits.length; index++) {

    const val = drawableTraits[index];

    const image = await loadImage(`${dir.traitTypes}/${val.trait_type}/${val.value}`);

    ctx.drawImage(image, 0, 0, 160, 160);

  }

  console.log(`Progress: ${index}/ ${totalOutputs}`)

  // save metadata
  fs.writeFileSync(

    `${dir.outputs}/metadata/${index}.json`,

    JSON.stringify({

      name: `image ${index}`,

      attributes: drawableTraits

    }),
  )

  // save image as png file

  fs.writeFileSync(
    `${dir.outputs}/images/${index}.png`,
    canvas.toBuffer("image/png")
  );

}

export default drawImage