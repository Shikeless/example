export default {
  bind(el, { value }) {
    window.M.Tooltip.init(el, { html: value });
  },
  unbind(el) {
    const tooltip = window.M.Tooltip.getInstance(el).destroy();
    console.log(tooltip);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
