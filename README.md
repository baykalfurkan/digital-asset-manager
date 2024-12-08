# Digital Asset Manager


## Özellikler

- Dijital varlık oluşturma
- Varlık transferi (sahip değiştirme)
- Varlık bilgilerini sorgulama
- Kullanıcı bazında varlık listeleme
- Varlık transfer geçmişi sorgulama



### Kullanım

1. **Varlık oluşturma:**

   ```bash
   dfx canister call DigitalAssetManager createAsset '("ipfs_hash_example", "metadata_example")'
   

2. **Varlık transferi::**
   
   ```bash
   dfx canister call DigitalAssetManager transferAsset '(1, "principal_id")'


4. **Varlık bilgilerini sorgulama:**
   
   ```bash
   dfx canister call DigitalAssetManager getAsset '(1)'

  
5. **Kullanıcı varlıklarını listeleme:**
   
   ```bash
   dfx canister call DigitalAssetManager getUserAssets '("principal_id")'


6. **Transfer geçmişi sorgulama:**
   
   ```bash
   dfx canister call DigitalAssetManager getTransferHistory '(1)'
   
