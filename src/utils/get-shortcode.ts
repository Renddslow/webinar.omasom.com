import crypto from "crypto";

const NAUGHTY_WORDS = process.env.NAUGHTY_WORDS?.split(",") || ["butt"];

const generateShortcode = () =>
  parseInt(crypto.randomUUID().replace("-", ""), 16).toString(36).slice(-6);

const shortCodeIsNaughty = (shortcode: string) => {
  for (const word of NAUGHTY_WORDS) {
    if (shortcode.toLowerCase().includes(word)) {
      return true;
    }
  }
  return false;
};
const shortCodeHasNumbers = (shortcode: string) => {
  return /\d/.test(shortcode);
};
const shortCodeHasLetters = (shortcode: string) => {
  return /[a-zA-Z]/.test(shortcode);
};

const shortcodeIsValid = (shortcode: string) =>
  !shortCodeIsNaughty(shortcode) &&
  shortCodeHasNumbers(shortcode) &&
  shortCodeHasLetters(shortcode);

export const getShortcode = () => {
  let shortcode = generateShortcode();
  while (!shortcodeIsValid(shortcode)) {
    shortcode = generateShortcode();
  }
  return shortcode;
};
