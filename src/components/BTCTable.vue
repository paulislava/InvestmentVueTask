<template>
  <div class="btc-desk">
    <div class="buttons">
      <button class="btn green" type="button" @click="start">Старт</button>
      <button class="btn red" type="button" @click="pause">Остановка</button>
      <button class="btn yellow" type="button" @click="clear">Сброс</button>
    </div>
    <h2>Сумма: <span id="sum">{{ total_sum }}</span></h2>
    <table class="table" border="1">
      <thead>
        <tr>
          <th>От кого</th>
          <th>Кому</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.x.hash">
          <td>{{ row.x.inputs[0].script }}</td>
          <td>{{ row.x.out[0].script }}</td>
          <td>{{ row.x.inputs[0].prev_out.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  table-layout: fixed;
}

.table td {
    word-break: break-all;
}
</style>

<script>
export default {
  name: "BTCTable",
  data() {
    return {
      rows: [],
      total_sum: 0
    };
  },
  methods: {
    start() {
      this.$socket.send('{"op": "unconfirmed_sub"}')

      this.$options.sockets.onmessage = (data) => {
        const row = JSON.parse(data.data)
        this.rows.push(row);
        this.total_sum += parseInt(row.x.inputs[0].prev_out.value)
        console.log(data.data);
      };
    },

    pause() {
        this.$socket.send('{"op": "unconfirmed_unsub"}')
    },
    clear() {
        this.rows = []
        this.total_sum = 0
    }
  },
};
</script>