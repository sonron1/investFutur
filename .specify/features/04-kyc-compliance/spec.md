# Feature Spec: KYC / Conformité Réglementaire

**Branch**: feature/04-kyc-compliance
**Created**: 2026-03-16
**Status**: 🔄 Phase 2 — À implémenter

## Overview

Système de vérification d'identité (Know Your Customer) conforme à la réglementation AMF française. Les utilisateurs doivent soumettre des documents d'identité avant de pouvoir investir au-delà de certains seuils. L'admin valide les dossiers via le dashboard.

## User Scenarios

### Scénario 1 — Soumission KYC Basique (Tier 1)
1. L'utilisateur veut investir plus de 1 000€/mois
2. Le système l'invite à compléter son KYC
3. Il soumet : pièce d'identité (recto/verso) + selfie avec pièce
4. Les documents sont uploadés de façon sécurisée (Vercel Blob / R2)
5. Le statut passe à SUBMITTED

### Scénario 2 — Validation par l'admin
1. L'admin reçoit une notification de nouveau dossier KYC
2. Il consulte les documents depuis le dashboard sécurisé
3. Il approuve ou rejette avec une note
4. L'utilisateur est notifié par email du résultat

### Scénario 3 — KYC Vérifié (Tier 2)
1. L'utilisateur approuvé peut investir jusqu'à 50 000€/mois
2. Pour le Tier 2 : justificatif de domicile + source des fonds

### Scénario 4 — Rejet KYC
1. L'admin rejette avec une raison précise
2. L'utilisateur peut soumettre à nouveau après correction
3. 3 rejets = compte signalé pour revue manuelle

## Functional Requirements

- FR-01: Les limites d'investissement DOIVENT être enforced selon le KYC tier
  - Tier 0 (non vérifié): max 1 000€/mois
  - Tier 1 (KYC Basic): max 50 000€/mois
  - Tier 2 (KYC Premium): illimité
- FR-02: Les documents DOIVENT être stockés de façon chiffrée (accès admin uniquement)
- FR-03: Les documents NE DOIVENT PAS être stockés dans la base de données (URLs uniquement)
- FR-04: Le consentement RGPD pour le traitement des données biométriques DOIT être recueilli
- FR-05: Les documents DOIVENT être supprimés sur demande de l'utilisateur (droit à l'effacement)
- FR-06: Un audit trail DOIT enregistrer chaque action admin sur un dossier KYC

## Success Criteria

- Un utilisateur Tier 0 ne peut pas investir plus de 1 000€ en un mois
- Les documents sont inaccessibles sans authentification admin
- Un dossier approuvé débloque immédiatement les nouveaux plafonds
- La suppression RGPD efface les documents du stockage et les URLs en base

## Dependencies

- Vercel Blob Storage ou Cloudflare R2 pour les documents
- Système de notifications admin (email + in-app)

## Phase

Phase 2 — En parallèle avec le système de paiement.
