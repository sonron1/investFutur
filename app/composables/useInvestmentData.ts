import investmentData, { paymentMethods } from '~/stores/investment-data'

type Sector = {
    id: number
    name: string
    description: string
    image: string
    roi: string
    projetsCount: number
    minInvestment: number
    paymentMethods: string[]
    highlights: string[]
    projects: Array<{
        name: string
        description: string
        raised: string
        target: string
        investors: number
        minInvest: number
    }>
}

type SectorsMap = Record<string, Sector>

export function useInvestmentData() {
    const sectorsMap = investmentData as unknown as SectorsMap

    const getSectors = () => {
        return Object.entries(sectorsMap).map(([slug, data]) => ({ slug, ...data }))
    }

    const getSectorBySlug = (slug: string) => {
        return sectorsMap[slug] || null
    }

    const getSectorById = (id: number) => {
        return Object.values(sectorsMap).find((s) => s.id === id) || null
    }

    const getPaymentMethods = () => paymentMethods

    return { getSectors, getSectorBySlug, getSectorById, getPaymentMethods }
}