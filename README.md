# MPC Dashboard untuk Cloudflare Pages Git Integration

Struktur project:
- `index.html`
- `functions/api/state.js`

## Cara pakai
1. Extract ZIP ini.
2. Buat repo baru di GitHub.
3. Upload semua isi folder ini ke repo.
4. Di Cloudflare Pages, pilih **Connect to Git**.
5. Pilih repo GitHub tadi.
6. Build command kosong.
7. Output directory kosong atau `/` (karena ini static HTML).
8. Tambahkan binding D1 dengan nama `DB` di **Settings > Functions > Bindings**.
9. Buat tabel D1:

```sql
CREATE TABLE IF NOT EXISTS app_state (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

## Catatan
- Git integration mendukung deploy otomatis saat push ke repo.
- Folder `/functions` harus ada di root project supaya Pages Functions terbaca.
- Direct Upload dari dashboard tidak memproses folder `functions`.
- Data WO dan user disimpan ke D1, jadi sinkron antar device.
