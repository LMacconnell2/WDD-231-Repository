const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
const response = await fetch(baseUrl + "parks" + "?parkCode=yell", options);

// Check to make sure the response was ok
if (response.ok) {
  // Convert to JSON
  data = await response.json();
} else {
  throw new Error("Response not ok");
}

return data.data[0];

}

export async function getInfoLinks(parkData) {
  const dataPark = await getParkData();
  const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      description: "Learn about the visitor centers in the park."
    }
  ];
  // Why index + 2 below? no real reason. we don't want index 0 since that is the one we used for the banner...I decided to skip an image.
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = dataPark.images[index + 2].url;
    return item;
  });
  return withUpdatedImages;
}






