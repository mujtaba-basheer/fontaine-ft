const recordLead = (formData, status) => {
  return new Promise((res, rej) => {
    fetch("https://hook.integromat.com/owv1pwltla93j14w971dihy6a5souj1k", {
      method: "POST",
      body: JSON.stringify({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        LeadName: "Request A Brochure",
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

window.addEventListener("load", function () {
  const formsData = [
    {
      id: "wf-form-Revolution-Flatbed-Trailer",
      fields: {
        FirstName: "First-Name-16",
        LastName: "Last-Name-16",
        Email: "Email-20",
        CountryCode: "Country-Literature-5",
        IsCommunicationOptIn: "Checkbox-Literature-2",
        Message: "Message",
      },
      productCode: 1,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/bfs3jn9/",
    },
    {
      id: "wf-form-Revolution-SuperiorSlide-Trailer",
      fields: {
        FirstName: "First-Name-17",
        LastName: "Last-Name-17",
        Email: "Email-21",
        CountryCode: "Country-Literature-6",
        IsCommunicationOptIn: "Checkbox-Literature-3",
        Message: "Message-16",
      },
      productCode: 2,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/ba5hdj5/",
    },
    {
      id: "wf-form-Revolution-Drop-Deck-Trailer",
      fields: {
        FirstName: "First-Name-3",
        LastName: "Last-Name-3",
        Email: "Email-7",
        CountryCode: "Country-Literature-7",
        IsCommunicationOptIn: "Checkbox-Literature-4",
        Message: "Message-3",
      },
      productCode: 3,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq3dmb/",
    },
    {
      id: "wf-form-Infinity-Flatbed-Trailer",
      fields: {
        FirstName: "First-Name-5",
        LastName: "Last-Name-5",
        Email: "Email-9",
        CountryCode: "Country-Literature-4",
        IsCommunicationOptIn: "Checkbox-Literature-5",
        Message: "Message-5",
      },
      productCode: 4,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq3ano/",
    },
    {
      id: "wf-form-Infinity-SuperiorSlide-Trailer",
      fields: {
        FirstName: "First-Name-7",
        LastName: "Last-Name-7",
        Email: "Email-11",
        CountryCode: "Country-Literature",
        IsCommunicationOptIn: "Checkbox-Literature",
        Message: "Message-7",
      },
      productCode: 5,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq2d4u/",
    },
    {
      id: "wf-form-Infinity-Drop-Deck-Trailer",
      fields: {
        FirstName: "First-Name-9",
        LastName: "Last-Name-9",
        Email: "Email-13",
        CountryCode: "Country-Literature-2",
        IsCommunicationOptIn: "Checkbox-Literature-6",
        Message: "Message-9",
      },
      productCode: 6,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq2rex/",
    },
    {
      id: "wf-form-Velocity-Flatbed-Trailer",
      fields: {
        FirstName: "First-Name-13",
        LastName: "Last-Name-13",
        Email: "Email-17",
        CountryCode: "Country-Literature-3",
        IsCommunicationOptIn: "Checkbox-Literature-7",
        Message: "Message-13",
      },
      productCode: 7,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq2qtv/",
    },
    {
      id: "wf-form-Velocity-SuperiorSlide-Trailer",
      fields: {
        FirstName: "First-Name-14",
        LastName: "Last-Name-14",
        Email: "Email-18",
        CountryCode: "Country-Literature-8",
        IsCommunicationOptIn: "Checkbox-Literature-8",
        Message: "Message-14",
      },
      productCode: 8,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baq2xdb/",
    },
    {
      id: "wf-form-Velocity-Drop-Deck-Trailer",
      fields: {
        FirstName: "First-Name-15",
        LastName: "Last-Name-15",
        Email: "Email-19",
        CountryCode: "Country-Literature-9",
        IsCommunicationOptIn: "Checkbox-Literature-9",
        Message: "Message-15",
      },
      productCode: 9,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baquye7/",
    },
    {
      id: "wf-form-Frac-Sand-Chassis-Trailer",
      fields: {
        FirstName: "First-Name-18",
        LastName: "Last-Name-18",
        Email: "Email-22",
        CountryCode: "Country-Literature-10",
        IsCommunicationOptIn: "Checkbox-Literature-10",
        Message: "Message-17",
      },
      productCode: 10,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baquh2x/",
    },
    {
      id: "wf-form-Infinity-Forklift",
      fields: {
        FirstName: "First-Name-19",
        LastName: "Last-Name-19",
        Email: "Email-23",
        CountryCode: "Country-Literature-11",
        IsCommunicationOptIn: "Checkbox-Literature-11",
        Message: "Message-18",
      },
      productCode: 11,
      webhookUrl: "https://hooks.zapier.com/hooks/catch/11120519/baqu810/",
      modalParentClass: "doc-form-block-forklift",
    },
  ];

  for (const formData of formsData) {
    $(`form#${formData.id}`).on("submit", async function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      ev.stopPropagation();

      const postData = {
        Brands: "Fontaine",
        LeadCategoryName: "fontainetrailer.com",
      };
      const zapData = {
        source: "https://fontaine-trailers.webflow.io/literature",
        test: "false",
        dolphin: "false",
        name: $(this).attr("data-name"),
      };
      for (const key of Object.keys(formData.fields)) {
        postData[key] = $(`#${formData.fields[key]}`).val();
        zapData[`fields[${formData.fields[key].replace(/-/g, "+")}]`] = $(
          `#${formData.fields[key]}`
        ).val();
      }
      delete postData["Message"];
      delete postData["IsCommunicationOptIn"];

      postData["IsCommunicationOptIn"] = $(
        `#${formData.fields.IsCommunicationOptIn}`
      )[0].checked;
      postData["Products"] = [
        {
          ProductCode: $(`#product-code-${formData.productCode}`).val(),
          ProductModelYear: "2023",
        },
      ];
      zapData[
        `fields[${formData.fields.IsCommunicationOptIn.replace(/-/g, "+")}]`
      ] = $(`#${formData.fields.IsCommunicationOptIn}`)[0].checked
        ? "true"
        : "false";
      zapData[`fields[Product-Code]`] = $(
        `#product-code-${formData.productCode}`
      )
        .val()
        .replace(/\s/g, "+");

      const message = $(`#${formData.fields.Message}`).val();
      if (message) {
        postData["Customs"] = [
          {
            FieldName: "Message",
            FieldValue: message,
          },
        ];
      }

      const userUid = Aimbase.Analytics.GetUserUid(),
        sessionUid = Aimbase.Analytics.GetSessionUid();

      if (userUid) postData["UserUid"] = userUid;
      if (sessionUid) postData["SessionUid"] = sessionUid;

      try {
        // const baseUrl = "http://localhost:5001";
        const baseUrl = "https://api.fontainetrailer.com";

        const res = await fetch(`${baseUrl}/api/literature?brand=FT`, {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(res.statusText);
        await res.json();
        showFormStatus(
          null,
          formData.id,
          true,
          formData.modalParentClass || "doc-form-block"
        );
        await recordLead(postData, true);

        fetch(formData.webhookUrl, {
          method: "POST",
          body: JSON.stringify(zapData),
          headers: {
            // "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      } catch (error) {
        showFormStatus(
          null,
          formData.id,
          false,
          formData.modalParentClass || "doc-form-block"
        );
        await recordLead(postData, false);
      }
    });
  }
});
