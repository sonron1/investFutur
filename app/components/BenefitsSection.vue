<template>
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="section-tag justify-center">
          <i class="fas fa-trophy"></i>
          {{ $t('benefits.tag') }}
        </div>
        <h2 class="section-title mb-4">
          {{ $t('benefits.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('benefits.subtitle') }}
        </p>
      </div>

      <!-- Benefits grid -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Left: benefit list -->
        <div class="space-y-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.id"
            data-reveal="left"
            :data-reveal-delay="String(index * 150)"
            class="flex items-start gap-4"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <i :class="benefit.icon" class="text-lg text-white"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900 mb-1.5">{{ $t(benefit.titleKey) }}</h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ $t(benefit.descKey) }}</p>
              <div v-if="benefit.stats" class="mt-1.5 text-xs text-blue-600 font-semibold">
                {{ benefit.stats }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: comparison chart -->
        <div data-reveal="right">
          <div class="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">{{ $t('benefits.compareTitle') }}</div>
            <h4 class="text-lg font-bold text-slate-900 mb-6">{{ $t('benefits.compareDesc') }}</h4>

            <div class="space-y-4">
              <div v-for="comparison in performanceComparison" :key="comparison.label" class="space-y-1.5">
                <div class="flex justify-between">
                  <span class="text-slate-700 text-sm font-medium">{{ comparison.label }}</span>
                  <span class="font-bold text-sm" :class="comparison.colorClass">{{ comparison.value }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2">
                  <div
                    :class="comparison.bgClass"
                    class="h-2 rounded-full transition-all duration-1000"
                    :style="{ width: comparison.width + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div class="flex items-center">
                <i class="fas fa-trophy text-emerald-600 text-lg mr-3"></i>
                <div>
                  <div class="font-bold text-emerald-800 text-sm">+8.5% de performance</div>
                  <div class="text-xs text-emerald-600">vs marchés traditionnels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Guarantees -->
      <div class="grid md:grid-cols-3 gap-5" data-reveal>
        <div v-for="guarantee in guarantees" :key="guarantee.titleKey"
          class="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
          <div class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i :class="guarantee.icon" class="text-xl text-white"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2.5">{{ $t(guarantee.titleKey) }}</h3>
          <p class="text-slate-500 text-sm mb-3 leading-relaxed">{{ $t(guarantee.descKey) }}</p>
          <div class="text-xs text-emerald-600 font-semibold">{{ guarantee.detail }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    id: 1,
    icon: 'fas fa-chart-line',
    titleKey: 'benefits.b1Title',
    descKey: 'benefits.b1Desc',
    stats: 'ROI moyen: 22.3% vs 14% marché traditionnel'
  },
  {
    id: 2,
    icon: 'fas fa-shield-alt',
    titleKey: 'benefits.b2Title',
    descKey: 'benefits.b2Desc',
    stats: null
  },
  {
    id: 3,
    icon: 'fas fa-users',
    titleKey: 'benefits.b3Title',
    descKey: 'benefits.b3Desc',
    stats: null
  },
  {
    id: 4,
    icon: 'fas fa-mobile-alt',
    titleKey: 'benefits.b4Title',
    descKey: 'benefits.b4Desc',
    stats: null
  }
]

const performanceComparison = [
  {
    label: 'InvestFutur',
    value: 22.3,
    width: 100,
    colorClass: 'text-blue-600',
    bgClass: 'bg-gradient-to-r from-blue-600 to-indigo-600'
  },
  {
    label: 'CAC 40',
    value: 8.7,
    width: 39,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-400'
  },
  {
    label: 'Livret A',
    value: 3.0,
    width: 13,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-300'
  },
  {
    label: 'Immobilier',
    value: 6.2,
    width: 28,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-400'
  }
]

const guarantees = [
  {
    icon: 'fas fa-certificate',
    titleKey: 'benefits.g1Title',
    descKey: 'benefits.g1Desc',
    detail: 'Agrément CIP n° 18000001'
  },
  {
    icon: 'fas fa-lock',
    titleKey: 'benefits.g2Title',
    descKey: 'benefits.g2Desc',
    detail: 'Comptes ségrégués chez BNP Paribas'
  },
  {
    icon: 'fas fa-handshake',
    titleKey: 'benefits.g3Title',
    descKey: 'benefits.g3Desc',
    detail: 'Rapports certifiés par PwC'
  }
]
</script>
