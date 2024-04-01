import { useState } from "react";
import Bgvideo from "../media/VN.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../login/logins.css";
import Instance from "../../axios_main";
import { useNavigate } from "react-router";

/*14/3/24 */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useData, DataContext } from "../contextprovider/provider";
function Login() {
  /*14/3/24 */ const notify = () => toast.success("🦄 Welcome!");
  const navigate = useNavigate();
  const [isContainerActive, setContainerActive] = useState(false);
  const { setUserId, setUsername } = useData(DataContext);
  const [formreg, setformreg] = useState({
    name: "",
    username: "",
    password: "",
    tel: "",
    email: "",
  });
  const [formlog, setformlog] = useState({
    login: "",
    password: "",
  });
  const toggleContainer = () => {
    setContainerActive(!isContainerActive);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformreg((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setformlog((prevData) => ({ ...prevData, [name]: value }));
  };
  const loginsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Instance.post("/auth/login", formlog);

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUserId(response.data.id);
        navigate("/home");
      }
    } catch (error) {
      // Handle errors
      console.error(
        "Error registering user",
        error.response?.data || error.message
      );
    }
  };
  const registersubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Instance.post("/auth/", formreg);
      // Handle success, maybe redirect to login or dashboard
    } catch (error) {
      // Handle errors
      console.error(
        "Error registering user",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <body className="body-login">
        <video autoPlay loop muted className="back-video-login">
          <source src={Bgvideo} type="video/mp4" />
        </video>

        <div
          className={`container-login ${isContainerActive ? "active" : ""}`}
          id="container"
        >
          <div className="form-container-login sign-up-login">
            <form onSubmit={registersubmit}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formreg.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="User name"
                required
                name="username"
                value={formreg.username}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                placeholder="telephone number"
                required
                name="tel"
                value={formreg.tel}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formreg.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formreg.password}
                onChange={handleInputChange}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container-login sign-in-login">
            <form onSubmit={loginsubmit}>
              <h1>Sign In</h1>
              <span>or use your email password</span>
              <input
                type="text"
                placeholder="Email"
                name="login"
                value={formlog.login}
                onChange={handleInputChanges}
              />
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={formlog.password}
                onChange={handleInputChanges}
              />
              <a href="/forgot_password">Forget Your Password?</a>
              <button type="submit" onClick={notify}>
                Sign In
              </button>
              <ToastContainer />
              <div>
                <button>Google</button>
              </div>
            </form>
          </div>

          <div className="toggle-container-login">
            <div className="toggle-login">
              <div className="toggle-panel-login toggle-left-login">
                <h1>Welcome!</h1>
                <p>Enter your personal details to use all</p>
                <button className="hidden" id="login" onClick={toggleContainer}>
                  Sign In
                </button>
              </div>

              <div className="toggle-panel-login toggle-right-login">
                <h1>Hello, Friend!</h1>
                <p>Register and joy me!</p>
                <button
                  className="hidden"
                  id="register"
                  onClick={toggleContainer}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
