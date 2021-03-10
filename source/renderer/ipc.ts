import { ipcRenderer } from "electron";
import { getCurrentSourceID, setVaultsList } from "./state/vaults";
import { showAddVaultMenu } from "./state/addVault";
import { showPreferences } from "./state/preferences";
import { setFileHostCode } from "./state/fileHost";
import { fetchUpdatedFacade } from "./actions/facade";
import { unlockVaultSource } from "./actions/unlockVault";
import { VaultSourceDescription } from "./types";

ipcRenderer.on("add-vault", evt => {
    showAddVaultMenu(true);
});

ipcRenderer.on("file-host-code", (evt, payload) => {
    const { code } = JSON.parse(payload);
    setFileHostCode(code);
});

ipcRenderer.on("open-preferences", evt => {
    showPreferences(true);
});

ipcRenderer.on("open-source", (evt, sourceID) => {
    window.location.hash = `/source/${sourceID}`;
});

ipcRenderer.on("source-updated", (evt, sourceID) => {
    const currentSourceID = getCurrentSourceID();
    if (sourceID === currentSourceID) {
        fetchUpdatedFacade(sourceID);
    }
});

ipcRenderer.on("unlock-vault", async (evt, sourceID) => {
    await unlockVaultSource(sourceID);
});

ipcRenderer.on("unlock-vault-open", async (evt, sourceID) => {
    await unlockVaultSource(sourceID);
    window.location.hash = `/source/${sourceID}`;
});

ipcRenderer.on("vaults-list", (evt, payload) => {
    const vaults = JSON.parse(payload) as Array<VaultSourceDescription>;
    setVaultsList(vaults);
});
