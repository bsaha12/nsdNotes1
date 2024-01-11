const baseurl = "https://nsdnotes1.onrender.com";

const handleLogin = () => {
  fetch(`${baseurl}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      pass: document.getElementById("pass").value,
      email: document.getElementById("email").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      location.href = "./index.html";
    })
    .catch((error) => console.log(error));
};
