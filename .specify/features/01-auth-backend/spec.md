# Feature Spec: Système d'Authentification Backend Sécurisé

**Branch**: feature/01-auth-backend
**Created**: 2026-03-16
**Status**: ✅ Implemented (Phase 1)

## Overview

Remplacer le système d'authentification basé sur localStorage par une authentification sécurisée côté serveur avec JWT, sessions persistées en base de données, et vérification d'email obligatoire.

## User Scenarios

### Scénario 1 — Inscription d'un nouvel utilisateur
1. L'utilisateur remplit le formulaire d'inscription (email, mot de passe, prénom, nom)
2. Le système valide la robustesse du mot de passe et l'unicité de l'email
3. Un compte est créé en base de données avec le mot de passe hashé
4. Un email de vérification est envoyé automatiquement
5. L'utilisateur reçoit un message lui demandant de vérifier son email

### Scénario 2 — Vérification d'email
1. L'utilisateur clique sur le lien reçu par email
2. Le token est validé (non expiré, non utilisé)
3. Le compte est marqué comme vérifié
4. Un email de bienvenue est envoyé
5. L'utilisateur est redirigé vers la page de connexion

### Scénario 3 — Connexion
1. L'utilisateur saisit email et mot de passe
2. Le système vérifie les credentials côté serveur
3. Un access token (15min) et un refresh token (7j) sont générés
4. Le refresh token est stocké en httpOnly cookie
5. L'access token est retourné au client (stocké en sessionStorage)

### Scénario 4 — Refresh automatique du token
1. L'access token expire après 15 minutes
2. Le client appelle /api/auth/refresh avec le cookie
3. Un nouveau access token est généré, le refresh token est rotaté
4. La session utilisateur continue sans interruption

### Scénario 5 — Réinitialisation de mot de passe
1. L'utilisateur demande un reset via son email
2. Un token sécurisé (1h d'expiry) est envoyé par email
3. L'utilisateur définit un nouveau mot de passe
4. Toutes les sessions actives sont révoquées

## Functional Requirements

### Sécurité
- FR-01: Les mots de passe DOIVENT être hashés avec bcrypt (cost factor 12)
- FR-02: Les tokens JWT DOIVENT expirer (access: 15min, refresh: 7j)
- FR-03: Les refresh tokens DOIVENT être stockés en httpOnly cookie uniquement
- FR-04: Les refresh tokens DOIVENT être rotés à chaque utilisation
- FR-05: La validation des credentials DOIT retourner le même message d'erreur (anti-énumération)
- FR-06: Les mots de passe DOIVENT satisfaire : min 8 chars, 1 majuscule, 1 chiffre, 1 caractère spécial

### Persistance
- FR-07: Chaque session DOIT être enregistrée en base (user_agent, IP, expiry)
- FR-08: La déconnexion DOIT supprimer la session de la base
- FR-09: Le reset de mot de passe DOIT révoquer toutes les sessions actives

### Email
- FR-10: La vérification d'email est OBLIGATOIRE avant la première connexion
- FR-11: Les tokens de vérification DOIVENT expirer après 24h
- FR-12: Les tokens de reset DOIVENT expirer après 1h

### RGPD
- FR-13: Le consentement utilisateur DOIT être enregistré en base avec timestamp et IP

## Success Criteria

- Un utilisateur non vérifié ne peut pas se connecter
- Un token JWT invalide est rejeté sur toutes les routes protégées
- Un attaquant avec accès au localStorage ne peut pas usurper une session (pas de données sensibles côté client)
- Le refresh token fonctionne même si l'access token est expiré
- Les mots de passe hashés ne peuvent pas être retrouvés en clair

## Technical Implementation

- **Server routes**: `server/api/auth/` (register, login, logout, me, refresh, verify-email, forgot-password, reset-password)
- **Middleware**: `server/middleware/auth.ts` (injecte `event.context.user`)
- **Guards**: `server/utils/guards.ts` (requireAuth, requireAdmin, requireVerified)
- **Store**: `app/stores/auth.ts` (TypeScript, appels API réels)
- **Dependencies**: bcryptjs, jsonwebtoken, zod

## Assumptions

- L'application utilise Nuxt 4 server routes (pas d'API séparée)
- Neon PostgreSQL + Prisma pour la persistance
- Resend pour l'envoi d'emails
- Déploiement sur Vercel (cookies sécurisés en production)
