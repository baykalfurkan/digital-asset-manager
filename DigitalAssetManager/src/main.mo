import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

actor DigitalAssetManager {
    // varlık yapısı

    type Asset = {
        id: Nat;
        owner: Principal;
        ipfsHash: Text;
        createdAt: Time.Time;
        metadata: Text;
    };

    // varlık transfer kaydı
    type TransferRecord = {
        assetId: Nat;
        from: Principal;
        to: Principal;
        timestamp: Time.Time;
    };

    private stable var nextAssetId: Nat = 0;
    private var assets = HashMap.HashMap<Nat, Asset>(0, Nat.equal, Hash.hash);
    private var transfers = Array.init<TransferRecord>(0, {
        assetId = 0;
        from = Principal.fromText("");
        to = Principal.fromText("");
        timestamp = 0;
    });

    // yeni varlık 
    public shared(msg) func createAsset(ipfsHash: Text, metadata: Text) : async Nat {
        let asset: Asset = {
            id = nextAssetId;
            owner = msg.caller;
            ipfsHash = ipfsHash;
            createdAt = Time.now();
            metadata = metadata;
        };
        
        assets.put(nextAssetId, asset);
        nextAssetId += 1;
        
        return asset.id;
    };

    // varlık transfer etme
    public shared(msg) func transferAsset(assetId: Nat, to: Principal) : async Bool {
        switch (assets.get(assetId)) {
            case null { return false; };
            case (?asset) {
                if (asset.owner != msg.caller) {
                    return false;
                };

                let newAsset: Asset = {
                    id = asset.id;
                    owner = to;
                    ipfsHash = asset.ipfsHash;
                    createdAt = asset.createdAt;
                    metadata = asset.metadata;
                };

                let transfer: TransferRecord = {
                    assetId = assetId;
                    from = msg.caller;
                    to = to;
                    timestamp = Time.now();
                };

                assets.put(assetId, newAsset);
                transfers := Array.append(transfers, Array.make(transfer));
                
                return true;
            };
        };
    };

    // varlık bilgilerini getirme
    public query func getAsset(assetId: Nat) : async ?Asset {
        assets.get(assetId)
    };

    // kullanıcının varlıklarını listeleme
    public query func getUserAssets(user: Principal) : async [Asset] {
        var userAssets: [Asset] = [];
        for ((id, asset) in assets.entries()) {
            if (asset.owner == user) {
                userAssets := Array.append(userAssets, Array.make(asset));
            };
        };
        userAssets
    };

    // transfer geçmişini getirme
    public query func getTransferHistory(assetId: Nat) : async [TransferRecord] {
        Array.filter(transfers, func(t: TransferRecord) : Bool {
            t.assetId == assetId
        })
    };
}