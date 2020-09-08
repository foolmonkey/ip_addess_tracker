async function getGeolocation(
  ip = "8.8.8.8",
  api_key = "at_4UpFw3Ygze4CEMwjskAYkRQwau23h"
) {
  const response = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_4UpFw3Ygze4CEMwjskAYkRQwau23h&ipAddress=${ip}`
  );
  let data;

  try {
    data = await response.json();
  } catch (e) {
    alert("Please enter a valid IP address.");
    return "";
  }

  if (!response.ok) {
    alert("Please enter a valid IP address.");
    data = "";
    throw new Error("Please enter a valid IP address.");
  }

  return data;
}

function renderGeolocation(data) {
  if (data !== "") {
    document.getElementById("ip").innerText = data.ip;
    document.getElementById(
      "location"
    ).innerText = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    document.getElementById("timezone").innerText = data.location.timezone;
    document.getElementById("isp").innerText = data.isp;
  }
}

function toggleLoading() {
  let loading = document.getElementById("loading");
  let arrow = document.getElementById("arrow");
  let button = document.getElementById("search-button");

  if (loading.classList.contains("hidden")) {
    loading.classList.remove("hidden");
    arrow.classList.add("hidden");
    button.style.cursor = "not-allowed";
  } else {
    loading.classList.add("hidden");
    arrow.classList.remove("hidden");
    button.style.cursor = "pointer";
  }
}

async function render(ip) {
  toggleLoading();
  let data = await getGeolocation(ip);
  renderGeolocation(data);
  toggleLoading();
}

window.onload = () => {
  let search = document.getElementsByTagName("input")[0];
  let submit = document.getElementsByTagName("button")[0];

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
};
