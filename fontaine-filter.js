const state = {
  limit: 6,
  pageNo: 1,
};

const filters = {
  capacity: new Set(),
  deckType: new Set(),
  spreaderCapable: new Set(),
  deckLength: new Set(),
  gooseneck: new Set(),
  deckHeight: new Set(),
  trailerType: new Set(),
  suspension: new Set(),
};
const pillsMap = new Map();
let currentTab = "Construction";
const lists = [
  { id: "capacity", filterId: "capacity", filterAttr: "capacity" },
  { id: "deck-type", filterId: "deckType", filterAttr: "deck-type" },
  {
    id: "spreader-capable",
    filterId: "spreaderCapable",
    filterAttr: "spreader",
  },
  { id: "deck-length", filterId: "deckLength", filterAttr: "deck-length" },
  { id: "gooseneck", filterId: "gooseneck", filterAttr: "gooseneck" },
  { id: "deck-height", filterId: "deckHeight", filterAttr: "deck-height" },
  { id: "trailer-type", filterId: "trailerType", filterAttr: "trailer" },
  { id: "suspension", filterId: "suspension", filterAttr: "suspension" },
];

const createPillEl = (label) => {
  const el = document.createElement("a");
  el.classList.add("chip");
  el.classList.add("w-inline-block");

  {
    const divEl = document.createElement("div");
    divEl.textContent = label;

    const imgEl = document.createElement("img");
    imgEl.classList.add("inline-icon");
    imgEl.classList.add("muted");
    imgEl.loading = "lazy";
    imgEl.alt = "close icon";
    imgEl.src =
      "https://assets-global.website-files.com/611db397a5859af2e43cd434/634705fbd98aa109cede12b4_close-icon.png";

    el.appendChild(divEl);
    el.appendChild(imgEl);
  }

  return el;
};

const applyFilters = () => {
  const currentTab = getCurrentTab();
  const items = currentTab.querySelectorAll(`div.trailer-item.w-dyn-item`);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    for (const listItem of lists) {
      const { filterId, filterAttr } = listItem;
      if (filters[filterId].size) {
        const fieldEl = item.querySelector(
          `div.specifications .filter-option-target[fs-cmsfilter-field="${filterAttr}"]`
        );
        if (fieldEl) {
          const fieldName = fieldEl.textContent.toUpperCase().trim();
          if (!filters[filterId].has(fieldName)) {
            item.classList.add("hide");
            item.classList.remove("sel");
            break;
          }
          // item.classList.remove("hide");
          item.classList.add("sel");
        } else {
          {
            item.classList.add("hide");
            item.classList.remove("sel");
          }
        }
      } else {
        // item.classList.remove("hide");
        item.classList.add("sel");
      }
    }
  }

  state.pageNo = 1;
  applyPagination();
};

const applyPagination = () => {
  const currentTab = getCurrentTab();
  const { pageNo, limit } = state;
  const loadBtn = currentTab.querySelector(".button.load-more");
  loadBtn.classList.remove("hide");
  const selectedEl = currentTab.querySelectorAll(
    `div.trailer-item.w-dyn-item.sel`
  );
  const selectedNos = selectedEl.length;

  let f = (pageNo - 1) * limit;
  let r = f + (limit - 1);
  if (r + 1 >= selectedNos) {
    r = selectedNos - 1;
    loadBtn.classList.add("hide");
  }

  for (let i = 0; i < selectedNos; i++) {
    if (i <= r) selectedEl[i].classList.remove("hide");
    else selectedEl[i].classList.add("hide");
  }

  const tabEl = document.querySelector(
    `a.w-tab-link[data-w-tab="${currentTab.getAttribute("data-w-tab")}"]`
  );
  const totalEl = tabEl.querySelector(".results-count.absolute");
  const n = currentTab.querySelectorAll(
    `div.fs-results div.w-dyn-list div.trailer-item.sel`
  ).length;
  totalEl.textContent = n + "";
};

