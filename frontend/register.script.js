const baseurl = "https://nsdnotes1.onrender.com";

const handleRegister = () => {
  fetch(`${baseurl}/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      pass: document.getElementById("pass").value,
      email: document.getElementById("email").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.href = "./login.html";
    })
    .catch((error) => console.log(error));
};
