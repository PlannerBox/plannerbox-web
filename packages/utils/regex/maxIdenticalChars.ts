const maxIdenticalCharsRegex = (length: number) =>
  new RegExp(`(\\w)\\1{${length},}`);

export { maxIdenticalCharsRegex };
