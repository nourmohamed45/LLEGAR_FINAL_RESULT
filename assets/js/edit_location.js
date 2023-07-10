// =========== Generate Location boxes ===========

function addLocation(event) {
  event.preventDefault(); // Prevent form submission
  
  let locationBoxes = document.getElementById("locationBoxes");
  let titleInput = document.getElementById("title");
  let detailInput = document.getElementById("detail");
  let title = titleInput.value;
  let detail = detailInput.value;
  
  if (title && detail) {
    localStorage.setItem("LocationTitle", title);
    localStorage.setItem("LocationDetail", detail);
    let box = document.createElement("div");
    box.classList.add("box");

    let locIcon = document.createElement("div");
    locIcon.classList.add("loc-icon");
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-location-dot");
    locIcon.appendChild(icon);
    box.appendChild(locIcon);

    let mid = document.createElement("div");
    mid.classList.add("mid");

    let titleDiv = document.createElement("div");
    let titleHeading = document.createElement("h3");
    titleHeading.textContent = title;
    titleDiv.appendChild(titleHeading);

    if (document.getElementById("check").checked) {
      let LocationDefault = true;
      localStorage.setItem("LocationDefault", LocationDefault);
      let defaultLabel = document.createElement("div");
      defaultLabel.classList.add("default");
      defaultLabel.textContent = "Default";
      titleDiv.appendChild(defaultLabel);
    }

    mid.appendChild(titleDiv);

    let detailPara = document.createElement("p");
    detailPara.textContent = detail;
    mid.appendChild(detailPara);

    box.appendChild(mid);

    let editIcon = document.createElement("div");
    editIcon.classList.add("edit-icon");
    let close = document.createElement("i");
    close.classList.add("fa-solid", "fa-circle-xmark");
    close.setAttribute("onclick", "removelocation()");
    editIcon.appendChild(close);
    box.appendChild(editIcon);

    locationBoxes.appendChild(box);

    // Reset form inputs
    titleInput.value = "";
    detailInput.value = "";
    document.getElementById("check").checked = false;
  } else {
    alert("Please enter a title and detail");
  }
}


// ============== Remove location =================
function removelocation() {
  let locationBoxesUi = document.querySelectorAll("#locationBoxes .box");
  locationBoxesUi.forEach((element) => {
    element.addEventListener("click", () => {
      element.closest(".box").remove();
    })
  })
}



// =========== Reset Location Boxes =================
function resetLocation(event) { 
  event.preventDefault();
  locationBoxes.innerHTML = "";
  localStorage.removeItem("LocationTitle");
  localStorage.removeItem("LocationDetail");
  localStorage.removeItem("LocationDefault");
}