# Feature Spec: Gestion des Investissements

**Branch**: feature/02-investment-management
**Created**: 2026-03-16
**Status**: ✅ Implemented (Phase 1)

## Overview

Système complet de gestion d'investissements persistés en base de données. Les utilisateurs peuvent créer, consulter et annuler des investissements. Chaque investissement génère une transaction et un email de confirmation.

## User Scenarios

### Scénario 1 — Créer un investissement
1. L'utilisateur sélectionne un projet dans la liste des secteurs
2. Il choisit un montant et une méthode de paiement crypto
3. Le système valide que l'utilisateur est vérifié (email) et que le montant est valide (min 10€)
4. L'investissement est créé en base avec le statut PENDING
5. Une transaction est enregistrée simultanément
6. Un email de confirmation est envoyé

### Scénario 2 — Consulter son portefeuille
1. L'utilisateur accède à /investments
2. Il voit la liste de ses investissements avec filtres (statut, montant)
3. Chaque carte affiche : projet, montant, ROI attendu, statut, échéance
4. Les statistiques agrégées sont affichées en haut (total investi, gains estimés)

### Scénario 3 — Dashboard de synthèse
1. Le dashboard affiche les KPIs en temps réel depuis la base
2. Total investi, nombre d'investissements actifs, ROI moyen, gains estimés

### Scénario 4 — Annuler un investissement
1. L'utilisateur peut annuler uniquement les investissements PENDING
2. Les investissements ACTIVE ou COMPLETED ne peuvent pas être annulés
3. Le statut passe à CANCELLED

## Functional Requirements

- FR-01: Seuls les utilisateurs avec email vérifié peuvent investir
- FR-02: Le montant minimum d'investissement est de 10€
- FR-03: Chaque investissement DOIT créer une transaction associée (atomique)
- FR-04: Un email de confirmation DOIT être envoyé après chaque investissement
- FR-05: Les investissements ACTIVE/COMPLETED ne peuvent pas être annulés
- FR-06: La liste des investissements DOIT supporter la pagination (max 50 par page)
- FR-07: Les statistiques du dashboard DOIVENT être calculées en temps réel depuis la base

## Success Criteria

- Un investissement créé apparaît immédiatement dans le portefeuille
- L'email de confirmation est reçu dans les 30 secondes
- Les statistiques du dashboard reflètent fidèlement les données en base
- Une tentative d'annuler un investissement actif est rejetée avec un message clair

## Technical Implementation

- **Server routes**: `server/api/investments/` (GET list, POST create, DELETE cancel)
- **Server routes**: `server/api/dashboard/stats.get.ts`
- **Store**: `app/stores/user-investments.ts` (TypeScript, appels API réels)
- **Database**: Investment + Transaction models (Prisma transaction pour atomicité)
