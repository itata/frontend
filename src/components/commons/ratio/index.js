import { formatDecimal } from "../../../misc/commons";

export default {
  name: "ratio",
  props: ["value", "unit"],
  computed: {
    className() {
      if (this.value > 0) {
        return "fa fa-play fa-rotate-270 text-warning";
      } else if (this.value < 0) {
        return "fa fa-play fa-rotate-90 text-danger";
      }
      return "";
    },
    prefix() {
      if (this.value > 0) {
        return "+";
      }
      return "";
    },
    text() {
      if (this.value === 0) {
        return "";
      }
      return `${formatDecimal(this.value, "0", 2)}${this.unit || ""}`;
    }
  }
};
