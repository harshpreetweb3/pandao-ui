export function clipAddress(input) {
    const start = input.slice(0, 10);
    const end = input.slice(-10);
    return `${start}.......${end}`;
}

