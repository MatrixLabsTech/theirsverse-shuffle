const pandemonium = require('pandemonium');
const seedrandom = require('seedrandom');
const { createHash } = require('crypto');
const fs = require('fs/promises');

const rawMetadata = require('./rawMetadata.json');

const cloudfrontUrl = 'https://d3lhokgl3iqhiy.cloudfront.net';
// the deployment hash of Theirsverse contract. see https://etherscan.io/tx/0x55474a552e12d279ba85ff66d2d762a0cea35ac1d8d51ba4182dd3721fb62ac6
const deploymentHash = '0x55474a552e12d279ba85ff66d2d762a0cea35ac1d8d51ba4182dd3721fb62ac6';

(async function shuffle() {
  rawMetadata.forEach((e) => {
    // generate image name based on the hash of raw metadata
    const imageName = createHash('sha256').update(JSON.stringify(e)).digest('hex');
    e.image = `${cloudfrontUrl}/${imageName}.png`;
  });
  // sort by hex hash of metadata use sha256
  rawMetadata.sort((a, b) =>
    createHash('sha256').update(JSON.stringify(a)).digest('base64') >
    createHash('sha256').update(JSON.stringify(b)).digest('base64')
      ? 1
      : -1
  );

  // generate seed use delpymentHash
  const seed = seedrandom(deploymentHash);
  // Fisher–Yates shuffle. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const customShuffle = pandemonium.createShuffleInPlace(seed);
  customShuffle(rawMetadata);
  rawMetadata.forEach((e, index)=> {
    e.tokenId = index;
  })
  await fs.writeFile('./output.json', JSON.stringify(rawMetadata));
})();