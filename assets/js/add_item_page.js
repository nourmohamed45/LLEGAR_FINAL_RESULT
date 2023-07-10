import { request } from "./service/index.mjs";
import { Spinner } from "./spinner.mjs";
// ============= Start Adding Photos =================
let form = document.querySelector(".wrapper form.img-form");
let fileInput = form.querySelector(".file-input");
let progressArea = document.querySelector(".wrapper .progress-area");
let uploadedArea = document.querySelector(".wrapper .uploaded-area");
let shareBtn = document.querySelector(".share-btn-container .share-btn");
let spinner = document.querySelector(".spinner__container");
//form inputs
let body = {};
let inputTitle = document.querySelector("#title");
let rentType = document.querySelector("#categoryType");
let subRentType = document.querySelector("#subCategoryType");
let description = document.querySelector("#description-input");
let pricePerDay = document.querySelector("#pricePerDay");
let city = document.querySelector("#location");
let yourCondition = document.querySelector("#condition-input");
let newItem = document.querySelectorAll("input[name=new]");
let availablity = document.querySelectorAll("input[name=available]");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      // if filename length is greater or equal than 12 characters the split the name and add ...
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
};

function handleRadioBtnChecked(array) {
  let result = Array.from(array).find((item) => item?.checked);
  return result?.value;
}
function handleAddItemBody() {
  body["title"] = inputTitle.value;
  body["rentType"] = rentType.value;
  body["subRentType"] = subRentType.value;
  body["description"] = description.value;
  body["pricePerDay"] = +pricePerDay.value;
  body["city"] = city.value;
  body["yourCondition"] = yourCondition.value;
  body["new"] = handleRadioBtnChecked(newItem);
  body["availablity"] = handleRadioBtnChecked(availablity);
}

shareBtn.addEventListener("click", async () => {
  try {
    handleAddItemBody();
    console.log(body);
    spinner.style.display = "flex";
    await request({
      url: "/items",
      method: "POST",
      data: body,
      navigate: "/",
    });
    spinner.style.display = "none";
  } catch (err) {
    console.error(err);
  }
});

function uploadFile(fileName) {
  let xhr = new XMLHttpRequest(); // creating new xml obj (Ajax)
  xhr.open("POST", "php/upload.php"); // sending post request to the specified URL/File
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100); // getting precentages of loaded file size
    let fileTotal = Math.floor(total / 1000); // getting file size in KB from bytes
    let fileSize;
    // if file size is less than 1024 then add only KB else convert size into KB to MB
    fileTotal < 1024
      ? (fileSize = fileTotal + "KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB"); //
    let progressHtml = `
          <li class="row">
            <i class="fas fa-file-alt"></i>
            <div class="content">
              <div class="details">
                <span class="name">${fileName} . Uploading</span>
                <span class="percent">${fileLoaded}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress" style = "width: ${fileLoaded}%"></div>
              </div>
            </div>
          </li>
    `;

    progressArea.innerHTML = progressHtml;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHtml = `
            <li class="row">
              <div class="content">
                <i class="fas fa-file-alt"></i>
                <div class="details">
                  <span class="name">${fileName} . Uploaded</span>
                  <span class="size">${fileSize}</span>
                </div>
              </div>
              <i class="fas fa-check"></i>
            </li>
      `;
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHtml);
    }
  });
  let formData = new FormData(form); // formData is an object to easily send form data
  xhr.send(formData); //sending form data to php
}

// ============= End Adding Photos =================

// ====== Start checkbox =======

// // New And Used
// const newCheckbox = document.getElementById("new");
// const usedCheckbox = document.getElementById("used");

// newCheckbox.addEventListener("change", () => {
//   if (newCheckbox.checked) {
//     usedCheckbox.checked = false;
//   }
// });

// usedCheckbox.addEventListener("change", () => {
//   if (usedCheckbox.checked) {
//     newCheckbox.checked = false;
//   }
// });

// // Abailable And Not Available
// const availableCheckbox = document.getElementById("available");
// const notAvailableCheckbox = document.getElementById("not-available");

// availableCheckbox.addEventListener("change", () => {
//   if (availableCheckbox.checked) {
//     notAvailableCheckbox.checked = false;
//   }
// });

// notAvailableCheckbox.addEventListener("change", () => {
//   if (notAvailableCheckbox.checked) {
//     availableCheckbox.checked = false;
//   }
// });

// ====== End checkbox =======
