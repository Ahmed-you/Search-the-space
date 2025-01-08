const ResultsContainer = getElement(".results-container");
const selectedResultContainer = getElement(".selectedResult-container");
const maskGroup = getElement(".mask-group");
const selectedResultTitle = getElement(".selectedResult-title");
const selectedResultDescription = getElement(".selectedResult-description");
export const showDetailsOnSelectedCard = (data, href) => {
  console.log(data);
  selectedResultTitle.innerHTML = data.title;
  const description =
    data.description.length > 200
      ? data.description.slice(0, 200) + "..."
      : data.description;

  selectedResultDescription.innerHTML = description;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", href, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const images = JSON.parse(xhr.responseText);
      maskGroup.style.background = `url(${images[1]})`;
      maskGroup.style.backgroundSize = `cover`;
      maskGroup.style.backgroundPosition = `center`;
      maskGroup.style.backgroundRepeat = `no-repeat`;
    }
  };
};
