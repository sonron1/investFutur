<template>
  <section id="comment" class="py-20 bg-slate-50 relative overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14" data-reveal>
        <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-blue-700">{{ $t('howItWorks.tag') }}</span>
        </div>
        <h2 class="section-title mb-4">
          {{ $t('howItWorks.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('howItWorks.subtitle') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="relative mb-14">
        <!-- Connection line desktop -->
        <div class="hidden lg:block absolute top-16 left-0 right-0 z-0">
          <div class="max-w-2xl mx-auto">
            <div class="h-px bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"></div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            data-reveal
            :data-reveal-delay="String(index * 200)"
            class="relative text-center group"
          >
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <!-- Icon + number -->
              <div class="relative inline-flex items-center justify-center mb-5">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <i :class="step.icon" class="text-xl text-white"></i>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                  {{ index + 1 }}
                </div>
              </div>

              <h3 class="text-base font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                {{ $t(step.titleKey) }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed mb-4">{{ $t(step.descKey) }}</p>

              <!-- Step stats -->
              <div class="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="text-center">
                    <div class="font-bold text-blue-600 text-sm">{{ step.stat1.value }}</div>
                    <div class="text-slate-500 mt-0.5">{{ step.stat1.label }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-emerald-600 text-sm">{{ step.stat2.value }}</div>
                    <div class="text-slate-500 mt-0.5">{{ step.stat2.label }}</div>
                  </div>
                </div>
              </div>

              <button
                @click="handleStepAction(step.id)"
                :class="step.buttonClass"
                class="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <i :class="step.buttonIcon" class="mr-2"></i>
                {{ $t(step.actionKey) }}
              </button>
            </div>

            <!-- Mobile connector -->
            <div v-if="index < steps.length - 1" class="lg:hidden flex justify-center mt-6">
              <div class="w-px h-8 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Process advantages -->
      <div class="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-12" data-reveal>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="adv in advantages" :key="adv.titleKey"
            class="text-center group hover:bg-slate-50 p-5 rounded-xl border border-transparent hover:border-slate-100 transition-all duration-200">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <i :class="adv.icon" class="text-lg text-white"></i>
            </div>
            <h4 class="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-blue-600 transition-colors">{{ $t(adv.titleKey) }}</h4>
            <p class="text-xs text-slate-500">{{ $t(adv.descKey) }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mb-14" data-reveal data-reveal-delay="200">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <NuxtLink to="/auth/register"
                class="bg-white text-blue-600 px-7 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center text-sm shadow-sm">
                <i class="fas fa-rocket mr-2"></i>
                {{ $t('howItWorks.step1Action') }}
              </NuxtLink>
              <button @click="scrollToSection('domaines')"
                class="border border-white/40 text-white hover:bg-white/10 px-7 py-3 rounded-lg font-semibold transition-colors flex items-center text-sm">
                <i class="fas fa-eye mr-2"></i>
                {{ $t('howItWorks.step2Action') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()

const steps = [
  {
    id: 1,
    icon: 'fas fa-user-plus',
    titleKey: 'howItWorks.step1Title',
    descKey: 'howItWorks.step1Desc',
    stat1: { value: '< 3 min', label: 'Inscription' },
    stat2: { value: '0€', label: 'Frais' },
    actionKey: 'howItWorks.step1Action',
    buttonIcon: 'fas fa-arrow-right',
    buttonClass: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  {
    id: 2,
    icon: 'fas fa-search',
    titleKey: 'howItWorks.step2Title',
    descKey: 'howItWorks.step2Desc',
    stat1: { value: '10', label: 'Secteurs' },
    stat2: { value: '156', label: 'Projets' },
    actionKey: 'howItWorks.step2Action',
    buttonIcon: 'fas fa-compass',
    buttonClass: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line',
    titleKey: 'howItWorks.step3Title',
    descKey: 'howItWorks.step3Desc',
    stat1: { value: '+22.3%', label: 'ROI moyen' },
    stat2: { value: 'Mensuel', label: 'Dividendes' },
    actionKey: 'howItWorks.step3Action',
    buttonIcon: 'fas fa-chart-bar',
    buttonClass: 'bg-emerald-600 text-white hover:bg-emerald-700'
  }
]

const advantages = [
  { icon: 'fas fa-bolt', titleKey: 'howItWorks.adv1', descKey: 'howItWorks.adv1Desc' },
  { icon: 'fas fa-shield-alt', titleKey: 'howItWorks.adv2', descKey: 'howItWorks.adv2Desc' },
  { icon: 'fas fa-brain', titleKey: 'howItWorks.adv3', descKey: 'howItWorks.adv3Desc' },
  { icon: 'fas fa-headset', titleKey: 'howItWorks.adv4', descKey: 'howItWorks.adv4Desc' }
]

const handleStepAction = (stepId) => {
  switch (stepId) {
    case 1:
      navigateTo('/auth/register')
      break
    case 2:
      scrollToSection('domaines')
      break
    case 3:
      navigateTo('/dashboard')
      break
  }
}
</script>
