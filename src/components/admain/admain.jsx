import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../admain/admain.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../jsonfile/admin.json";
import data1 from "../jsonfile/user.json";
import data2 from "../jsonfile/report.json";
import PropTypes from "prop-types";
import Instance, { refreshPage } from "../../axios_main";
import "../text/a-box.css";
const datas = data["games_data_adjusted"];
const datac = data1["user_data"];
const datad = data2["report_data"];

export default function Admin() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const [currentPagesss, setCurrentPagesss] = useState(1);
  const [currentPagessss, setCurrentPagessss] = useState(1);
  const [startIndex, setIndex] = useState((currentPage - 1) * itemsPerPage);
  const [startIndexs, setIndexs] = useState((currentPages - 1) * itemsPerPage);
  const [startIndexsss, setIndexsss] = useState(
    (currentPagesss - 1) * itemsPerPage
  );
  const [startIndexssss, setIndexssss] = useState(
    (currentPagessss - 1) * itemsPerPage
  );
  const [endIndex, setEnd] = useState(startIndex + itemsPerPage);
  const [endIndexs, setEnds] = useState(startIndexs + itemsPerPage);
  const [endIndexsss, setEndsss] = useState(startIndexsss + itemsPerPage);
  const [endIndexssss, setEndssss] = useState(startIndexssss + itemsPerPage);
  const [users, setUsers] = useState([]);
  const [userpage, setUserpage] = useState([]);
  const [report, setReport] = useState([]);
  const [game, setGame] = useState([]);
  const [unpublishgame, setUnpublishgame] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const displayedItem = datas.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIndex((currentPage - 2) * itemsPerPage);
      setEnd((currentPage - 1) * itemsPerPage);
    }
  };

  const handlePrevPages1 = () => {
    if (currentPages > 1) {
      setCurrentPages(currentPages - 1);
      setIndexs((currentPages - 2) * itemsPerPage);
      setEnds((currentPages - 1) * itemsPerPage);
    }
  };

  const handlePrevPages2 = () => {
    if (currentPagesss > 1) {
      setCurrentPagesss(currentPagesss - 1);
      setIndexsss((currentPagesss - 2) * itemsPerPage);
      setEndsss((currentPagesss - 1) * itemsPerPage);
    }
  };
  const handlePrevPages3 = () => {
    if (currentPagessss > 1) {
      setCurrentPagesss(currentPagessss - 1);
      setIndexsss((currentPagessss - 2) * itemsPerPage);
      setEndsss((currentPagessss - 1) * itemsPerPage);
    }
  };

  const handleNextPage = () => {
    if (endIndex < users.length) {
      setCurrentPage(currentPage + 1);
      setIndex(currentPage * itemsPerPage);
      setEnd(Math.min((currentPage + 1) * itemsPerPage, users.length));
    }
  };

  const handleNextPages1 = () => {
    if (endIndexs < users.length) {
      setCurrentPages(currentPages + 1);
      setIndexs(currentPages * itemsPerPage);
      setEnds(Math.min((currentPages + 1) * itemsPerPage, users.length));
    }
  };

  const handleNextPages2 = () => {
    if (endIndexsss < report.length) {
      setCurrentPagesss(currentPagesss + 1);
      setIndexsss(currentPagesss * itemsPerPage);
      setEndsss(Math.min((currentPagesss + 1) * itemsPerPage, report.length));
    }
  };
  const handleNextPages3 = () => {
    if (endIndexssss < report.length) {
      setCurrentPagesss(currentPagessss + 1);
      setIndexsss(currentPagessss * itemsPerPage);
      setEndsss(Math.min((currentPagessss + 1) * itemsPerPage, report.length));
    }
  };
  const approve_newgame = async (id) => {
    try {
      const requestData = { gameId: parseInt(id) };
      await Instance.patch("/games/confirm", requestData);
      const unpublishs = await Instance.get("/games/s");
      setUnpublishgame(unpublishs.data);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };
  const delete_newgame = async (id) => {
    try {
      const requestData = { gameId: parseInt(id) };
      await Instance.delete("/games/", { data: requestData });
      const unpublishs = await Instance.get("/games/s");
      setUnpublishgame(unpublishs.data);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };
  const delete_game = async (id) => {
    try {
      const requestData = { gameId: parseInt(id) };
      const res = await Instance.delete("/games/", { data: requestData });
      console.log(res.data);
      const responseGame = await Instance.get("/games/");
      setRefreshKey((prevKey) => prevKey + 1);
      setGame(responseGame.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    refreshPage();
    const fetchData = async () => {
      try {
        const responseReport = await Instance.get("/user/report");
        const responseData = await Instance.get("/user/allUser");
        const responseGame = await Instance.get("/games/");
        const unpublishs = await Instance.get("/games/s");
        console.log(responseReport.data);
        setGame(responseGame.data);
        setUnpublishgame(unpublishs.data);
        setReport(responseReport.data);
        setUsers(responseData.data);
        setUserpage(responseData.data.slice(startIndexs, endIndexs));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [startIndexs, endIndex, refreshKey]);

  const deleteReport = async (id) => {
    try {
      await Instance.patch("/user/update", {
        reportId: parseInt(id),
      });
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className="a-box"
        style={{ marginLeft: "1rem", marginBottom: "1rem" }}
      >
        <h2>
          <a>Admin Page</a>
        </h2>
      </div>
      {/* View User */}
      <div style={{ padding: "20px" }}>
        <Card className="greadient2-library">
          <CardContent>
            <h2>View User</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID user</th>
                    <th>Name user</th>
                    <th>Gmail user</th>
                    <th>User name</th>
                    <th>Tel user</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userpage.map((data1, i) => (
                    <tr key={i}>
                      <td>{data1.id}</td>
                      <td>{data1.name}</td>
                      <td>{data1.email}</td>
                      <td>{data1.username}</td>
                      <td>{data1.tel}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={handlePrevPages1}
                disabled={currentPages === 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn btn-success mx-2"
                onClick={handleNextPages1}
                disabled={endIndexs >= datac.length}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* View Game */}
      <div style={{ padding: "20px" }}>
        <Card className="greadient1-library">
          <CardContent>
            <h2>View Game</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name game</th>
                    <th>Id user</th>
                    <th>Game price</th>
                    <th>Category</th>
                    <th>Date time</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {game.slice(startIndex, endIndex).map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.userId}</td>
                      <td>{data.price}</td>
                      <td>{data.category}</td>
                      <td>{data.release}</td>
                      <td>
                        <button
                          onClick={() => delete_game(data.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn btn-success mx-2"
                onClick={handleNextPage}
                disabled={endIndex >= datas.length}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Report Order */}
      <div style={{ padding: "20px" }}>
        <Card className="greadient3-library">
          <CardContent>
            <h2>Report Order</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Details</th>
                    <th>Comment</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {report
                    .slice(startIndexssss, endIndexssss)
                    .map((data2, i) => (
                      <tr key={i}>
                        <td>{data2.problemType}</td>
                        <td>{data2.details}</td>
                        <td>{data2.comment}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              deleteReport(data2.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              deleteReport(data2.id);
                            }}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={handlePrevPages3}
                disabled={currentPagessss === 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn btn-success mx-2"
                onClick={handleNextPages3}
                disabled={endIndexsss >= datad.length}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ padding: "20px" }}>
        <Card className="greadient3-library">
          <CardContent>
            <h2>New game order</h2>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name game</th>
                      <th scope="col">Id user</th>
                      <th scope="col">Game price</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date time</th>
                      <th scope="col"></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpublishgame
                      .slice(startIndexssss, endIndexssss)
                      .map((data, i) => (
                        <tr key={i}>
                          <th scope="row">{data.name}</th>
                          <td>{data.userId}</td>
                          <td>{data.price}</td>
                          <td>{data.category}</td>
                          <td>{data.release}</td>

                          <td>
                            <button
                              onClick={() => delete_newgame(data.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => approve_newgame(data.id)}
                              className="btn btn-sm btn-success"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="button"
                className="btn  btn-primary"
                onClick={handlePrevPages3}
                disabled={currentPagessss === 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn  btn-success"
                onClick={handleNextPages3}
                disabled={endIndexsss >= datad.length}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>{" "}
    </div>
  );
}
