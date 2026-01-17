export function bottles(count: number): string {
  if (count === 0) {
    return "no more bottles";
  }
  if (count === 1) {
    return "1 bottle";
  }
  return `${count} bottles`;
}

export function verse(number: number): string {
  if (number === 0) {
    return (
      "No more bottles of soda on the wall, no more bottles of soda.\n" +
      "Go to the store and buy some more, 99 bottles of soda on the wall."
    );
  }

  const current = bottles(number);
  const next = bottles(number - 1);
  const nextCapitalized = number === 1 ? "No more bottles" : next;

  return (
    `${capitalize(current)} of soda on the wall, ${current} of soda.\n` +
    `Take one down and pass it around, ${nextCapitalized} of soda on the wall.`
  );
}

export function sing(start: number = 99, end: number = 0): string {
  const verses: string[] = [];
  for (let i = start; i >= end; i--) {
    verses.push(verse(i));
  }
  return verses.join("\n\n");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
