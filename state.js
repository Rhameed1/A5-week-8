import { render } from "./render.js";

const DATA_URL = "./data/items.json";

const state = {
    status: "idle", // "loading" | "error" | "ready"
    items: [],
    query: "",
    selectedId: null,
    errorMessage: "",
  };
  
  function setStatus(nextStatus, errorMessage = "") {
    state.status = nextStatus;
    state.errorMessage = errorMessage;
  }
  
  function setItems(items) {
    state.items = items;
  
    // Keep selection stable if possible.
    if (state.selectedId && items.some((it) => it.id === state.selectedId)) {
      return;
    }
  
    state.selectedId = items.length > 0 ? items[0].id : null;
  }
  
  function setQuery(query) {
    state.query = query;
  
    // If the current selection is filtered out, pick the first visible item.
    const visible = getVisibleItems(state);
    if (visible.length === 0) {
      state.selectedId = null;
      return;
    }
  
    if (!state.selectedId || !visible.some((it) => it.id === state.selectedId)) {
      state.selectedId = visible[0].id;
    }
  }
  
  function setSelectedId(id) {
    state.selectedId = id;
  }

// -----------------------------
// Derived UI (selectors)
// -----------------------------

function getVisibleItems(state) {
    const q = state.query.trim().toLowerCase();
    if (q === "") return state.items;
    return state.items.filter((it) => it.title.toLowerCase().includes(q));
  }
  
  function getSelectedItem(state) {
    if (!state.selectedId) return null;
    return state.items.find((it) => it.id === state.selectedId) ?? null;
  }
  
// -----------------------------
// Data loading
// -----------------------------

async function loadItems() {
    setStatus("loading");
    render();
  
    try {
      const response = await fetch(DATA_URL, { cache: "no-store" });
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while fetching ${DATA_URL}`);
      }
  
      const data = await response.json();
  
      // Minimal validation.
      if (!Array.isArray(data)) {
        throw new Error("Expected an array of items.");
      }
  
      const items = data
        .filter((it) => it && typeof it === "object")
        .map((it) => ({
          id: String(it.id ?? ""),
          title: String(it.title ?? ""),
          author: String(it.author ?? ""),
          year: Number(it.year ?? 0),
          tags: Array.isArray(it.tags) ? it.tags.map(String) : [],
          summary: String(it.summary ?? ""),
        }))
        .filter((it) => it.id && it.title);
  
      setItems(items);
      setStatus("ready");
      render();
    } catch (err) {
      console.error(err);
      setStatus("error", err instanceof Error ? err.message : String(err));
      render();
    }
  }
export {
    state, 
    setQuery,
    setSelectedId,
    getVisibleItems,
    getSelectedItem,
    loadItems,
}


    