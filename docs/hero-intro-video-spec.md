# Hero Intro Video — Spec

## Tujuan
Preloader saat ini langsung "mendarat" di frame 001 dari image sequence, yang isinya sengaja kosong (tahap "background kosong" di narasi) — jadi kesannya datar/statis di detik-detik pertama sebelum user scroll. Video ini mengisi jeda itu dengan gerakan ambient, lalu di-handoff mulus ke canvas image sequence begitu user mulai scroll.

## Perilaku playback (bagaimana ini akan dipasang di kode)
- Autoplay begitu preloader selesai (muted + autoplay + `playsinline` — wajib untuk autoplay di browser mobile)
- Loop terus selama user belum scroll, supaya tidak pernah terlihat "berhenti"/freeze
- Begitu user scroll (walau cuma beberapa piksel), video di-crossfade ke canvas image sequence dan kendali berpindah ke scroll — **scroll tidak boleh diblokir menunggu video selesai**
- Tanpa audio (selalu muted)

## Spesifikasi teknis
| Aspek | Nilai |
|---|---|
| Format | MP4 (H.264, yuv420p). WebM (VP9) opsional untuk cadangan/lebih ringan |
| Resolusi | 1920×1080 (minimal 1280×720 — samakan dengan native frame sequence yang ada) |
| Aspect ratio | 16:9, **full-bleed** — jangan sampai ada pillarbox/letterbox hitam di sisi kiri-kanan (frame 1–24 di sequence yang sekarang punya masalah ini, jangan diulang) |
| Frame rate | 24–30 fps |
| Durasi | 3–5 detik (cukup untuk loop halus, dan file tetap kecil) |
| Target ukuran file | < ±1.5 MB untuk durasi/resolusi segitu (referensi: hero loop kompetitor 6.9 detik @ 864×496 = 951 KB — jaga bitrate efisien, mis. CRF ~23–28 kalau export via ffmpeg) |
| Loop | Harus rapat — frame pertama & terakhir video sebaiknya mirip, atau pakai crossfade-loop saat export, supaya sebelum user scroll, looping-nya tidak terlihat "patah" |
| Audio | Tidak ada / muted |

## Brief kreatif — bagian paling penting

- **Warna background**: harus senada dengan background sequence yang sudah ada — golden-beige studio backdrop hangat (kisaran `#E6B96A`–`#B86A25`), arah highlight/cahaya dari kanan-atas melembut ke bayangan hangat di kiri-bawah (persis seperti di frame-frame sequence sekarang).
- **Tanpa pillarbox**: isi penuh frame 16:9 dengan backdrop, jangan seperti crop kotak-di-tengah pada frame 1–24 sequence lama.
- **Konten minim**: video ini masih tahap "background kosong" — gerakan ambient saja (napas cahaya pelan, sedikit partikel debu/tepung melayang halus, depth-of-field yang bergerak lembut). **Jangan** sudah ada bahan/ingredients masuk — itu tugas image sequence begitu scroll dimulai.
- **KRITIS — frame terakhir video harus semirip mungkin dengan frame 001 sequence yang sekarang** (tone gradient sama, level crop/zoom sama, komposisi sama-sama kosong). Di situ titik crossfade video → canvas terjadi, jadi harus mulus tanpa lompatan visual. Begitu ada draft video, kirim ke saya — saya bisa bandingkan langsung dengan frame 001 kita dan kasih catatan penyesuaian kalau belum pas.

## Delivery
- Nama file: `hero-intro.mp4`, taruh di `public/`
- Kalau bisa, sertakan juga satu file JPG dari frame terakhir video (`hero-intro-last-frame.jpg`) — berguna untuk bikin titik crossfade yang instan, tanpa kedip.

## Catatan implementasi (untuk referensi saya sendiri nanti)
- Komponen baru `HeroIntroVideo` akan duduk di atas canvas `SequenceScroll`, opacity 1 saat awal
- Listener scroll pertama (atau `scrollY > 0`) → fade out video (200–300ms), fade in canvas, lalu unmount video
- Video di-pause begitu di-unmount supaya tidak ada decode/CPU sia-sia di background
