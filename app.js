import {setQuery, setSelectedId, loadItems} from "./state.js";
import {el, render} from "./render.js";


// -----------------------------
// Event wiring
// -----------------------------

el.search.addEventListener("input", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
  
    setQuery(target.value);
    render();
  });
  
  el.retry.addEventListener("click", () => {
    loadItems();
  });
  
  el.list.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
  
    const btn = target.closest("button[data-id]");
    if (!btn) return;
  
    const id = btn.getAttribute("data-id");
    if (!id) return;
  
    setSelectedId(id);
    render();
  });
  
  // Boot
  loadItems();