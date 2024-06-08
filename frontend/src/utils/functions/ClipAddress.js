export function clipAddress(input) {
    if (!input) return "";
    const start = input.slice(0, 10);
    const end = input.slice(-10);
    return `${start}.......${end}`;
  }
  