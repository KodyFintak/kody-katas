function lastNode(path: string[]): string {
  return path[path.length - 1];
}

function unvisitedNeighbors(
  connections: Record<string, string[]>,
  node: string,
  visited: Set<string>
): string[] {
  const neighbors = connections[node] || [];
  return neighbors.filter((n) => !visited.has(n));
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

    for (const neighbor of unvisitedNeighbors(connections, current, visited)) {
      queue.push([...path, neighbor]);
    }
  }

  return null;
}

export function formatPath(path: string[]): string {
  return path.join(" -> ");
}
