# Feature Spec: Dashboard Administrateur

**Branch**: feature/06-admin-dashboard
**Created**: 2026-03-16
**Status**: ✅ API Phase 1 | 🔄 Interface Phase 2

## Overview

Interface d'administration complète pour gérer les utilisateurs, valider les KYC, suivre les investissements et les paiements, et monitorer la santé globale de la plateforme.

## User Scenarios

### Scénario 1 — Vue d'ensemble (Stats)
1. L'admin se connecte et accède à /admin
2. Il voit les KPIs : total users, KYC en attente, investissements actifs, volume total
3. Une liste des inscriptions récentes est affichée

### Scénario 2 — Gestion des utilisateurs
1. L'admin peut rechercher un utilisateur par email/nom
2. Il peut filtrer par statut KYC (PENDING, SUBMITTED, APPROVED, REJECTED)
3. Il peut voir le détail d'un compte (investissements, transactions, documents)
4. Il peut approuver/rejeter un dossier KYC avec une note

### Scénario 3 — Monitoring des investissements
1. Vue globale de tous les investissements (tous utilisateurs)
2. Filtres par statut, secteur, montant
3. Actions : valider un paiement, activer un investissement, initier un remboursement

### Scénario 4 — Sécurité
1. L'admin peut révoquer toutes les sessions d'un utilisateur
2. Il peut suspendre/réactiver un compte
3. Il peut voir les logs de connexion suspects

## Functional Requirements

- FR-01: Toutes les routes /api/admin/** DOIVENT requérir le rôle ADMIN côté serveur
- FR-02: Les actions admin DOIVENT être loggées avec timestamp et identité de l'admin
- FR-03: L'admin NE DOIT PAS avoir accès aux mots de passe (hashés en base, non affichés)
- FR-04: Les documents KYC DOIVENT être accessibles uniquement depuis une URL signée temporaire
- FR-05: Toute modification critique (suspension, remboursement) DOIT requérir une confirmation

## Success Criteria

- Un admin sans token valide ne peut pas accéder aux routes /api/admin/**
- La recherche utilisateur retourne des résultats en moins de 500ms
- Un KYC approuvé débloque immédiatement les plafonds de l'utilisateur

## Technical Implementation

- **Server routes**: `server/api/admin/` (users.get, stats.get, users/[id]/kyc.patch)
- **Guard**: `requireAdmin()` sur toutes les routes admin
- **Interface**: `/admin/index.vue` (Phase 2 — refactoring depuis localStorage vers API)
