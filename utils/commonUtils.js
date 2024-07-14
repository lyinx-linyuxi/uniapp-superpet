/**
 * 复制文本到剪贴板
 * @param data
 */
export const copyToClipboard = (data) => {
  try {
    window.navigator.clipboard
      .writeText(data.content)
      .then(() => {
        data?.success && typeof data.success === "function" && data.success();
      })
      .catch(() => {
        data?.error && typeof data.error === "function" && data.error();
      });
  } catch (error) {
    console.error("无法使用 navigator.clipboard API:", error);
    // 在无法使用 navigator.clipboard API 的情况下，提供备选方案
    fallbackCopyToClipboard(data);
  }
};

/**
 * 复制文本到剪贴板的兼容性写法（在无法使用 navigator.clipboard API 的情况下）
 * @param data
 */
const fallbackCopyToClipboard = (data) => {
  const textarea = document.createElement("textarea");
  textarea.value = data.content;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  data.success && typeof data.success === "function" && data.success();
};
