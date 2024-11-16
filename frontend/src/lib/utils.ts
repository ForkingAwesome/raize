export function getCardImage({ rank, suit }: { rank: string; suit: string }) {
  return `/cards/${rank},${suit}.png`;
}
