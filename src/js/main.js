import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: parkData.images[2].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: parkData.images[3].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: parkData.images[9].url,
      description: "Learn about the visitor centers in the park."
    }
  ];



function setHeaderInfo(parkData) {
    // insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = parkData.url;
    disclaimer.innerHTML = parkData.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = parkData.fullName;
    // set the banner image
    document.querySelector(".hero-banner > img").src = parkData.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(parkData);
  }

  function parkInfoTemplate(parkData) {
    console.log("I did a thing")
  }

  function setIntro(parkData) {
    const fullName = parkData.fullName;
    const description = parkData.description;
    document.querySelector(".intro-title").textContent = fullName;
    document.querySelector(".intro-desc").innerHTML = description;
  }

  function mediaCardTemplate(parkInfoLinks) {
    document.querySelector(".info-cards").innerHTML = ""; // Clear existing content
  
    parkInfoLinks.forEach((park) => {
      document.querySelector(".info-cards").insertAdjacentHTML(
        "beforeend",
        `<div class="info-card">
          <img src="${park.image}" alt="${park.name}">
          <a href="${park.link}"><h2 class="card-title">${park.name}</h2></a>
          <p>${park.description}</p>
        </div>`
      );
    });
  }

  function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
  }

  function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice.phoneNumber;
  }

  function footerTemplate(parkData) {

    const mailing = getMailingAddress(parkData.addresses);
    const voice = getVoicePhone(parkData.contacts.phoneNumbers);

    document.querySelector("footer").innerHTML = `<h3>Contact Info</h3>
      <h4>Mailing Address</h4>
      <p>${mailing.line1}<p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      <h4>Phone:</h4>
      <p>${voice}</p>`
  }

setHeaderInfo(parkData)
setIntro(parkData)
mediaCardTemplate(parkInfoLinks)
footerTemplate(parkData)

