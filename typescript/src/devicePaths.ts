function lastNode(path: string[]): string {
  return path[path.length - 1];
}

export function findPath(
  connections: Record<string, string[]>,
  start: string,
  end: string
): string[] | null {
  const queue: string[][] = [[start]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = lastNode(path);

    if (current === end) {
      return path;
    }

    if (visited.has(current)) {
      continue;
    }
    visited.add(current);

    const neighbors = connections[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}

export function formatPath(path: string[]): string {
  return path.join(" -> ");
}
