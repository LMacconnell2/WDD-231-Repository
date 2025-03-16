import { getParkData } from "./parkService.mjs";
import { getAlertData } from "./parkService.mjs";


async function init() {

  const parkData = await getParkData();
  const alertData = await getAlertData();
  setHeaderInfo(parkData)
  footerTemplate(parkData)
}
init();


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
    const parkName = parkData.fullName
    const splitName = parkName.split(" ")
    return `<a href="${parkData.url}" class="hero-banner__title">${splitName[0]}</a>
          <p class="hero-banner__subtitle">
              <span>${splitName.slice(1, 3).join(" ")}</span>
              <span>${parkData.states}</span>
          </p>`
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

  function setAlert(alertData) {
    const alertTitle = alertData.title;
    const alertDesc = alertData.description;
    const alertTitleContainer = document.querySelector(".alert-title");
    const alertDescContainer = document.querySelector(".alert-desc");
    alertTitleContainer.innerHTML = alertTitle;
    alertDescContainer.innerHTML = alertDesc;
  }