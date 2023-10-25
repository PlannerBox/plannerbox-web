const minLengthRegex = (length: number) => new RegExp(`^.{${length},}$`);

export { minLengthRegex };
