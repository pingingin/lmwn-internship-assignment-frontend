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

app.get("/", (req, res) => res.status(200).json({
	restaurant : [{name: "Ekkamai Macchiato - Home Brewer",id: "227018"},
	 			{name: "ลืมเคี้ยว",id: "567051"}]
}));
app.get('/restaurants/:restaurantId', api.getRestaurant);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}
