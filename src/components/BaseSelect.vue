<script lang="ts" generic="T extends number | string" setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { BUTTON_TYPE_NEUTRAL } from '@/constants'
import { normalizeSelectValue } from '@/functions'
import { ICON_X_MARK } from '@/icons'
import { isUndefinedOrNull } from '@/validators'
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import type { SelectOption } from '@/types'

const props = defineProps<{
  options: SelectOption<T>[]
  selected: T | null
  placeholder: string
}>()

const emit = defineEmits<{
  // Первый вариант
  // (e: 'select', value: number | string | null): void

  // Более лаконичный вариант  
  select: [value: T | null]
}>()

const isNotSelected = computed((): boolean => {
  return isUndefinedOrNull(props.selected)
})

function select(value: string | null): void {
  emit('select', normalizeSelectValue(value))
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
