
# Digital Asset Manager

## Özellikler

- Dijital varlık oluşturma
- Varlık transferi
- Varlık bilgilerini sorgulama
- Kullanıcı bazında varlık listeleme
- Varlık transfer geçmişi sorgulama

## Kurulum ve Çalıştırma

### Backend (Canister)

#### DFX Başlatın
DFX geliştirme ortamını başlatmak için terminalde `backend` klasörüne gidin ve aşağıdaki komutu çalıştırın:

```bash
dfx start --clean
```



#### Canister'ı Deploy Edin
Başka bir terminal penceresinde proje klasörüne gidin ve aşağıdaki komutla canister'ı dağıtın:

```bash
dfx deploy
```



#### Canister ID'lerini Kaydedin
Dağıtım tamamlandıktan sonra backend canister ID'sini alın. Bu ID'yi projede frontend ile backend'i bağlamak için kullanacaksınız:

```bash
dfx canister id DigitalAssetManager
```

### Frontend

#### Frontend'i Açın
Frontend, basit bir HTML dosyasından oluşmaktadır. `frontend/index.html` dosyasını bir tarayıcıda açarak çalıştırabilirsiniz.

#### Frontend ile Backend Bağlantısını Yapın
`frontend/script.js` içinde, aşağıdaki satırı bulun ve `YOUR_CANISTER_ID` yerine backend canister ID'sini yazın:

```javascript
const canisterId = "YOUR_CANISTER_ID";
```



## Kullanım

Aşağıdaki komutları kullanarak projenin sağladığı işlevleri test edebilirsiniz:

### 1. **Varlık Oluşturma**

Yeni bir dijital varlık oluşturmak için şu komutu kullanın:

```bash
dfx canister call DigitalAssetManager createAsset '("ipfs_hash_example", "metadata_example")'
```

- `ipfs_hash_example`: Varlığın IPFS hash değeri.
- `metadata_example`: Varlığa ait açıklama veya metadata bilgisi.

### 2. **Varlık Transferi**

Oluşturduğunuz bir varlığı başka bir kullanıcıya transfer etmek için:

```bash
dfx canister call DigitalAssetManager transferAsset '(1, "principal_id")'
```

- `1`: Transfer edilecek varlığın ID'si.
- `principal_id`: Varlığın gönderileceği kullanıcının kimliği.

### 3. **Varlık Bilgilerini Sorgulama**

Bir varlığın detaylarını görmek için:

```bash
dfx canister call DigitalAssetManager getAsset '(1)'
```

- `1`: Sorgulamak istediğiniz varlığın ID'si.

### 4. **Kullanıcı Varlıklarını Listeleme**

Bir kullanıcıya ait tüm varlıkları listelemek için:

```bash
dfx canister call DigitalAssetManager getUserAssets '("principal_id")'
```

- `principal_id`: Varlıkları sorgulanacak kullanıcının kimliği.

### 5. **Transfer Geçmişini Sorgulama**

Bir varlığın geçmişteki tüm transferlerini görmek için:

```bash
dfx canister call DigitalAssetManager getTransferHistory '(1)'
```

- `1`: Transfer geçmişini görmek istediğiniz varlığın ID'si.

---


