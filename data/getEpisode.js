import { state } from "./state.js";
import { messageForUser } from "../ui/msgToUser.js";
import { rootElement } from "../ui/domElements.js";

async function getEpisodeData(id) {
  if (state.isLoading) {
    console.warn("Fetch already in progress. Please wait.");
    return;
  }
  const url = `https://api.tvmaze.com/shows/${id}/episodes`;
  messageForUser(
    "Please wait while episodes data finish loading...",
    rootElement,
    "loadMsg"
  );
  try {
    state.isLoading = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const episodes = await response.json();
    state.allEpisodes = episodes; // update allEpisodes in state
  } catch (error) {
    console.error(error.message);
    messageForUser(
      "Episodes failed to load, please refresh the page.",
      document.body,
      "errLoadMsg"
    );
    document.body.appendChild(errorMessage);
  } finally {
    state.isLoading = false;
    if (state.isLoading) {
      loadingMessage.remove();
    }
  }
}

export { getEpisodeData };
