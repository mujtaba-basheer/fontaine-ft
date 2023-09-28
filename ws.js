Aimbase.Analytics.AddListener(
  document.querySelector('a[href="https://fontaineheavyhaul.com/"]'),
  "Heavy Haul Button",
  "click",
  {
    PageAction: "c3759876-5337-4888-a85d-7872e57c542e",
    UserUid: Aimbase.Analytics.GetUserUid(),
    SessionUid: Aimbase.Analytics.GetSessionUid(),
  },
  "Heavy-Hauls Button Header Click",
  "Clicks"
);
// Aimbase.Analytics.AddListener(
//   document.querySelector('a[href="/compare-trailers"]'),
//   "Find Your Trailer Button",
//   "click",
//   {
//     PageAction: "c6a2601a-aec1-483a-b341-ab6689162e52",
//     UserUid: Aimbase.Analytics.GetUserUid(),
//     SessionUid: Aimbase.Analytics.GetSessionUid(),
//   },
//   "Trailers Button Header Click",
//   "Clicks"
// );
