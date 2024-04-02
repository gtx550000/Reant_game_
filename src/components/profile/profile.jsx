import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import "../profile/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Instance, { refreshPage } from "../../axios_main";

export default function Profile() {
  const notify = () =>
    toast.success("😉 Wow so easy!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  const notify1 = () =>
    toast.error("😨 Sorry bro", { position: "bottom-right", autoClose: 3000 });
  const [user, setUser] = useState({
    username: "baba",
    email: "baba",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentpassword, setcurrentPassword] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState();
  const [profileuse, setProfileuse] = useState();
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlecurrentPassword = (event) => {
    setcurrentPassword(event.target.value);
  };
  const handleNumber = (event) => {
    setPhonenum(event.target.value);
  };

  const handlenewPassword = (event) => {
    setnewPassword(event.target.value);
  };
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setProfileuse(URL.createObjectURL(event.target.files[0]));
  };
  const reset_image = () => {
    setProfileuse(profile);
    document.getElementById("fileInput").value = ""; // Clear the file input
    document.getElementById("fileInput").dispatchEvent(new Event("change")); // Trigger change event
  };

  const handleSubmit = async () => {
    if (password != "") {
      let requestData = {
        password: currentpassword,
        newpassword: password,
        Confirmpassword: newpassword, // Assuming the user enters the new password twice for confirmation
      };
      try {
        Instance.patch("/user/password", requestData);
        toast.success("Password updated successfully");
        setnewPassword("");
        setPassword("");
      } catch (err) {
        console.error(err);
      }
    }
    let requestData = {
      name: user.name,
      username: username != "" ? username : user.username,
      tel: phonenum != "" ? phonenum : user.tel,
      email: user.email,
    };
    console.log(requestData);
    try {
      const response = Instance.patch("/user/information", requestData);
      console.log(response.data["error"]);
      toast.success("Information updated successfully");
      setPassword("");
      setnewPassword("");
      setcurrentPassword("");
    } catch (error) {
      console.error(error);
    }
    if (file) {
      try {
        const formData = { photo: file };

        Instance.post("/user/photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
      setFile(null);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        refreshPage();
        const response = await Instance.get("/user/");
        const response_profile = await Instance.get("/user/profileUser", {
          responseType: "arraybuffer",
        });
        const base64String = btoa(
          new Uint8Array(response_profile.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64String}`;
        setUser(response.data);
        setProfile(url);
        setProfileuse(url);
        setUsername(response.data.username);
        setPhonenum(response.data.tel);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <body>
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className="list-group-item list-group-item-action active"
                  data-toggle="list"
                  href="#account-general"
                >
                  General
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-change-password"
                >
                  Change password
                </a>
              </div>
            </div>

            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="account-general">
                  <div className="card-body media align-items-center">
                    <img src={profileuse} alt className="d-block ui-w-80" />
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Upload new photo
                        <input
                          type="file"
                          className="account-settings-fileinput"
                          id="fileInput"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </label>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-default md-btn-flat"
                        onClick={() => reset_image()}
                      >
                        Reset
                      </button>
                      <div className="small mt-1">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </div>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.name}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={username}
                        onChange={handleUsername}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={phonenum}
                        onChange={handleNumber}
                      />
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="account-change-password">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={currentpassword}
                        onChange={handlecurrentPassword}
                      />

                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={newpassword}
                        onChange={handlenewPassword}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save changes
          </button>
          &nbsp;
          <ToastContainer />
        </div>
      </div>
      <script
        data-cfasync="false"
        src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      ></script>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      <script type="text/javascript"></script>
    </body>
  );
}
