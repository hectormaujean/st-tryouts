## Contact
Hector Maujean
hectormaujean@gmail.com

## Start the project

Clone the repository

Run `yarn install` or `npm install`

Launch the backend on port 3000 (should be default)

If you run into CORS issues (like I did), run `npm install cors` in the backend directory, and add the following snippet after `const  app = express();` at line 5 of the mock-backend.js file :

`const  corsOptions = {`
`	origin:  'http://localhost:3001',`
`	optionsSuccessStatus:  200`
`}`
`app.use(cors(corsOptions));`

I can also send you the updated backend if needed.

 Finally, run `yarn start` or `npm start` and [http://localhost:3001](http://localhost:3001) to the project in your browser.

## Stack

Although I'm used to Redux, I didn't use it here because it wasn't justified for this project - if anything, it would have just created boilerplate code.

I did not have the time to test the project, so don't expect to see anything if you run  `npm test`  

Stack: 

 - React project created with create-react-app (includes Babel and
   Webpack) 
   
 - Styling: styled-components & semantic-ui-react
 
 - Charts: Recharts

 - Linter & Formatting: eslint (Airbnb) + Prettier