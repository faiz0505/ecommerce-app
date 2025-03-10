export default function textFormatter(text, length) {
    /**
     * Cuts the given text to the specified length.
     *
     * @param {string} text The input text string.
     * @param {number} length The desired length of the output text.
     * @returns {string} The cut text, with "..." appended if the original text exceeds the specified length.
     */
    if (text.length > length) {
      return text.substring(0, length) + "...";
    } else {
      return text;
    }
  }

