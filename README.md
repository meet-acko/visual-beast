# visual-beast


## Commands

Firstly, we need to download and install all the dependencies from the NPMJS.
```
npm i
```
To execute the test file with playwright drivers run below command
```
npx playwright test --config=config/playwright.config.js tests/playwright_visual.test.js 
```

To execute the test file with jest framework drivers run below command
```
npm test tests/visual.test.js
```

To update snapshots run below command
```
npm test tests/visual.test.js -- -u
```
or
```
npm run update-snapshot tests/visual.test.js
```