import { createTemplate } from "../../../helpers/utils/createTemplate.js";
import { resultItem } from "../../templates/resultItem.js";
import { showDetailsOnSelectedCard } from "../resultContainer/index.js";

const resultsContainer = document.querySelector(".results-container");
let i = 0;
let xhr = new XMLHttpRequest();
const searchForm = document.querySelector(".search-form");
const loading = document.querySelector(".game-loader");
const selectedResultContainer = getElement(".selectedResult-container");
const titlesContainer = getElement(".titles-container");
searchForm.addEventListener("submit", (e) => {
  selectedResultContainer.classList.remove("show_flex");
  titlesContainer.style.display = "none";
  resultsContainer.innerHTML = "";
  i = 0;
  e.preventDefault();

  const searchInputWords = searchForm["search"].value.split(" ");
  let url = `https://images-api.nasa.gov/search?q=${searchInputWords.join(
    "+"
  )}`;

  xhr.open("GET", url, true);
  xhr.send();
});

xhr.onreadystatechange = function () {
  loading.classList.add("show_flex");

  if (xhr.readyState == 4 && xhr.status == 200) {
    loading.classList.remove("show_flex");

    let NasaObj = JSON.parse(xhr.responseText);
    for (let i = 0; i < NasaObj.collection.items.length; i++) {
      if (i == 100) break; // Stop after 10 iterations
      const thumb = encodeURI(
        NasaObj?.collection?.items?.[i]?.links?.[0]?.href || ""
      );
      const data = NasaObj?.collection?.items?.[i]?.data[0];
      const { title: fullTitle = "", nasa_id: id } = data;
      const title =
        fullTitle.length > 40 ? fullTitle.slice(0, 25) + "..." : fullTitle;

      if (!thumb) {
        return;
      }
      resultsContainer.insertAdjacentHTML(
        "afterbegin",
        createTemplate(resultItem, {
          thumb,
          title,
          id,
        })
      );
      // console.log(resultsContainer.firstChild);

      document.querySelector("#" + id).addEventListener("click", (e) => {
        selectedResultContainer.classList.add("show_flex");
        showDetailsOnSelectedCard(data, NasaObj?.collection?.items?.[i]?.href);
        // console.log(data);
      });
    }
  }
};

const init = () => {};
init();
