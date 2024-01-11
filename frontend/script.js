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

//patch
const edit = document.getElementById("edit");
edit.addEventListener("click", (e) => {
  const idinp = document.createElement("input");
  idinp.type = "text";
  idinp.placeholder = "Enter note id....";
  const titleinp = document.createElement("input");
  titleinp.type = "text";
  titleinp.placeholder = "Enter note title....";
  const bodyinp = document.createElement("input");
  bodyinp.type = "text";
  bodyinp.placeholder = "Enter note body....";
  const change = document.getElementById("change");
  const btn = document.createElement("button");
  btn.dataset.id = "eddel";
  btn.innerHTML = "Submit";
  change.innerHTML = "";
  change.append(idinp, titleinp, bodyinp, btn);
  document.getElementById("eddel").addEventListener("click", (e) => {
    const noteID = "659edbf24ec7d0c635968563";
    const title = "natasha romanoff diaries";
    const body = "Natsha was a great fighter she fought her way to military";
    fetch(`${baseurl}/notes/update/${noteID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((error) => console.log(error));
  });
});

// delete
const del = document.getElementById("delete");
del.addEventListener("click", (e) => {
  const idinp = document.createElement("input");
  idinp.type = "text";
  idinp.placeholder = "Enter note id....";
  const change = document.getElementById("change");
  const btn = document.createElement("button");
  btn.id = "eddel";
  btn.innerHTML = "Submit";
  change.innerHTML = "";
  change.append(idinp, btn);
  document.getElementById("eddel").addEventListener("click", (e) => {
    const noteID = "659edbf24ec7d0c635968563";
    fetch(`${baseurl}/notes/delete/${noteID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((error) => console.log(error));
  });
});
