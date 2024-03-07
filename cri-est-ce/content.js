const gameParam = window.location.search.split("?game=")[1];

if (gameParam) {
  const profiles = JSON.parse(atob(gameParam)).split(",").map(name => {
    return {
      name: name,
      img: window.location.origin + "/photos/square/" + name
    }
  });

  wrapProfiles(profiles);
}

function wrapProfile(profile) {
  const wrapper = document.createElement("div");
  wrapper.className = "card m-1";
  wrapper.style.width = "min-content";

  const a = document.createElement("a");
  a.className = "card-img-top";


  const img = document.createElement("img");
  img.src = profile.img;
  img.alt = profile.name;
  img.style.width = "275px";

  a.appendChild(img);
  wrapper.appendChild(a);
  
  const aLabel = document.createElement("a");
  aLabel.className = "btn btn-link btn-light btn-sm card-body p-3 text-monospace";
  aLabel.textContent = profile.name;

  wrapper.appendChild(aLabel);

  wrapper.addEventListener("click", () => {
    
    if (img.style.filter === "grayscale(100%)") {
      img.style.filter = "grayscale(0%)";
      aLabel.style.textDecoration = "none";
      return;
    }
    else {
      img.style.filter = "grayscale(100%)";
      aLabel.style.textDecoration = "line-through";
    }

  });
  return wrapper;
}

function wrapProfiles(profiles) {
  const userListTable = document.querySelector("#t-userlist-table");
  const userListPictures = document.querySelector("#t-userlist-pictures");

  userListTable.style.display = "none";
  userListPictures.style.display = "none";

  const userListContainer = userListTable.parentElement;

  const userListGuessWho = document.createElement("div");
  userListGuessWho.id = "t-userList-guessWho";
  userListPictures.role = "tabpanel";

  const userListFlex = document.createElement("div");
  userListFlex.className = "d-flex flex-row flex-wrap";


  for (let i = 0; i < profiles.length; i++) {
    userListFlex.appendChild(wrapProfile(profiles[i]));
  }

  userListGuessWho.appendChild(userListFlex);
  userListContainer.appendChild(userListGuessWho);
}


window.addEventListener("load", () => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "GUESSWHOSBACK") {
      console.log("GUESSWHOSBACK");
      let squares = document.querySelectorAll(".card-img-top");
      console.log(squares);
      const profiles = []

      while (profiles.length < 24 && squares.length > 0) {

        const randomIndex = Math.floor(Math.random() * squares.length);
        const randomSquare = squares[randomIndex];

        squares = Array.from(squares).filter((i) => i.childNodes[1].alt !== randomSquare.childNodes[1].alt);
        console.log(squares);
        profiles.push({
          name: randomSquare.childNodes[1].alt,
          img: randomSquare.childNodes[1].src,
        });

      }

      wrapProfiles(profiles);
      const response = window.location + "?game=" + btoa(JSON.stringify(profiles.map(p => p.name).join(",")));
      sendResponse(response);
    }

  });
})
