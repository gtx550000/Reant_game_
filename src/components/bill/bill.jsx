import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import data1 from "../jsonfile/game.json";

import "../bill/bill.css";
import { useData, DataContext } from "../contextprovider/provider";
import { useNavigate } from "react-router";
import Instance from "../../axios_main";
import { TimeClock } from "@mui/x-date-pickers";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
const createData = (id, name, price, code) => {
  return { id, name, price, code };
};

export default function Bill() {
  const navigate = useNavigate();
  const { order, setOrder, username, choice } = useData(DataContext);
  // State declarations moved inside the functional component
  const [Showid, setId] = useState(1);
  const [Username, setUsername] = useState("user");
  const [Datatime, setDatetime] = useState("10:06:00 PM");
  const [Dataday, setDataday] = useState(new Date(10 / 3 / 2024));

  const datagame = data1["game"];
  const game = datagame.map((games) => {
    return createData(games.id, games.name, games.price, games.code);
  });
  const [rows, setRows] = useState(
    game.map((game) => {
      return createData(game.id, game.name, game.price, game.code);
    })
  );

  const library = () => navigate(`/library`);
  const downloadBill = () => {
    const billContent = document.getElementById("bill-content");

    html2canvas(billContent).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "bill.png");
      });
    });
  };
  const FetchGame = async (id) => {
    try {
      const response = await Instance.get(`/bill/order/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return id + " not valid";
    }
  };
  useEffect(() => {
    const Fetchdata = async () => {
      console.log(order);
      if (choice == "cart") {
        try {
          const orderPromises = order.map((it) => FetchGame(it.orderId));
          const games = await Promise.all(orderPromises);
          const date = order[0].time.split("T");

          setDatetime(date[0]);
          setDataday(date[1]);

          const BillId = order.map((it) => it.id);
          console.log(order);
          const gamess = games.map((game) => {
            return createData(
              game["Game"].id,
              game["Game"].name,
              game["Game"].price,
              game.key
            );
          });
          setUsername(username);
          setRows(gamess);
          setId(BillId);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const games = await FetchGame(order.orderId);

          const date = new Date(order.time);
          setDatetime(date.getDate());
          setDataday(date.getTime());

          const BillId = order.orderId;
          console.log("time");

          const gamess = [
            createData(
              games["Game"].id,
              games["Game"].name,
              games["Game"].price,
              games.key
            ),
          ];

          setUsername(username);
          setRows(gamess);

          setId(BillId);
        } catch (error) {
          console.log(error);
        }
      }
      downloadBill();
    };
    Fetchdata();
  }, []);
  return (
    <div>
      <div id="bill-content">
        <div className="container1">
          <form id="contact" action="" method="post">
            <h3>Bill</h3>

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

            <h4>ID bill</h4>
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

            <h4>Date </h4>
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
        </div>{" "}
      </div>
    </div>
  );
}
