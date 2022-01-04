export default function randNorm() {
  return Array(12).fill(0).map(() => Math.random()).reduce((acc, curr) => acc + curr) - 6;
}