
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as digitalAssetManagerIdl } from "../../src/declarations/DigitalAssetManager";


const canisterId = "CANISTER_ID"; 

// HttpAgent ve Actor olu�turma
const agent = new HttpAgent();
const digitalAssetManager = Actor.createActor(digitalAssetManagerIdl, {
    agent,
    canisterId,
});

// Kullan�c�dan varl�k olu�turma
document.getElementById("createAssetBtn").addEventListener("click", async () => {

    const ipfsHash = document.getElementById("ipfsHash").value;
    const metadata = document.getElementById("metadata").value;

    // Giri�lerin bo� olup olmad��� kontrol
    if (!ipfsHash || !metadata) {
        alert("Please fill in all fields.");
        return;
    }

    //  yeni varl�k olu�turma
    try {
        const assetId = await digitalAssetManager.createAsset(ipfsHash, metadata);
        alert(`Asset created successfully with ID: ${assetId}`);
    } catch (error) {
        console.error("Failed to create asset:", error);
        alert("Failed to create asset. Check the console for more details.");
    }
});

// varl�klar� y�kleme ve listeleme
document.getElementById("loadAssetsBtn").addEventListener("click", async () => {
    try {
        //  Principal'�n� al
        const userPrincipal = await agent.getPrincipal();

        const assets = await digitalAssetManager.getUserAssets(userPrincipal);

        // Listeyi temizleme ve varl�klar� listeleme
        const assetsList = document.getElementById("assetsList");
        assetsList.innerHTML = ""; 

        assets.forEach((asset) => {
            const li = document.createElement("li");
            li.textContent = `ID: ${asset.id}, Metadata: ${asset.metadata}`;
            assetsList.appendChild(li);
        });

        if (assets.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No assets found.";
            assetsList.appendChild(li);
        }
    } catch (error) {
        console.error("Failed to load user assets:", error);
        alert("Failed to load user assets. Check the console for more details.");
    }
});
