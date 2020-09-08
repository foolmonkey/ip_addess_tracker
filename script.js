async function getGeolocation(
  input = "8.8.8.8",
  api_key = "at_4UpFw3Ygze4CEMwjskAYkRQwau23h"
) {
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
    alert(`Please enter a valid ${errMessage}`);
    toggleLoading(true);
    return "";
  }

  if (!response.ok) {
    alert(`Please enter a valid ${errMessage}.`);
    data = "";
    toggleLoading(true);
    throw new Error(`Please enter a valid ${errMessage}.`);
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

function toggleLoading(finished) {
  let loading = document.getElementById("loading");
  let arrow = document.getElementById("arrow");
  let button = document.getElementById("search-button");

  if (loading.classList.contains("hidden") || !finished) {
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
  toggleLoading(true);
  renderGeolocation(data);
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
