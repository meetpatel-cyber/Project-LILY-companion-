import { invoke } from "@tauri-apps/api/core";
import {
  getCurrentWindow,
  PhysicalPosition,
  availableMonitors,
} from "@tauri-apps/api/window";

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

async function restorePosition() {
  const savedPos = localStorage.getItem("lily-window-pos");
  if (savedPos) {
    try {
      const pos = JSON.parse(savedPos);
      if (typeof pos.x === "number" && typeof pos.y === "number") {
        const monitors = await availableMonitors();
        let isVisible = false;
        for (const m of monitors) {
          const mx = m.position.x;
          const my = m.position.y;
          const mw = m.size.width;
          const mh = m.size.height;
          // Check if window is at least partially visible (100px margin)
          if (
            pos.x >= mx - 100 &&
            pos.x <= mx + mw - 100 &&
            pos.y >= my - 100 &&
            pos.y <= my + mh - 100
          ) {
            isVisible = true;
            break;
          }
        }
        if (isVisible) {
          await appWindow.setPosition(new PhysicalPosition(pos.x, pos.y));
        }
      }
    } catch (e) {
      console.warn("Failed to restore position", e);
    }
  }

  appWindow.onMoved(({ payload }) => {
    localStorage.setItem(
      "lily-window-pos",
      JSON.stringify({ x: payload.x, y: payload.y }),
    );
  });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  document.querySelector(".container")?.addEventListener("mousedown", (e) => {
    // Use type assertion to tell TypeScript this is a MouseEvent
    const target = e.target as HTMLElement;
    if (
      (e as MouseEvent).buttons === 1 &&
      target.tagName !== "INPUT" &&
      target.tagName !== "BUTTON"
    ) {
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

  // Phase 1B Logic

  // 1. Position Persistence
  restorePosition();
});
