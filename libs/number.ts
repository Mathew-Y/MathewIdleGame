import Numbro from "numbro";

export const formatNumberWithSpaces = (number: number): string => {
  if (number < 1_000_000_000) {
    return Numbro(number).format({ output: "number" });
  }

  return Numbro(number).format({
    average: true,
    output: "number",
    trimMantissa: true,
    totalLength: 4,
  });
};
