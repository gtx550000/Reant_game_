import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import data1 from "../jsonfile/game.json";
import data2 from "../jsonfile/bank.json";

import "../bill/bill.css";

import { useNavigate } from "react-router";

const createData = (id, name, price, code) => {
  return { id, name, price, code };
};

export default function bill() {
  const navigate = useNavigate();

  // State declarations moved inside the functional component
  const [Showid, setShowid] = useState(1);
  const [Username, setUsername] = useState("user");
  const [Datatime, setDatatiemime] = useState("10:06:00 PM");
  const [Dataday, setDataday] = useState(new Date(10 / 3 / 2024));

  const datagame = data1["game"];
  const game = datagame.map((games) => {
    return createData(games.id, games.name, games.price, games.code);
  });

  const rows = game.map((game) => {
    return createData(game.id, game.name, game.price, game.code);
  });

  const library = () => navigate(`/library`);

  return (
    <div>
      <div className="container1">
        <form id="contact" action="" method="post">
          <h3>Bill</h3>
          <h4>ID User</h4>
          <fieldset>
            <input
              value={Showid}
              placeholder="Your ID"
              type="text"
              tabindex="1"
              required
              autofocus
              disabled
            />
          </fieldset>

          <h4>User Name</h4>
          <fieldset>
            <input
              value={Username}
              placeholder="Your User Name(optional)"
              type="tel"
              tabindex="3"
              required
              disabled
            />
          </fieldset>

          <h4>Time</h4>
          <fieldset>
            <input
              value={Datatime}
              placeholder="Your Data time (optional)"
              type="url"
              tabindex="4"
              required
              disabled
            />
          </fieldset>

          <h4>Date Time</h4>
          <fieldset>
            <input
              value={Dataday}
              placeholder="Your Data time (optional)"
              type="url"
              tabindex="4"
              required
              disabled
            />
          </fieldset>

          <h4>Game</h4>
          <fieldset>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Game Name</TableCell>
                    <TableCell align="right">ID game</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="center">{row.code}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </fieldset>

          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              onClick={() => library()}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
