const submit = document.querySelector("#add");
const form = document.getElementById("modal");
const open = document.querySelector(".openForm");
const span = document.getElementsByClassName("close")[0];

let yotsubato = document.querySelector(".yotsubato");
let shirokuma = document.querySelector(".shirokuma");
let takagi = document.querySelector(".takagi");
let onepiece = document.querySelector(".onepiece");
let gantz = document.querySelector(".gantz");
let kami = document.querySelector(".kami");

let myLibrary = [];
let counter = 0;

let savedMangas = JSON.parse(localStorage.getItem("mangas"));

let loadMangas = function () {
  if (savedMangas.length >= 1) {
    for (i = 0; i < savedMangas.length; i++) {
      let manga = new Manga(
        savedMangas[i].title,
        savedMangas[i].chapters,
        savedMangas[i].image,
        savedMangas[i].progress
      );
      myLibrary.push(manga);
      addManga();
    }
  } else {
    return;
  }
};
function apiCall() {
  let searchInput = document.getElementById("title");
  searchInput.onkeydown = function () {
    let searchData = document.getElementById("title").value;
    if (searchData.length >= 3) {
      while (document.getElementsByClassName("autoComplete")[0]) {
        document.getElementsByClassName("autoComplete")[0].remove();
      }
      let request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://api.jikan.moe/v3/search/manga?q=" + searchData + "&page=1",
        true
      );
      request.onload = function () {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
          console.log(data);
          let searchManga = document.querySelector(".oka");
          Object.keys(data.results).map(function (key, index) {
            let image = document.getElementById("image");
            let chapters = document.getElementById("chapters");
            if (data.results[0].chapters == 0) {
              chapters.value = "Unknown";
            } else {
              chapters.value = data.results[0].chapters;
            }
            image.value = data.results[0].image_url;
          });
        } else {
          console.log("error");
        }
      };
      request.send();
    }
  };
}

apiCall();

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function Manga(title, chapters, image, progress, uniqueId) {
  const unique = uid();
  let progressNum;
  this.uniqueId = unique;
  this.title = title;
  this.chapters = chapters;
  this.image = image;
  this.progress = progress;
  if (progress == 1) {
    progressNum = "chapter";
  } else {
    progressNum = "chapters";
  }
  this.info = function () {
    return `<div class="item-content">
                    <p id="item-title">${title}</p>
                    <div class="inline"><button class="update"onclick="updateChapter(${unique})"><i class="fas fa-plus fa-sm"></i></button> <p class="item-details" id="btn-${unique}">${this.progress}</p><p class="item-details"> ${progressNum} read</p></div>
                    <p class="item-details">${chapters} chapters in total</p> 
                    <button class="item-details" id="btn-details" onclick="removeDiv(${unique})">Remove</button>

                </div>`;
  };
}

let newManga = function () {
  let title = document.getElementById("title").value;
  let chapters = document.getElementById("chapters").value;
  let progress = document.getElementById("progress").value;
  let image = document.getElementById("image").value;
  let manga = new Manga(title, chapters, image, progress);
  myLibrary.push(manga);
};

let addManga = function addMangaToLibrary() {
  let display = document.getElementById("display");
  let ndiv = document.createElement("div");
  ndiv.className = "card";
  ndiv.id = myLibrary[counter].uniqueId;
  ndiv.style["background-image"] = `url(${myLibrary[counter].image})`;
  let cardContent = myLibrary[counter].info();
  ndiv.innerHTML = cardContent;
  display.append(ndiv);
  localStorage.setItem("mangas", JSON.stringify(myLibrary));

  counter += 1;
};

submit.addEventListener("click", function () {
  newManga();
  addManga();
  form.style.display = "none";
});

open.onclick = function () {
  form.style.display = "block";
};

span.onclick = function () {
  form.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == form) {
    modal.style.display = "none";
  }
};

yotsubato.addEventListener("click", function () {
  let manga = new Manga(
    "Yotsuba!",
    "Unknown",
    "https://cdn.myanimelist.net/images/manga/3/57369.jpg?s=04002980dcd4cfd0fb15e3bb9597d934",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});
shirokuma.addEventListener("click", function () {
  let manga = new Manga(
    "Shirokuma",
    "100",
    "https://cdn.myanimelist.net/images/manga/3/64713.jpg",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});
takagi.addEventListener("click", function () {
  let manga = new Manga(
    "Teasing Master Takagi-san",
    "Unknown",
    "https://cdn.myanimelist.net/images/manga/3/136045.jpg",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});
onepiece.addEventListener("click", function () {
  let manga = new Manga(
    "One Piece",
    "Unknown",
    "https://cdn.myanimelist.net/images/manga/3/55539.jpg",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});
gantz.addEventListener("click", function () {
  let manga = new Manga(
    "Gantz",
    "383",
    "https://cdn.myanimelist.net/images/manga/4/157936.jpg",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});
kami.addEventListener("click", function () {
  let manga = new Manga(
    "The World God Only Knows",
    "271",
    "https://cdn.myanimelist.net/images/manga/2/188974.jpg",
    "Want to read"
  );
  myLibrary.push(manga);
  addManga();
});

const removeDiv = function (uniqueId) {
  uniqueId.remove();
  const index = myLibrary.findIndex((obj) => obj.uniqueId === uniqueId.id);
  index + 1;
  if (myLibrary.length > 1) {
    myLibrary.splice(index, 1);
    localStorage.setItem("mangas", JSON.stringify(myLibrary));
  } else if (myLibrary.length === 1) {
    myLibrary.pop();
    localStorage.setItem("mangas", JSON.stringify(myLibrary));
  }
  counter = counter - 1;
};

const updateChapter = function (uniqueId) {
  let chapterNum = document.querySelector(`#btn-${uniqueId.id}`);
  chapterNum.textContent = Number(chapterNum.textContent) + 1;
  const index = myLibrary.findIndex((obj) => obj.uniqueId === uniqueId.id);
  myLibrary[index].progress = chapterNum.textContent;
  localStorage.setItem("mangas", JSON.stringify(myLibrary));
};

loadMangas();
