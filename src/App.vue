
<script>
import Desk from "./components/Desk.vue"
import BTCTable from "./components/BTCTable.vue"
import { h } from "vue"

const routes = {
  "/": Desk,
  "/btc" : BTCTable
};

export default {
  name: "App",

  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute];
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
