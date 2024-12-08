
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as digitalAssetManagerIdl } from "../../src/declarations/DigitalAssetManager";


const canisterId = "CANISTER_ID"; 

// HttpAgent ve Actor oluþturma
const agent = new HttpAgent();
const digitalAssetManager = Actor.createActor(digitalAssetManagerIdl, {
    agent,
    canisterId,
});

// Kullanicidan varlik olusturma
document.getElementById("createAssetBtn").addEventListener("click", async () => {

    const ipfsHash = document.getElementById("ipfsHash").value;
    const metadata = document.getElementById("metadata").value;

    // girislerin bos olup olmadigini kontrol et
    if (!ipfsHash || !metadata) {
        alert("Please fill in all fields.");
        return;
    }

    //  yeni varlik oluþturma
    try {
        const assetId = await digitalAssetManager.createAsset(ipfsHash, metadata);
        alert(`Asset created successfully with ID: ${assetId}`);
    } catch (error) {
        console.error("Failed to create asset:", error);
        alert("Failed to create asset. Check the console for more details.");
    }
});

// varliklari yükleme ve listeleme
document.getElementById("loadAssetsBtn").addEventListener("click", async () => {
    try {
        const userPrincipal = await agent.getPrincipal();

        const assets = await digitalAssetManager.getUserAssets(userPrincipal);

        // Listeyi temizleme ve varlikleri listeleme
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
