import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../admain/admain.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PropTypes from "prop-types";

export default function library(props) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const items = props.items;

  const displayedItems = items.slice(startIndex, endIndex);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    <a href="/gamedetail"></a>;
  };

  return (
    <div className="">
      <div
        style={{
          fontSize: "40px",
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          top: "100px",
        }}
      >
        Admin Page
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          padding: "10px 0px 3px 50px",
        }}
      >
        <Card
          sx={{ height: 60 + "", width: 140 + "vh" }}
          className="greadient2-library"
        >
          <CardContent>
            <div class="">
              <div class="">
                <div class="">
                  <h5 class="">View User</h5>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">ID user</th>
                            <th scope="col">Name user</th>
                            <th scope="col">Gmail user</th>
                            <th scope="col">User name</th>
                            <th scope="col">Tel user</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>cat gg</td>
                            <td>johndoe@gmail.com</td>
                            <td>cat</td>
                            <td>0123974582</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Kit Big</td>
                            <td>jacob.monroe@company.com</td>
                            <td>ประยุท</td>
                            <td>016497459</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>Bootstrap 5</td>
                            <td>johndoe@gmail.com</td>
                            <td>b5</td>
                            <td>0397456201</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Bootstrap UI </td>
                            <td>jacob.monroe@company.com</td>
                            <td>kk</td>
                            <td>0316745201</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>Dashboard</td>
                            <td>johndoeEZ56@gmail.com</td>
                            <td>Aug</td>
                            <td>697403458</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Pixel</td>
                            <td>jacob.monroe69@company.com</td>
                            <td>เล็กจัง</td>
                            <td>0978456010</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <a href="#" class="btn btn-library">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "",
          padding: "5px 0px 60px 50px",
        }}
      >
        <Card
          sx={{ height: 60 + "", width: 140 + "vh" }}
          className="greadient1-library"
        >
          <CardContent>
            <div class="">
              <div class="">
                <div class="">
                  <h5 class="">View Game</h5>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Name game</th>
                            <th scope="col">Name team</th>
                            <th scope="col">Game price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date time</th>
                            <th scope="col"></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">METAL GEAR SOLID V</th>
                            <td>KONAMI</td>
                            <td>1,800</td>
                            <td>Action</td>
                            <td>Aug 31 2020</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Red Dead Redemption 2</th>
                            <td>Rockstar Games</td>
                            <td>1,900</td>
                            <td>ACtion</td>
                            <td>Dec 6 2019</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Ghost Recon® Breakpoint</th>
                            <td>Ubisoft</td>
                            <td>1,600</td>
                            <td>FPS</td>
                            <td>Sep 26 2023</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">HELLDIVERS™ 2</th>
                            <td>Arrowhead Game Studios</td>
                            <td>1,290</td>
                            <td>FPS</td>
                            <td>Mar 12 2024</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Train Valley 2</th>
                            <td>Alexey Davydov</td>
                            <td>360</td>
                            <td>PUZZLE</td>
                            <td>MAr 13 2019</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              STAR WARS™: Battlefront Classic Collection
                            </th>
                            <td>Aspyr</td>
                            <td>600</td>
                            <td>FPS</td>
                            <td>Aug 28 2024</td>
                            <td>
                              <a href="#" class="btn btn-sm btn-primary">
                                View
                              </a>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Approve
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <a href="#" class="btn btn-library">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <button
        type="button"
        className=""
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <div>
          <a href="">Back</a>
        </div>
      </button>
      <button
        type="button"
        className=""
        onClick={handleNextPage}
        disabled={endIndex >= items.length}
      >
        <div>
          <a href="">Next</a>
        </div>
      </button>
    </div>
  );
}
