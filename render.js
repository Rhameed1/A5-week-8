import {state, getVisibleItems, getSelectedItem} from "./state.js";

// -----------------------------
// DOM references
// -----------------------------

const el = {
    search: document.querySelector("#search"),
    status: document.querySelector("#status"),
    errorBox: document.querySelector("#error"),
    errorMessage: document.querySelector("#errorMessage"),
    retry: document.querySelector("#retry"),
    list: document.querySelector("#list"),
    detail: document.querySelector("#detail"),
  };
  
  // -----------------------------
  // Rendering
  // -----------------------------
  
  function render() {
    renderStatus();
    renderError();
    renderList();
    renderDetail();
  }
  
  function renderStatus() {
    if (state.status === "loading") {
      el.status.textContent = "Loading…";
      return;
    }
  
    if (state.status === "error") {
      el.status.textContent = "";
      return;
    }
  
    const visibleCount = getVisibleItems(state).length;
    const totalCount = state.items.length;
  
    if (state.status === "ready") {
      if (totalCount === 0) {
        el.status.textContent = "No items loaded.";
        return;
      }
  
      if (visibleCount === 0) {
        el.status.textContent = "No matches.";
        return;
      }
  
      el.status.textContent = `${visibleCount} shown (${totalCount} total)`;
      return;
    }
  
    el.status.textContent = "";
  }
  
  function renderError() {
    const isError = state.status === "error";
    el.errorBox.hidden = !isError;
    if (!isError) return;
  
    el.errorMessage.textContent = state.errorMessage || "Something went wrong.";
  }
  
  function renderList() {
    el.list.replaceChildren();
  
    if (state.status !== "ready") {
      return;
    }
  
    const items = getVisibleItems(state);
    for (const item of items) {
      const li = document.createElement("li");
  
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.id = item.id;
      btn.setAttribute("aria-current", item.id === state.selectedId ? "true" : "false");
  
      // Avoid innerHTML: render untrusted strings safely.
      btn.textContent = `${item.title} (${item.year})`;
  
      li.append(btn);
      el.list.append(li);
    }
  }
  
  function renderDetail() {
    el.detail.replaceChildren();
  
    if (state.status !== "ready") {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "Details will appear when data is loaded.";
      el.detail.append(p);
      return;
    }
  
    const item = getSelectedItem(state);
    if (!item) {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "Select an item from the list.";
      el.detail.append(p);
      return;
    }
  
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
  
    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = `${item.author} · ${item.year}`;
  
    const summary = document.createElement("p");
    summary.textContent = item.summary;
  
    const tags = document.createElement("p");
    tags.className = "muted";
    tags.textContent = `Tags: ${item.tags.join(", ")}`;
  
    el.detail.append(h3, meta, summary, tags);
  }

  export {
    el, 
    render, 
  }
  