let continueBtn = document.querySelector(".footer .continue-btn");
let emailForgetPassPage = document.getElementById("old-email");
continueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (emailForgetPassPage.value.length >= 4) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: emailForgetPassPage.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://llegar-project-x0wv.onrender.com/api/v1/users/forgotPassword",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          window.location = "verification_password.html";
        } else {
          alert(result.message);
        }
      });
  } else {
    alert("This email not valid");
  }
});
