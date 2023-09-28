const recordLead = (formData, status) => {
  return new Promise((res, rej) => {
    fetch("https://hook.integromat.com/owv1pwltla93j14w971dihy6a5souj1k", {
      method: "POST",
      body: JSON.stringify({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        LeadName: "Build a Trailer",
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
  $("#wf-form-Contact-Form").on("submit", async function (ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    try {
      const formData = {
        Customs: [
          {
            FieldName: "Length/Width",
            FieldValue: $("#length-width").text(),
          },
          {
            FieldName: "SuspensionType",
            FieldValue: $("#suspension").text(),
          },
          {
            FieldName: "FrameRating",
            FieldValue: $("#frame").text(),
          },
          {
            FieldName: "Flooring",
            FieldValue: $("#flooring-2").text(),
          },
          {
            FieldName: "StationaryChainCargoTieDowns",
            FieldValue: $("#stationary-chain").text(),
          },
          {
            FieldName: "ABS",
            FieldValue: $("span#Zip").text(),
          },
          {
            FieldName: "SideRails",
            FieldValue: $("#side-rails").text(),
          },
          {
            FieldName: "AxieSpread",
            FieldValue: $("#axle-spread").text(),
          },
          {
            FieldName: "Breaks",
            FieldValue: $("#Brakes").val(),
          },
          {
            FieldName: "AirLineFilters",
            FieldValue: $("#Air-Line-Filters").val(),
          },
          {
            FieldName: "HubAndDrums",
            FieldValue: $("#Hub-and-Drums").val(),
          },
          {
            FieldName: "WheelEnds",
            FieldValue: $("#Wheel-Ends").text(),
          },
          {
            FieldName: "Wheels",
            FieldValue: $("#Wheels").val(),
          },
          {
            FieldName: "Tires",
            FieldValue: $("#Tires").val(),
          },
          {
            FieldName: "TireInflationSystem",
            FieldValue: $("#Tire-Inflation-System").val(),
          },
          {
            FieldName: "SuspensionDetail",
            FieldValue: $("#Suspension-Detail").text(),
          },
          {
            FieldName: "AutoGladHandDump",
            FieldValue: $("#Auto-Glad-Hand-Dump").val(),
          },
          {
            FieldName: "ElectricDumpValve",
            FieldValue: $("#Electric-Dump-Valve").val(),
          },
          {
            FieldName: "AirLift",
            FieldValue: $("#Air-Lift").val(),
          },
          {
            FieldName: "FrontCorners",
            FieldValue: $("#Front-Corners").val(),
          },
          {
            FieldName: "ElectricalSystem",
            FieldValue: $("#Electrical-System").val(),
          },
          {
            FieldName: "OtherElectricalSpecifications",
            FieldValue: $("#Other-Electrical-Specifications").val(),
          },
          {
            FieldName: "Paint",
            FieldValue: $("#Paint").val(),
          },
          {
            FieldName: "ConspicuityTape",
            FieldValue: $("#Conspicuity-Tape").val(),
          },
          {
            FieldName: "Bumper",
            FieldValue: $("#Bumper").val(),
          },
          {
            FieldName: "Mudflaps",
            FieldValue: $("#Mudflaps").val(),
          },
          {
            FieldName: "SpareTireCarrier",
            FieldValue: $("#Spare-Tire-Carrier").val(),
          },
          {
            FieldName: "WinchTrack",
            FieldValue: $("#Winch-Track").val(),
          },
          {
            FieldName: "SlidingWinches",
            FieldValue: $("#Sliding-Winches").val(),
          },
          {
            FieldName: "27WinchStraps",
            FieldValue: $("#27-Winch-Straps").val(),
          },
          {
            FieldName: "30WinchStraps",
            FieldValue: $("#30-Winch-Straps").val(),
          },
          {
            FieldName: "SlidingJ-HookForRingVsFlatHookOn4Strap",
            FieldValue: $(
              "#Sliding-J-Hook-for-Ring-vs-Flat-Hook-on-4-Strap"
            ).val(),
          },
          {
            FieldName: "DockBumpers",
            FieldValue: $("#Dock-Bumpers").val(),
          },
          {
            FieldName: "Hubodometer",
            FieldValue: $("#Hubodometer").val(),
          },
          {
            FieldName: "RegistrationHolder",
            FieldValue: $("#Registration-Holder").val(),
          },
          {
            FieldName: "ToolBox",
            FieldValue: $("#Tool-Box").val(),
          },
          {
            FieldName: "Message",
            FieldValue: $("#Message").val(),
          },
          {
            FieldName: "NumberOfTrailersOperated",
            FieldValue: $("#Own-operate-Trailers").val(),
          },
          {
            FieldName: "Haleyville",
            FieldValue: $("#haleyville").val(),
          },
          // {
          //   FieldName: "StandardCustom",
          //   FieldValue: $("#standard-custom").val(),
          // },
          {
            FieldName: "Construction",
            FieldValue: $("#construction").val(),
          },
          {
            FieldName: "DataType",
            FieldValue: $("#data-type").val(),
          },
          {
            FieldName: "IsBrochureRequested",
            FieldValue: $("#Request-a-brochure")[0].checked ? "Yes" : "No",
          },
          {
            FieldName: "ModesOfCommunication",
            FieldValue:
              ($("#checkbox")[0].checked ? "Email," : "") +
                ($("#checkbox-2")[0].checked ? "Phone" : "") || "None",
          },
        ],
        FirstName: $("#First-Name").val(),
        LastName: $("#Last-Name").val(),
        Email: $("#Email-3").val(),
        MobilePhone: $("#Phone").val(),
        CountryCode: $("#Country-Trailer").val(),
        Brands: "Fontaine",
        LeadCategoryName: "fontainetrailer.com",
        IsCommunicationOptIn: $("#checkbox")[0].checked,
        SMSOptIn: $("#checkbox-2")[0].checked,
        City: $("#City").val(),
        CompanyName: $("#Company").val(),
        FirstName: $("#First-Name").val(),
        PostalCode: $("input#Zip").val(),
        Products: [
          {
            ProductCode: $("#product-code").val(),
            ProductModelYear: $("#product-year").val(),
          },
        ],
      };

      const userUid = Aimbase.Analytics.GetUserUid(),
        sessionUid = Aimbase.Analytics.GetSessionUid();

      if (userUid) formData["UserUid"] = userUid;
      if (sessionUid) formData["SessionUid"] = sessionUid;

      const Customs = [];
      for (let i = 0; i < formData.Customs.length; i++) {
        const { FieldName, FieldValue } = formData.Customs[i];
        if (FieldName && FieldValue) Customs.push(formData.Customs[i]);
      }
      formData.Customs = Customs;

      // const baseUrl = "http://localhost:5001";
      const baseUrl = "https://api.fontainetrailer.com";

      const res = await fetch(`${baseUrl}/api/build-trailer?brand=FT`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await res.json();
      showFormStatus(null, "wf-form-Contact-Form", true);
      window.scrollTo({ behavior: "smooth", top: 0 });
      await recordLead(formData, true);
    } catch (error) {
      showFormStatus(null, "wf-form-Contact-Form", false);
      await recordLead(formData, false);
    }
  });
});
