## Installation

```
npm install --save google-distance-matrix
```

## Example
```javascript
const aobGoogleDistanceMatrix = require('aob-google-distance-matrix')

const DistanceMatrix = new aobGoogleDistanceMatrix('GOOGLE_API_KEY')

DistanceMatrix.origins(['', ''])
    .destinations([])
    .get((error, result) => {
        if (!error) {
            console.log(result)
        }
    })
```
