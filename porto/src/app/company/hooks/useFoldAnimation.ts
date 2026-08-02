// TODO: Sprint berikutnya — Hook untuk animasi lipatan kertas.
// Akan mengontrol rotasi panel kanan, opacity shadow, dan kemunculan
// FloatingProfileCard menggunakan GSAP ScrollTrigger dengan scrub.
// Untuk sementara mengembalikan nilai default.

export function useFoldAnimation() {
  // TODO: Implementasi fold animation dengan GSAP
  return { foldProgress: 0, foldRefs: { right: null, shadow: null, card: null } };
}
