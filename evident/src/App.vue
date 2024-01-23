<script setup>
import { onBeforeMount, ref } from 'vue'
import DataTable from './components/DataTable.vue'
import PopOver from './components/PopOver.vue'
import { formatName, formatDOB, flatObj } from './utils'

let userData = ref([])

const columns = ref([
  {
    key: 'sno',
    label: 'SNo.'
  },
  { key: 'name', label: 'Name' },
  {
    key: 'dob',
    label: 'DOB'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'location',
    label: 'Location'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'picture',
    label: 'Picture'
  }
])

const checkFlat = flatObj()

async function fetchUsers() {
  const data = await fetch('https://randomuser.me/api/?results=50')
  const res = await data.json()
  userData.value = res.results.sort((a, b) => b['name'].first.localeCompare(a['name'].first))
  console.log(res.results, 'userdatata')
}

function filterByName(key = 'name', order) {
  let updateRows
  if (order === 'asc') {
    updateRows = userData.value.sort((a, b) => a[key].first.localeCompare(b[key].first))
  } else {
    updateRows = userData.value.sort((a, b) => b[key].first.localeCompare(a[key].first))
  }
  userData.value = updateRows
}

function filterByDOB(key = 'dob', order) {
  const updateRows = userData.value.sort((a, b) => {
    const first = new Date(a[key].date)
    const second = new Date(b[key].date)
    if (order === 'asc') {
      if (first > second) {
        return 1
      }
      return -1
    } else {
      if (first < second) {
        return 1
      }
      return -1
    }
  })

  userData.value = updateRows
}

function filterByEmail(key = 'email', order) {
  if (order === 'asc') {
    updateRows = userData.value.sort((a, b) => a[key].localeCompare(b[key]))
  } else {
    updateRows = userData.value.sort((a, b) => b[key].localeCompare(a[key]))
  }
  userData.value = updateRows
}

function filterByLocation(key = 'location', order) {
  let updateRows
  if (order === 'asc')
    updateRows = userData.value.sort((a, b) => {
      return a.location.street.name.localeCompare(b.location.street.name)
    })
  else {
    updateRows = userData.value.sort((a, b) => {
      return b.location.street.name.localeCompare(a.location.street.name)
    })
  }
  userData.value = updateRows
}

onBeforeMount(() => {
  fetchUsers()
})
</script>

<template>
  <div class="app-layout">
    <DataTable :data="userData" :columns="columns">
      <template #filter-sno="slotProps"> {{ slotProps.column.label }} </template>
      <template #filter-name="slotProps">
        {{ slotProps.column.label }}
        <PopOver :handleSelect="filterByName" :key="slotProps.column.key" />
      </template>
      <template #filter-dob="slotProps">
        {{ slotProps.column.label }}
        <PopOver :handleSelect="filterByDOB" :key="slotProps.column.key" />
      </template>
      <template #filter-email="slotProps">
        {{ slotProps.column.label }}
        <PopOver :handleSelect="filterByEmail" :key="slotProps.column.key" />
      </template>
      <template #filter-location="slotProps">
        {{ slotProps.column.label }}
        <PopOver :handleSelect="filterByLocation" :key="slotProps.column.key" />
      </template>
      <template #filter-phone="slotProps">
        {{ slotProps.column.label }}
        <PopOver :handleSelect="filterByLocation" :key="slotProps.column.key" />
      </template>
      <template #filter-picture="slotProps">
        {{ slotProps.column.label }}
        <div class="cursor" @click="filterByLocation(slotProps.column.key)"></div>
      </template>
      <template #rows-sno="slotProps">
        {{ slotProps.index + 1 }}
      </template>
      <template #rows-email="slotProps">
        {{ slotProps.rows[slotProps.columns.key] }}
      </template>
      <template #rows-location="slotProps">
        {{ checkFlat(slotProps.rows[slotProps.columns.key]).name }}
      </template>
      <template #rows-phone="slotProps">
        {{ slotProps.rows[slotProps.columns.key] }}
      </template>
      <template #rows-picture="slotProps">
        <img :src="slotProps.rows[slotProps.columns.key].large" class="avatar" />
      </template>
      <template #rows-name="slotProps">
        {{ formatName(slotProps.rows[slotProps.columns.key]) }}
      </template>
      <template #rows-dob="slotProps">
        {{ formatDOB(slotProps.rows[slotProps.columns.key].date) }}
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  display: flex;
  position: relative;
  overflow-x: hidden;
  justify-content: center;
  align-items: center;
}
.cursor {
  cursor: pointer;
}
.avatar {
  border-radius: 50%;
  width: 3rem;
}
</style>
