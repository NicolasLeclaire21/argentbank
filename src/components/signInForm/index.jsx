import { useState } from "react";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  
  const getToken = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("jwt", result.body.token);
        setError(false);
        window.location = "/profile";
      })
      .catch((error) => {
        console.error("error", error);
        setError(true);
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle "></i>
      <h1>Sign In</h1>
      <form action="" onSubmit={getToken}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className={"input-error " + (error ? " " : "sr-only")}>
          Email or password invalid
        </div>
        <input type="submit" value="Sign In" className="sign-in-button" />
      </form>
    </section>
  );
}

export default SignInForm;