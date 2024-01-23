<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="table-layout">
    <table>
      <tr class="table-header">
        <th v-for="heading of columns" :key="heading.key" class="font-bold">
          <slot :name="`filter-${heading.key}`" :column="heading"></slot>
        </th>
      </tr>

      <tr v-for="(eachEntry, i) of data" :key="eachEntry.cell">
        <td v-for="column in columns" :key="column.key">
          <slot :name="`rows-${column.key}`" :rows="eachEntry" :columns="column" :index="i"></slot>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.table-layout {
  max-height: 30rem;
  overflow: auto;
  min-width: 40rem;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  text-align: center;
}
.font-bold {
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
.table-header {
  position: sticky;
  background: #fff;
  top: 0px;
}
</style>
