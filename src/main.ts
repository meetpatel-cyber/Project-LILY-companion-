import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  document.querySelector(".titlebar")?.addEventListener("mousedown", (e) => {
    // Use type assertion to tell TypeScript this is a MouseEvent
    if ((e as MouseEvent).buttons === 1) {
      appWindow.startDragging();
    }
  });

  document
    .getElementById("titlebar-minimize")
    ?.addEventListener("click", async () => {
      try {
        await appWindow.minimize();
      } catch (e: any) {
        if (greetMsgEl) greetMsgEl.textContent = "Min error: " + e.toString();
      }
    });

  document
    .getElementById("titlebar-close")
    ?.addEventListener("click", async () => {
      try {
        await appWindow.close();
      } catch (e: any) {
        if (greetMsgEl) greetMsgEl.textContent = "Close error: " + e.toString();
      }
    });
});
