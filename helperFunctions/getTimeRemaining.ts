/**
 * A helper function that calculates the time remaining for an offer, and formats it into a string format for use on cards
 * @param offerExpiry string
 * @returns string, "Offer Expires in ** days : ** hrs"
 */
export default function getTimeRemaining(offerExpiry: string) {
  let expiration_string = "";
  const current = new Date();
  const expiryDate = new Date(offerExpiry);
  const diff = expiryDate.getTime() - current.getTime();

  let msec = diff;
  let dd = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= dd * 1000 * 60 * 60 * 24;
  let hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  let mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  let ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  if (dd >= 1) {
    expiration_string = dd + " days : " + hh + " hrs";
  } else {
    expiration_string = hh + " hrs : " + mm + " mins";
  }

  return "Offer Expires in " + expiration_string;
}
