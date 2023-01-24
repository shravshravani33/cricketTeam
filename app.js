const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
module.exports = app;
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, async () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//Get players
app.get("/players/", async (request, response) => {
  const getPlayers = `
    SELECT
    *
    FROM 
    cricket_team
    `;
  const playerDetails = await db.all(getPlayers);
  response.send(playerDetails);
});

//Post player
app.post("/playerses/", async (request, response) => {
  const playerDetails = request.body;
  const { playerId, playerName, jerseyNumber, role } = playerDetails;
  const postPlayer = `
    INSERT INTO 
       cricket_team(playerId,playerName,jerseyNumber,role)
  VALUES(
    '${player_name}',
    '${jersey_number}',
    '${role}',
    '${player_id}'
  );`;
  const pDetails = await db.run(postPlayer);
  console.log(pDetails);
  respond.send(pDetails);
});
