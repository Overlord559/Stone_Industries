/**
 * Client-side price/fit calculator — mirrors workflows/stone-outreach/lib/offer-router.mjs
 * SSOT: Operator Brain PRICE_CALCULATOR_LOGIC.md · BUDGET_FIT_SCORING.md
 */

import { TIER_PUBLIC_LABELS } from '../data/productLadder'

export type CalculatorAnswers = {
  business_type: string
  monthly_lead_volume: string
  average_customer_value: string
  missed_calls: string
  online_booking: string
  crm: string
  biggest_problem: string
  budget_comfort: string
}

export type CalculatorResult = {
  budget_fit_score: number
  price_sensitivity: string
  recommended_offer: string
  estimated_deal_value: number
  custom_deal_needed: boolean
  tier_rationale: string
}

const BUDGET_POINTS: Record<string, { points: number; sensitivity: string }> = {
  under_500: { points: 5, sensitivity: 'high' },
  '500_1500': { points: 12, sensitivity: 'medium_high' },
  '1500_3000': { points: 20, sensitivity: 'medium' },
  '3000_plus': { points: 25, sensitivity: 'low' },
}

const LEAD_VOLUME_POINTS: Record<string, number> = {
  '0_10': 4,
  '11_30': 8,
  '31_75': 12,
  '76_plus': 15,
}

const ACV_POINTS: Record<string, number> = {
  under_200: 5,
  '200_800': 10,
  '800_2500': 15,
  '2500_plus': 20,
}

const MISSED_CALLS_POINTS: Record<string, number> = { yes: 15, not_sure: 10, no: 0 }
const BOOKING_POINTS: Record<string, number> = { no: 10, yes: 3 }
const CRM_POINTS: Record<string, number> = { no: 10, Other: 6, GoHighLevel: 4, HubSpot: 2 }
const PROBLEM_POINTS: Record<string, number> = {
  website: 10,
  calls: 15,
  follow_up: 12,
  booking: 12,
  reviews: 8,
  automation: 14,
}

function businessTypePoints(businessType: string): number {
  const t = businessType.toLowerCase()
  if (/hvac|plumb|electric|contractor|landscap|roof|trade/.test(t)) return 10
  if (/auto|restaurant|cafe|wellness|spa|gym|med/.test(t)) return 8
  if (/legal|account|insurance|professional/.test(t)) return 6
  return 4
}

export function computeBudgetFitScore(answers: CalculatorAnswers) {
  const raw =
    businessTypePoints(answers.business_type) +
    (LEAD_VOLUME_POINTS[answers.monthly_lead_volume] ?? 4) +
    (ACV_POINTS[answers.average_customer_value] ?? 5) +
    (MISSED_CALLS_POINTS[answers.missed_calls] ?? 0) +
    (BOOKING_POINTS[answers.online_booking] ?? 0) +
    (CRM_POINTS[answers.crm] ?? 6) +
    (PROBLEM_POINTS[answers.biggest_problem] ?? 8) +
    (BUDGET_POINTS[answers.budget_comfort]?.points ?? 5)

  const budget_fit_score = Math.max(0, Math.min(100, Math.round((raw / 120) * 100)))
  const price_sensitivity = BUDGET_POINTS[answers.budget_comfort]?.sensitivity ?? 'high'

  return { budget_fit_score, price_sensitivity, raw_score: raw }
}

export function recommendTier(answers: CalculatorAnswers): CalculatorResult {
  const scored = computeBudgetFitScore(answers)
  const { budget_fit_score, price_sensitivity } = scored
  const budget = answers.budget_comfort
  const problem = answers.biggest_problem

  let recommended_offer = 'free_audit_booking'
  let estimated_deal_value = 0
  let custom_deal_needed = false
  let tier_rationale = ''

  if (budget === 'under_500') {
    recommended_offer = budget_fit_score <= 25 ? 'free_audit_booking' : 'paid_audit_497'
    estimated_deal_value = recommended_offer === 'paid_audit_497' ? 497 : 0
    tier_rationale = 'Budget under $500 — start with free review or paid audit, no sprint pressure.'
  } else if (budget_fit_score <= 40) {
    recommended_offer = 'paid_audit_497'
    estimated_deal_value = 497
    tier_rationale = 'Tight budget or early stage — paid audit before sprint.'
  } else if (budget_fit_score <= 70) {
    recommended_offer = 'custom_phased_deal'
    estimated_deal_value = budget === '500_1500' ? 1200 : 497
    custom_deal_needed = true
    tier_rationale = 'Real pain with partial budget — phased audit plus targeted fixes.'
  } else if (budget_fit_score <= 85) {
    recommended_offer =
      problem === 'calls' || problem === 'automation' ? 'receptionist_sprint' : 'customer_engine_sprint'
    estimated_deal_value = recommended_offer === 'receptionist_sprint' ? 2750 : 2000
    tier_rationale = 'Sprint-ready — website/capture/follow-up or calls automation.'
  } else {
    recommended_offer =
      problem === 'calls' || problem === 'automation' || answers.missed_calls === 'yes'
        ? 'receptionist_sprint'
        : 'managed_ai_ops'
    estimated_deal_value = recommended_offer === 'managed_ai_ops' ? 499 : 3000
    tier_rationale = 'High fit — automation sprint or managed ops candidate.'
  }

  if (problem === 'calls' && budget_fit_score >= 71 && budget !== 'under_500') {
    recommended_offer = 'receptionist_sprint'
    estimated_deal_value = 2750
  }
  if ((problem === 'website' || problem === 'booking') && budget_fit_score >= 71 && budget_fit_score <= 85) {
    recommended_offer = 'customer_engine_sprint'
    estimated_deal_value = 2000
  }

  return {
    budget_fit_score,
    price_sensitivity,
    recommended_offer,
    estimated_deal_value,
    custom_deal_needed,
    tier_rationale,
  }
}

export function getPublicTierDisplay(offerId: string) {
  return (
    TIER_PUBLIC_LABELS[offerId] ?? {
      name: 'Free Remote Revenue Leak Review',
      range: '$0',
      why: 'Start with a free remote review to see if leads are slipping through.',
    }
  )
}
