<template>
  <div v-if="registrations.length === 0" class="p-8 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <i class="fas fa-inbox text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500">Aucune inscription {{ status === 'approved' ? 'approuvée' : 'refusée' }}</p>
  </div>

  <div v-else class="divide-y divide-gray-200">
    <div
        v-for="registration in registrations"
        :key="registration.id"
        class="p-6"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ registration.name }}</h3>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              registration.personType === 'physique'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            ]">
              {{ registration.personType === 'physique' ? 'Particulier' : 'Entreprise' }}
            </span>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              status === 'approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]">
              {{ status === 'approved' ? 'Approuvée' : 'Refusée' }}
            </span>
          </div>

          <div class="grid md:grid-cols-2 gap-4 mb-2">
            <div>
              <p class="text-sm text-gray-600">
                <i class="fas fa-envelope mr-2"></i>
                {{ registration.email }}
              </p>
              <p class="text-sm text-gray-600">
                <i class="fas fa-clock mr-2"></i>
                {{ status === 'approved' ? 'Approuvée' : 'Refusée' }} le {{ formatDate(registration.adminValidation?.reviewedAt) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600">
                <i class="fas fa-user mr-2"></i>
                Par {{ registration.adminValidation?.reviewedBy }}
              </p>
              <p v-if="registration.adminValidation?.notes" class="text-sm text-gray-600">
                <i class="fas fa-note-sticky mr-2"></i>
                {{ registration.adminValidation.notes }}
              </p>
            </div>
          </div>
        </div>

        <div class="ml-4">
          <span :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            status === 'approved'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          ]">
            <i :class="[
              'mr-2 text-xs',
              status === 'approved' ? 'fas fa-check' : 'fas fa-times'
            ]"></i>
            {{ status === 'approved' ? 'Approuvée' : 'Refusée' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  registrations: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>