const populateTotal = () => {
  const tabEls = document.querySelectorAll(`a.w-tab-link[data-w-tab]`);
  tabEls.forEach((tabEl) => {
    const totalEl = tabEl.querySelector(".results-count.absolute");
    const title = tabEl.getAttribute("data-w-tab").trim();
    if (title) {
      const paneEl = document.querySelector(
        `div.w-tab-pane[data-w-tab="${title}"]`
      );
      const n = paneEl.querySelectorAll(
        `div.fs-results div.w-dyn-list div.trailer-item`
      ).length;
      totalEl.textContent = n + "";
    }
  });
};

const getCurrentTab = () =>
  document.querySelector(
    `div.w-tab-pane.w--tab-active[data-w-tab="${currentTab}"]`
  );

window.addEventListener("load", () => {
  populateTotal();

  // const currentTabEl = getCurrentTab();
  // const totalItems = currentTabEl.querySelectorAll(
  //   `div.trailer-item.w-dyn-item`
  // ).length;
  // const [dispEl, totalEl] = currentTabEl.querySelectorAll(`span.results-count`);
  // dispEl.textContent = totalItems;
  // totalEl.textContent = totalItems;

  document.querySelectorAll(".filter-chips").forEach((x) => {
    x.querySelectorAll("a").forEach((a) => a.remove());
  });

  for (const listItem of lists) {
    const { id, filterId } = listItem;
    const checkboxes = document.querySelectorAll(
      `div.filter-options.${id}-list input[type="checkbox"]`
    );
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
      checkbox.addEventListener("change", () => {
        const filterLabel = checkbox.nextElementSibling.textContent
          .toUpperCase()
          .trim();
        filters[filterId]?.[checkbox.checked ? "add" : "delete"](filterLabel);
        if (checkbox.checked) {
          const pillEl = createPillEl(filterLabel);
          getCurrentTab().querySelector("div.filter-chips").appendChild(pillEl);
          pillsMap.set(filterLabel, pillEl);
          pillEl.querySelector("img").addEventListener("click", () => {
            pillsMap.delete(filterLabel);
            checkbox.checked = false;
            pillEl.remove();
            filters[filterId]?.delete(filterLabel);
            applyFilters();
          });
        } else {
          const pillEl = pillsMap.get(filterLabel);
          checkbox.checked = false;
          pillEl.remove();
          filters[filterId]?.delete(filterLabel);
        }
        applyFilters();
      });
    }
  }

  const resetBtns = document.querySelectorAll(".reset-button");
  resetBtns.forEach((resetBtn) => {
    resetBtn.addEventListener("click", () => {
      for (const listItem of lists) {
        const { id, filterId } = listItem;
        filters[filterId].clear();
        const checkboxes = document.querySelectorAll(
          `div.filter-options.${id}-list input[type="checkbox"]`
        );
        for (const checkbox of checkboxes) {
          checkbox.checked = false;
          // checkbox.previousElementSibling.classList.remove(
          //   "w--redirected-checked"
          // );
        }
        document.querySelectorAll(".filter-chips").forEach((x) => {
          x.querySelectorAll("a").forEach((a) => a.remove());
        });
        applyFilters();
      }
    });
  });

  const loadMoreBtns = document.querySelectorAll(".load-more");
  loadMoreBtns.forEach((loadMoreBtn) =>
    loadMoreBtn.addEventListener("click", () => {
      state.pageNo++;
      applyPagination();
    })
  );

  const tabLinks = document.querySelectorAll(`a.w-tab-link[data-w-tab]`);
  tabLinks.forEach((tabLink) =>
    tabLink.addEventListener("click", () => {
      for (const listItem of lists) {
        const { id, filterId } = listItem;
        filters[filterId].clear();
        const checkboxes = document.querySelectorAll(
          `div.filter-options.${id}-list input[type="checkbox"]`
        );
        for (const checkbox of checkboxes) {
          checkbox.checked = false;
        }

        currentTab = tabLink.getAttribute("data-w-tab").trim();

        document.querySelectorAll(".filter-chips").forEach((x) => {
          x.querySelectorAll("a").forEach((a) => a.remove());
        });
        populateTotal();
        setTimeout(applyFilters, 500);
      }
    })
  );

  document
    .querySelectorAll(
      "#email-form-2, #wf-form-commercial-filters, #wf-form-extendable-filters"
    )
    .forEach((formEl) =>
      formEl.addEventListener("submit", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.stopPropagation();
      })
    );

  applyFilters();
});
