# MPC Dashboard Sync untuk Cloudflare Pages

## Isi
- `index.html`
- `functions/api/state.js`

## Yang perlu dibuat di Cloudflare
1. Buat database **D1**.
2. Jalankan SQL ini:

```sql
CREATE TABLE IF NOT EXISTS app_state (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

3. Upload folder ini ke **Cloudflare Pages**.
4. Di Pages, sambungkan binding D1 dengan nama **DB**.

## Catatan
- Data WO dan user sekarang disimpan ke server, jadi antar device sinkron.
- File media masih tersimpan sebagai base64 di JSON; kalau file besar, nanti sebaiknya pindah ke Cloudflare R2.
