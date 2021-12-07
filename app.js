const express = require("express");
const { start } = require("repl");
const app = express();
const PORT = 3000;

let movies = [
  { id: 23, title: "Spiderman - Work from home", year: 2021 },
  { id: 86, title: "Avenger - Backend", year: 2025 },
];

app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello dari express");
});

// get all movie
app.get("/movie", (req, res) => {
  res.json(movies);
});

// get movie by id
app.get("/movie/:id", (req, res) => {
  const { id } = req.params;

  let movie = movies.find((item) => item.id == id);
  if (movie) {
    res.json(movie);
  } else {
    res.json("movie not found");
  }
});

// add movie
app.post("/movie" , (req, res) => {
  let movie = req.body
  console.log(movie)

  movies.push(movie)

  res.json("success added new movie")
})

// delete movie by id
app.delete("/movie/:id", (req, res) => {
  const {id} = req.params;
  
  let movie = movies.find((item) => item.id == id);
  if (movie) {
    movies.splice(movies.indexOf(movie),1)
    res.json(movies);
  } else {
    res.json("movie berhasil dihapus");
  }
});

// put/edit movie by id
app.put("/movie/:id", (req, res) => {
  const {id} = req.params;
  
  let movie = movies.find((item) => item.id == id);
  if (movie) {
    let editMovie = {
      id:movie.id,
      title:req.body.title,
      year:req.body.year
    }

    movies.splice(movies.indexOf(movie),1, editMovie)
    res.json("Edit Success");
  } else {
    res.json("Edit Failed");
  }
});


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// movie
// GET -> /movie -> Get All movie
// GET -> /movie/:id -> Get movie by id
// POST -> /movie -> add movie
// DELETE -> ... -> delete by id
// PUT -> ... -> update by id