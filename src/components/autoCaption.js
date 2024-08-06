const autoCaption = (filename) => {
  return filename
    .replaceAll("_", " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
    .replace(/\.[^/.]+$/, "");
};

export default autoCaption;
