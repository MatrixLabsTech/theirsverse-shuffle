# Theirsverse Provable Fairness
The goal of these measures is to ensure that the collection maintains its integrity and allows you to prove that the ordered collection remains unadulterated. 

## Prerequisites

Make sure you have installed `Node.js v16` on your machine

## Getting started

1. Install dependencies

    `npm install`

2. Run script to generate the shuffled metadata

    `npm start`
   
   This command will output the shuffled metadata to `output.json`, you can now find any token's metadata by searching the token Id in this file.
    
## How it works

1. First, we hash the raw metadata of each item using the SHA-256 algorithm and use this hash as the image name. Concat this hash with CloudFront URL (We used AWS CloudFront as the CDN for the images) and image suffix, and we can get the full image name.


    Before:
    ``` Json
    {
    "attributes": [
      { "trait_type": "background", "value": "Morandi" },
      { "trait_type": "bonus1", "value": "Mechanical Balls" },
      { "trait_type": "skin", "value": "Underground" },
      { "trait_type": "makeup", "value": "light Gothic" },
      { "trait_type": "hairstyle", "value": "Golden Gentry" },
      { "trait_type": "shoes", "value": "Original" },
      { "trait_type": "outfit", "value": "Warrior Suit" },
      { "trait_type": "accessory", "value": "Spell" },
      { "trait_type": "bonus2", "value": "Original" }
    ],
    "description": "Theirsverse has created a brand connecting Web 2 and Web 3. From NFT artworks to fashion toys and DTC beauty brands, Theirsverse would like to invite creators globally to co-create our brand together. We are founding a global young artists’ fund to promote more artists into the booming NFT world. We love the passionate artists across the world that share their knowledge and insights in the Theirsverse community. Theirsverse is an invitation to unlock your creative future!"
    }
    ```
    after:
    ``` Json
    {
    "attributes": [
      { "trait_type": "background", "value": "Morandi" },
      { "trait_type": "bonus1", "value": "Mechanical Balls" },
      { "trait_type": "skin", "value": "Underground" },
      { "trait_type": "makeup", "value": "light Gothic" },
      { "trait_type": "hairstyle", "value": "Golden Gentry" },
      { "trait_type": "shoes", "value": "Original" },
      { "trait_type": "outfit", "value": "Warrior Suit" },
      { "trait_type": "accessory", "value": "Spell" },
      { "trait_type": "bonus2", "value": "Original" }
    ],
    "description": "Theirsverse has created a brand connecting Web 2 and Web 3. From NFT artworks to fashion toys and DTC beauty brands, Theirsverse would like to invite creators globally to co-create our brand together. We are founding a global young artists’ fund to promote more artists into the booming NFT world. We love the passionate artists across the world that share their knowledge and insights in the Theirsverse community. Theirsverse is an invitation to unlock your creative future!",
    "image": "https://d3lhokgl3iqhiy.cloudfront.net/4962b737147e27d1436aa54415b7f6af8440702c54595862956a60ee4c409f19.png"
    }
    ```

2. Then we calculate the hash for each item metadata. We sort these metadata by the base64 value of each item's hash. In this way, we get the initial order of the metadata.

3. We use the Fisher-Yates shuffle algorithm, and use the deployment hash of the Theirsverse contract (see: https://etherscan.io/tx/0x55474a552e12d279ba85ff66d2d762a0cea35ac1d8d51ba4182dd3721fb62ac6) to generate the random seed. Finally, we get the shuffled metadata of all items. TokenId is the index of this shuffled metadata list. 

4. Now you can find any token's metadata in `output.json` by searching the token Id.
