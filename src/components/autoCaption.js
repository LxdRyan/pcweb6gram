const autoCaption = (filename) => {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace("-", " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
};

export default autoCaption;
