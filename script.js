async function getGeolocation(
  api_key = "at_4UpFw3Ygze4CEMwjskAYkRQwau23h",
  ip = "8.8.8.8"
) {
  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      dataType: "jsonp",
      data: { apiKey: api_key, ipAddress: ip },
      success: function (data) {
        $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
      },
    });
  });
}

window.onload = () => {
  getGeolocation();
};
