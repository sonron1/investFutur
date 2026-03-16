# Feature Spec: Système d'Emails Transactionnels

**Branch**: feature/05-email-notifications
**Created**: 2026-03-16
**Status**: ✅ Phase 1 implémenté (emails de base) | 🔄 Phase 2 (templates avancés)

## Overview

Système d'emails transactionnels via Resend pour toutes les actions critiques de la plateforme. Les emails doivent être fiables, bien formatés, et tracer leur statut de livraison.

## Emails Implémentés (Phase 1)

| Trigger | Email | Statut |
|---------|-------|--------|
| Inscription | Vérification d'email | ✅ |
| Email vérifié | Bienvenue | ✅ |
| Mot de passe oublié | Lien de reset | ✅ |
| Investissement créé | Confirmation + récapitulatif | ✅ |

## Emails Phase 2

| Trigger | Email |
|---------|-------|
| KYC soumis | Accusé de réception |
| KYC approuvé | Félicitations + nouveaux plafonds |
| KYC rejeté | Raison + instructions |
| Investissement activé | Confirmation de paiement reçu |
| Investissement arrivé à maturité | Récapitulatif des gains |
| Rapport mensuel | Résumé du portefeuille |
| Tentative de connexion suspecte | Alerte sécurité |

## Functional Requirements

- FR-01: Tous les emails DOIVENT avoir un design responsive HTML + fallback texte brut
- FR-02: Les liens dans les emails (vérification, reset) DOIVENT expirer
- FR-03: Les emails DOIVENT être envoyés de façon non-bloquante (ne pas bloquer les requêtes API)
- FR-04: Les erreurs d'envoi DOIVENT être loggées (ne pas faire échouer l'action principale)
- FR-05: L'adresse expéditrice DOIT utiliser le domaine de la plateforme (pas @gmail etc.)
- FR-06: Les emails DOIVENT inclure un lien de désabonnement pour les emails marketing

## Success Criteria

- Un email de vérification est reçu dans les 60 secondes après inscription
- Un email de confirmation d'investissement inclut tous les détails du projet
- Une erreur Resend ne bloque pas l'inscription ou l'investissement

## Technical Implementation

- **Provider**: Resend (resend.com)
- **Utils**: `server/utils/email.ts`
- **Templates**: HTML inline styles (compatibilité maximale avec tous les clients email)
