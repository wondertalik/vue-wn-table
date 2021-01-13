import VueWnTable from "./components";

const VueWnTablePlugin = {
  install(Vue) {
    Vue.component(VueWnTable.name, VueWnTable);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueWnTablePlugin);
}

export default VueWnTablePlugin;
export { VueWnTable };
