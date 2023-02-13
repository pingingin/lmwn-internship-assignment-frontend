import express, { Application } from "express";


import api from './api'

const cors = require('cors');
const app: Application = express();
const port = 3001;

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({"restaurant" : ["567051", "227018"]}));
app.get('/restaurants/:restaurantId', api.getRestaurant);
app.get('/restaurants/:restaurantId/menus/:menuName/short', api.getShortMenu);
app.get('/restaurants/:restaurantId/menus/:menuName/full', api.getFullMenu);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}
