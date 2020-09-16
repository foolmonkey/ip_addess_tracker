async function getGeolocation(
  input = "8.8.8.8",
  api_key = "at_4UpFw3Ygze4CEMwjskAYkRQwau23h"
) {
  toggleLoading(true);

  let url = `https://geo.ipify.org/api/v1?apiKey=${api_key}`;
  let errMessage;

  // Check if query string is ip or domain
  if (input.match(/[^0-9]/)) {
    url += `&domain=${input}`;
    errMessage = "domain";
  } else {
    url += `&ipAddress=${input}`;
    errMessage = "IP";
  }

  // Fetch from API
  const response = await fetch(url);
  let data;

  // Get JSON or throw exception
  try {
    data = await response.json();
  } catch (e) {
    toggleLoading(true);
    alert(`Please enter a valid ${errMessage}`);
    return "";
  }

  if (!response.ok) {
    toggleLoading(true);
    alert(`Please enter a valid ${errMessage}.`);
    data = "";
    throw new Error(`Please enter a valid ${errMessage}.`);
  }

  return data;
}

function renderGeolocation(data) {
  toggleLoading(true);

  if (data !== "") {
    document.getElementById("ip").innerText = data.ip;
    document.getElementById(
      "location"
    ).innerText = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    document.getElementById("timezone").innerText = data.location.timezone;
    document.getElementById("isp").innerText = data.isp;

    setMap(data.location.lat, data.location.lng);
  }
}

function toggleLoading(finished) {
  let loading = document.getElementById("loading");
  let arrow = document.getElementById("arrow");
  let button = document.getElementById("search-button");

  if (!finished) {
    loading.classList.remove("hidden");
    arrow.classList.add("hidden");
    button.style.cursor = "not-allowed";
  } else {
    loading.classList.add("hidden");
    arrow.classList.remove("hidden");
    button.style.cursor = "pointer";
  }
}

async function render(input) {
  toggleLoading(false);
  let data = await getGeolocation(input);
  renderGeolocation(data);
}

function setMap(lat, lng) {
  document.getElementById("map").innerHTML = `<div id="mapid"></div>`;

  var myMap = L.map("mapid", { zoomControl: false }).setView([lat, lng], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(myMap);

  let icon = L.icon({
    iconUrl: "./images/icon-location.svg",
  });

  let marker = L.marker([lat, lng], { icon: icon }).addTo(myMap);
}

window.onload = () => {
  let search = document.getElementsByTagName("input")[0];
  let submit = document.getElementsByTagName("button")[0];

  setMap(51, 13);

  submit.addEventListener("click", () => {
    if (search.value.length > 0) {
      render(search.value);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && search.value.length > 0) {
      render(search.value);
    }
  });

  render("192.212.174.101");
};
