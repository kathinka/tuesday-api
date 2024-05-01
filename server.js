import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//import the data
import flowers from "./data/flowers.json";
import data from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//get all flowers
//http://localhost:8090/flowers
app.get("/flowers", (req, res) => {
  res.json(flowers);

}
);


app.get("/nominations" , (req, res) => {
  res.json(data);

});

// get films by year and winner
//http://localhost:8090/year/2020?won=true
app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const showWon = req.query.won;
  let nominationsFromYear = data.filter((item) => item.year_award === +year);

if (showWon) {
  nominationsFromYear = nominationsFromYear.filter((item) => item.win);
}

  res.json(nominationsFromYear);
});


// get one flower by id
app.get("/flowers/:flowerId", (req, res) => {
  const flowerId = req.params.flowerId;
  const flower = flowers.find((flower) => flower.id === +flowerId);
  if (flower) {
    res.json(flower);
  } else {
    res.status(404).send({ message: "Not found" });
  }
}

);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
