const baseurl = "https://nsdnotes1.onrender.com";

const handleDashboard = () => {
  fetch(`${baseurl}/notes`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.notes.forEach((item) => {
        document.getElementById("title").innerHTML = item.title;
        document.getElementById("body").innerHTML = item.body;
      });
    })
    .catch((error) => console.log(error));
};

handleDashboard();
