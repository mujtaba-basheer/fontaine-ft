const recordLead = (formData, status) => {
  return new Promise((res, rej) => {
    fetch("https://hook.integromat.com/owv1pwltla93j14w971dihy6a5souj1k", {
      method: "POST",
      body: JSON.stringify({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        LeadName: "Contact Fontaine",
        Brand: "fontainetrailer.com",
        Status: status ? "Passed" : "Failed",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) throw new Error(resp.statusText);
        return resp.json();
      })
      .then(() => res(null))
      .catch(rej);
  });
};

window.addEventListener("load", () => {
  const formEl = document.getElementById("wf-form-Contact-Form");
  const submitBtn = formEl.querySelector(".button");

  submitBtn.addEventListener("click", async () => {
    let formData = {
      Brands: "Fontaine",
      LeadCategoryName: "fontainetrailer.com",
    };

    const inputEls = formEl.querySelectorAll(
      'input:not([type="submit"]):not([type="checkbox"]), select:not([name="City"])'
    );
    inputEls.forEach((inputEl) => {
      const fieldName = inputEl.getAttribute("data-name").replace(" ", "");
      const fieldValue = inputEl.value;
      if (!fieldValue) return;
      formData[fieldName] = fieldValue;
    });

    const checkEl = formEl.querySelector("input#Checkbox-Contact");
    formData["IsCommunicationOptIn"] = checkEl.checked;

    const checkSmsEl = formEl.querySelector("input#Checkbox-Contact-2");
    formData["SMSOptIn"] = checkSmsEl.checked;

    const msgEl = document.querySelector("textarea");
    if (msgEl.value)
      formData["Customs"] = [{ FieldName: "Message", FieldValue: msgEl.value }];

    const userUid = Aimbase.Analytics.GetUserUid(),
      sessionUid = Aimbase.Analytics.GetSessionUid();

    if (userUid) formData["UserUid"] = userUid;
    if (sessionUid) formData["SessionUid"] = sessionUid;

    try {
      // const baseUrl = "http://localhost:5001";
      const baseUrl = "https://api.fontainetrailer.com";

      const res = await fetch(`${baseUrl}/api/contact?brand=FT`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(res.statusText);
      await res.json();
      showFormStatus(null, "wf-form-Contact-Form", true);
      formEl.reset();
      await recordLead(formData, true);
    } catch (error) {
      showFormStatus(null, "wf-form-Contact-Form", false);
      await recordLead(formData, false);
    }
  });
});
