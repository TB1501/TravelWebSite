const btnSrch = document.querySelector(".srcButton");
const btnClear = document.querySelector(".clearButton");
const overlay = document.querySelector(".overlay");
const resultDiv = document.querySelector(".searchResult");

function recommendations() {
  const input = document.querySelector(".placeSearch").value.toLowerCase();
  const srcValues = {
    countries: ["countrie", "countries"],
    temples: ["temples", "temple"],
    beaches: ["beach", "beaches"],
  };
  resultDiv.innerHTML = "";

  const srcInput = Object.keys(srcValues).find((k) =>
    srcValues[k].includes(input)
  );
  if (!srcInput) {
    resultDiv.innerHTML = "<p>Invalid search term</p>";
    overlay.style.display = "flex";
    return;
  }

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const travelList = data[srcInput];

      if (travelList && travelList.length > 0) {
        if (srcInput === "countries") {
          travelList.forEach((country) => {
            country.cities.forEach((city) => {
              resultDiv.innerHTML += `
                <img src="${city.imageUrl}" alt="${city.name}" style="height:250px; width=250px;" class="rezImg">
                <p class="rezName"><b>${city.name}</b></p>
                <p class="rezDescr">${city.description}</p>
              `;
            });
          });
        } else {
          travelList.forEach((item) => {
            resultDiv.innerHTML += `
              <img src="${item.imageUrl}" alt="picture" style="height: 250px; width: 250px;" class="rezImg">
              <p class="rezName"><b>${item.name}</b></p>
              <p class="rezDescr">${item.description}</p>
            `;
          });
        }
      } else {
        resultDiv.innerHTML = "<p>Not found</p>";
      }
      overlay.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "<p>An error occurred while fetching data.</p>";
      overlay.style.display = "flex";
    });
}

function clearResults() {
  document.querySelector(".placeSearch").value = "";
  resultDiv.innerHTML = "";
  overlay.style.display = "none";
}

btnSrch.addEventListener("click", recommendations);
btnClear.addEventListener("click", clearResults);
