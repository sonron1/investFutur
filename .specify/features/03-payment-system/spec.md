# Feature Spec: Système de Paiement

**Branch**: feature/03-payment-system
**Created**: 2026-03-16
**Status**: 🔄 Phase 2 — À implémenter

## Overview

Intégration de vrais processeurs de paiement : Stripe pour les cartes bancaires et virements SEPA, et un provider crypto (NOWPayments ou CoinGate) pour les paiements Bitcoin/Ethereum/USDT/BNB. Les paiements doivent être confirmés via webhooks avant d'activer les investissements.

## User Scenarios

### Scénario 1 — Paiement par carte bancaire (Stripe)
1. L'utilisateur choisit "Carte bancaire" comme méthode de paiement
2. Un Payment Intent Stripe est créé côté serveur
3. L'interface Stripe (Stripe Elements) est affichée dans la page
4. L'utilisateur saisit ses informations de carte
5. Stripe confirme le paiement et appelle le webhook
6. L'investissement passe de PENDING à ACTIVE

### Scénario 2 — Paiement crypto
1. L'utilisateur choisit Bitcoin/ETH/USDT/BNB
2. Le système génère une adresse de dépôt via le provider crypto
3. Le montant en crypto est calculé au taux de change actuel
4. L'utilisateur envoie la crypto sur l'adresse indiquée
5. Le réseau confirme la transaction (N confirmations)
6. Le webhook confirme le paiement, l'investissement s'active

### Scénario 3 — Gestion des paiements échoués
1. Le paiement échoue (fonds insuffisants, réseau congestionné)
2. La transaction est marquée FAILED
3. L'investissement reste PENDING (retry possible)
4. L'utilisateur est notifié par email

### Scénario 4 — Remboursement
1. L'admin initie un remboursement depuis le dashboard
2. Stripe/provider crypto traite le remboursement
3. La transaction est marquée REFUNDED
4. L'investissement est annulé
5. L'utilisateur reçoit un email de confirmation de remboursement

## Functional Requirements

- FR-01: Aucun investissement ne peut passer ACTIVE sans confirmation de paiement réel
- FR-02: Les webhooks DOIVENT être vérifiés avec signature (Stripe-Signature header)
- FR-03: Les montants DOIVENT être calculés côté serveur uniquement
- FR-04: Un timeout de 30 minutes DOIT invalider un paiement crypto non reçu
- FR-05: Toutes les données de carte DOIVENT transiter uniquement via Stripe (jamais sur nos serveurs)
- FR-06: Les frais de transaction DOIVENT être affichés à l'utilisateur avant confirmation

## Success Criteria

- Un paiement Stripe confirmé active l'investissement en moins de 10 secondes
- Une tentative de manipulation du montant côté client est ignorée
- Les webhooks non signés sont rejetés avec 401
- L'utilisateur reçoit un reçu email dans les 60 secondes après confirmation

## Dependencies

- Stripe (compte + clés API)
- NOWPayments ou CoinGate (compte crypto payments)
- Webhook endpoints sécurisés

## Phase

Phase 2 — Après déploiement de l'auth backend et validation des premiers utilisateurs réels.
