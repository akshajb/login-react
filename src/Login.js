import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const creds = { email, password };
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sorry, Could not login.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setError(null);
        setLoggedIn(true);
      })
      .catch((error) => {
        setError(error.message);
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && <button>Login</button>}
        {isLoading && <button disabled>Logging in . . . </button>}

        {loggedIn && (
          <div className="success">You've logged in successfully !</div>
        )}
      </form>
    </div>
  );
};

export default Login;

// email: eve.holt@reqres.in
// pwd:   cityslicka
