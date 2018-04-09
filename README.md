## Installation

```
npm install --save aob-google-distance-matrix
```

## Example
```javascript
const aobGoogleDistanceMatrix = require('aob-google-distance-matrix')

const DistanceMatrix = new aobGoogleDistanceMatrix('GOOGLE_API_KEY')

DistanceMatrix.origins(['Kanchanaburi', '18.788391,98.985392'])
    .destinations(['Bangkok'])
    .get((error, result) => {
        if (!error) {
            console.log(result)
        }
    })
```
