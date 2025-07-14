import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [locale, setLocale] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [biography, setBiography] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { username, first_name, last_name, email, locale, phone_number, biography };

      const response = await fetch("http://localhost:5000/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/users/${data.user.id}`)
      } else {
        setError(data.message || "Failed to create account")
      }


    } catch (err) {
      console.error(err.message);
      setError("Network error. Please Try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Sign Up!</h1>
      <form onSubmit={onSubmitForm}>
        <div className="form-floating mb-3">
          <input
            className="form-control mt-5"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />
          <label for="floatingInput">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />
          <label for="floatingInput">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Locale"
            value={locale}
            onChange={e => setLocale(e.target.value)}
          />
          <label for="floatingInput">Locale</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="tel"
            placeholder="Phone Number"
            value={phone_number}
            onChange={e => setPhoneNumber(e.target.value)}
          />
          <label for="floatingInput">Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Biography"
            value={biography}
            onChange={e => setBiography(e.target.value)}
          />
          <label for="floatingInput">Biography</label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button 
          className="btn bg-primary text-white" 
          type="submit" 
          disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
      </form>
    </div>
  );
};

export default CreateUser;
