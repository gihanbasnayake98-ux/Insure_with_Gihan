const $ = (id) => document.getElementById(id);
let language = "en";
$("year").textContent = new Date().getFullYear();
$("langBtn").addEventListener("click", () => {
  language = language === "en" ? "si" : "en";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en][data-si]").forEach(el => {
    el.textContent = el.dataset[language];
  });
  $("langBtn").textContent = language === "en" ? "සිංහල" : "English";
});
$("sendOtp").addEventListener("click", () => {
  const phone = $("phone").value.trim();
  if (!/^(\+94|0)?7\d{8}$/.test(phone.replace(/\s/g, ""))) {
    $("loginMsg").textContent = language === "en" ? "Enter a valid Sri Lankan mobile number." : "වලංගු ශ්‍රී ලාංකික ජංගම අංකයක් ඇතුළත් කරන්න.";
    return;
  }
  $("otpArea").classList.remove("hidden");
  $("loginMsg").textContent = language === "en" ? "Demo mode: no SMS was sent. Use 123456." : "Demo mode: SMS යවා නැත. 123456 භාවිත කරන්න.";
});
$("verifyOtp").addEventListener("click", () => {
  if ($("otp").value !== "123456") {
    $("loginMsg").textContent = language === "en" ? "Incorrect demo code. Try 123456." : "Demo කේතය වැරදියි. 123456 උත්සාහ කරන්න.";
    return;
  }
  $("loginView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});
$("logout").addEventListener("click", () => {
  $("appView").classList.add("hidden");
  $("loginView").classList.remove("hidden");
  $("otpArea").classList.add("hidden");
  $("otp").value = "";
});
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));