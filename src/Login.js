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
      <h2 class=" text-4xl font-bold mt-10">Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="mt-5">
          <label class="block mb-2">Email</label>
          <input
            class="text-xl p-3 w-96 rounded-lg bg-gray-100"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mt-5">
          <label class="block mb-2">Password</label>
          <input
            required
            class="p-3 w-96 text-xl bg-gray-100 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="error h-8 pt-6">{error && <p>{error}</p>}</div>

        <div class="button-container mt-10 ">
          {!isLoading && (
            <button class="px-6 py-3 uppercase rounded-lg tracking-wider w-96 bg-blue-400">
              Login
            </button>
          )}
          {isLoading && <button disabled>Logging in . . . </button>}
        </div>
        {loggedIn && <div className="success">You've logged in successfully !</div>}
      </form>
    </div>
  );
};

export default Login;

// email: eve.holt@reqres.in
// pwd:   cityslicka
