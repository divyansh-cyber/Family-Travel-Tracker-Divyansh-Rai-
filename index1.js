import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Divyansh@123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1; //first user assuming that the first user id in the users table is 1.
let users = [
  // { id: 1, name: "Assistant", color: "teal" } - user object structure
];
let error = ""; //declare error variable

async function checkVisisted() {
  let usersTable = await db.query("SELECT * FROM users");
  users = usersTable.rows;
  const result = await db.query(
  `SELECT countries.country_code FROM visited_countries
  JOIN users ON visited_countries.user_id = users.id
  JOIN countries ON visited_countries.country_id = countries.id
  WHERE user_id = $1`, [currentUserId]
  );
  console.log("checkVisited: ", result.rows);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
async function getCurrentUserColor() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  const currentUser = users.find((user) => user.id == currentUserId);

  // If currentUser exists, return its color; otherwise, return null
  return currentUser ? currentUser.color : null;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  console.log("Countries per user: ",countries);
  console.log("Users: ", users);
  //get color based on current user.
  const userColor = await getCurrentUserColor();
  console.log("User color: ", userColor);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: userColor,
    error: error,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_code) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    console.log("Selected contry id: ", result.rows);
    //Ensure that only one country is returned from db before proceeding
    if (result.rows.length > 1) {
      error = "Enter a more specific country";
      res.redirect("/");
    } else {
      const data = result.rows[0].id;      
      try {
        await db.query(
          "INSERT INTO visited_countries (user_id, country_id) VALUES ($1, $2)",
          [currentUserId, data]
        );
        error = "";
        res.redirect("/");
      } catch (err) {
        console.log(err);
        error = "Country already added";
        res.redirect("/");
      }
    }
  } catch (err) {
    console.log("Error occured: ", err);
    error = "Country does not exist";
    res.redirect("/");
  }
});
app.post("/user", async (req, res) => { 
  //check if req.body.add is truthy 
  if (req.body.add) {
    res.render("new.ejs");    
  } else{
    currentUserId = +(req.body.user);
    res.redirect("/");
    console.log("/user: ", currentUserId);
  }
});

app.post("/new", async (req, res) => {
  console.log("newUser: ",req.body);
  const user = req.body.name;
  const color = req.body.color;
  let error2;
  try {
    const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;", [user, color])
    console.log("After newUser insert: ", result.rows);
    currentUserId = result.rows.id;
    error2 = "";
    res.redirect("/");
  } catch (err) {
    console.log("/new: ", err);
    error2 = "User already exists";
    res.render("new.ejs", {error2: error2})
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
