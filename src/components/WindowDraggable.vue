<template>
  <Vue3DraggableResizable
    class="window"
    v-show="!closed"
    @drag-end="change"
    @resize-end="change"
    v-model:x="x"
    v-model:y="y"
    v-model:w="w"
    v-model:h="h"
  >
    <div class="window-header">
      <a class="close-btn" @click="close">X</a>
      <div class="window-title">{{ item.title }}</div>
    </div>
    <div class="window-text"></div>
  </Vue3DraggableResizable>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { setWindow } from "@/main";

const grid_size_cell = 50;

const grid_size = (val) => Math.round(val / grid_size_cell) * grid_size_cell;

export default {
  components: { Vue3DraggableResizable },
  name: "WindowDraggable",
  props: {
    item: Object,
  },
  data() {
    return {
      value_new: this.item,
      x: this.item.x,
      y: this.item.y,
      w: this.item.w,
      h: this.item.h,
      closed_new: this.item.closed,
    };
  },
  computed: {
    value: {
      get() {
        return this.value_new;
      },
      set(val) {
        this.value_new = val;
        this.$emit("update:modelValue", val);
        this.$emit("update", val);
      },
    },
    closed: {
      get() {
        return this.item.closed;
      },
      set(val) {
        this.closed_new = val;
      },
    },
  },
  methods: {
    save() {
      this.value = {
        id: this.item.id,
        title: this.item.title,
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h,
        closed: this.closed_new,
      };
    },
    change() {
      this.x = grid_size(this.x);
      this.y = grid_size(this.y);
      this.w = grid_size(this.w);
      this.h = grid_size(this.h);
      this.closed = false;

      this.save();
    },
    close() {
      this.closed = true;
      setWindow(this);
      console.log(this);
      this.save();
    },
  },
};
</script>

<style scoped>
.window {
  box-sizing: border-box;
  background: white;
  border: 1px solid black;
  position: absolute;
  cursor: pointer;
  min-width: 150px;
  min-height: 70px;
}

.window.closed {
  display: none;
}

.window-header {
  position: relative;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 0.5em 2em;
}

.window-header .close-btn {
  position: absolute;
  right: 1em;
}
</style>

