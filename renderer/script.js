let { ipcRenderer } = require("electron");

let title = document.getElementById("title");
let note = document.getElementById("note");
let btn = document.getElementById("btn");
let list = document.getElementById("list");

let notes = [];

function loadNotes() {
  list.innerHTML = "";
  notes.forEach((note, idx) => {
    list.innerHTML += `
            <div class="list_ele">
                <h1>${idx} ${note.title} </h1>
                <p> ${note.note} </h1>
            </div>
        `;
  });
}

window.onload = async () => {
  notes = await ipcRenderer.invoke("get_data");
  loadNotes();
};

btn.onclick = () => {
  if (title !== "" && note !== "") {
    let _note = {
      title: title.value,
      note: note.value,
    };

    notes.push(_note);
    loadNotes();

    ipcRenderer.send("save_note", _note);
  } else {
    window.alert("please fill all the things and try again");
  }
};
