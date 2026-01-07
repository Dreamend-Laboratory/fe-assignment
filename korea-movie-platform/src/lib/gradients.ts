// 모던한 그라디언트 팔레트 (부드럽지만 선명한 톤)
export const gradients = [
  'bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500',
  'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500',
  'bg-gradient-to-br from-orange-400 via-rose-500 to-pink-500',
  'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500',
  'bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500',
  'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500',
  'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
  'bg-gradient-to-br from-slate-500 via-gray-600 to-zinc-700',
];

/**
 * 영화 코드 기반으로 일관된 그라디언트 인덱스 반환
 */
export const getGradientIndex = (movieCd: string): number => {
  const hash = movieCd
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % gradients.length;
};

/**
 * 영화 코드 기반으로 그라디언트 클래스 반환
 */
export const getGradient = (movieCd: string): string => {
  return gradients[getGradientIndex(movieCd)];
};

/**
 * 인덱스 기반으로 그라디언트 클래스 반환 (순환)
 */
export const getGradientByIndex = (index: number): string => {
  return gradients[index % gradients.length];
};
