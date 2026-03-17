import { Resend } from 'resend'

// Lazy getter — Resend is instantiated on first use, not at module load time.
// This prevents cold-start crashes on Vercel when RESEND_API_KEY is injected
// after the module is first imported.
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

function getFrom(): string {
  return process.env.EMAIL_FROM ?? 'InvestFutur <noreply@investfutur.fr>'
}

function getAppUrl(): string {
  return process.env.APP_URL ?? 'http://localhost:3000'
}

// ─── Email verification ───────────────────────────────────────────────────────

export async function sendVerificationEmail(to: string, firstName: string, token: string) {
  const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${token}`

  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'Vérifiez votre adresse email — InvestFutur',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: 'DM Sans', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Plateforme d'investissement nouvelle génération</p>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Bonjour ${firstName} 👋</h2>
            <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
              Merci de vous être inscrit sur InvestFutur. Pour activer votre compte et commencer à investir,
              veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Vérifier mon email
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.5;">
              Ce lien expire dans 24 heures. Si vous n'avez pas créé de compte, ignorez cet email.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">
              InvestFutur — Plateforme d'investissement réglementée AMF<br>
              Cet email a été envoyé à ${to}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ─── Password reset ───────────────────────────────────────────────────────────

export async function sendPasswordResetEmail(to: string, firstName: string, token: string) {
  const resetUrl = `${getAppUrl()}/auth/reset-password?token=${token}`

  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'Réinitialisation de votre mot de passe — InvestFutur',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: 'DM Sans', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Réinitialisation du mot de passe</h2>
            <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
              Bonjour ${firstName},<br><br>
              Nous avons reçu une demande de réinitialisation de votre mot de passe.
              Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.5;">
              Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email — votre compte est en sécurité.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">InvestFutur — Cet email a été envoyé à ${to}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ─── Welcome email (after KYC approved) ──────────────────────────────────────

export async function sendWelcomeEmail(to: string, firstName: string) {
  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'Bienvenue sur InvestFutur — Votre compte est activé !',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"></head>
      <body style="font-family: 'DM Sans', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Félicitations ${firstName} ! 🎉</h2>
            <p style="color: #475569; line-height: 1.6;">
              Votre compte InvestFutur est maintenant vérifié et actif.
              Vous pouvez dès maintenant explorer nos opportunités d'investissement et commencer à faire fructifier votre capital.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${getAppUrl()}/dashboard" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Accéder à mon tableau de bord
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

// ─── KYC notifications ────────────────────────────────────────────────────────

export async function sendKycReceivedEmail(to: string, firstName: string, docTypes: string[]) {
  const docLabels: Record<string, string> = {
    identity_front: 'Recto pièce d\'identité',
    identity_back: 'Verso pièce d\'identité',
    proof_of_address: 'Justificatif de domicile',
    selfie: 'Selfie',
  }
  const docList = docTypes.map((t) => `<li>${docLabels[t] ?? t} ✓</li>`).join('')

  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'InvestFutur — Dossier KYC reçu',
    html: `
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Dossier KYC reçu ✅</h2>
            <p style="color: #475569; line-height: 1.6;">Bonjour ${firstName},</p>
            <p style="color: #475569; line-height: 1.6;">Votre dossier de vérification d'identité a bien été reçu. Notre équipe va l'examiner dans les <strong>24 à 48 heures ouvrables</strong>.</p>
            <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="color: #0f172a; font-size: 14px; font-weight: 600; margin: 0 0 8px;">Documents soumis :</p>
              <ul style="color: #475569; font-size: 14px; margin: 0; padding-left: 20px;">${docList}</ul>
            </div>
            <p style="color: #475569; font-size: 14px;">Vous recevrez un email dès que votre dossier aura été traité.</p>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${getAppUrl()}/dashboard" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Mon tableau de bord</a>
            </div>
          </div>
        </div>
      </body></html>
    `,
  })
}

export async function sendKycApprovedEmail(to: string, firstName: string) {
  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'InvestFutur — Vérification KYC approuvée 🎉',
    html: `
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">KYC approuvé ! 🎉</h2>
            <p style="color: #475569; line-height: 1.6;">Bonjour ${firstName},</p>
            <p style="color: #475569; line-height: 1.6;">Votre identité a été vérifiée avec succès. Vous avez maintenant accès à toutes les fonctionnalités d'investissement d'InvestFutur.</p>
            <div style="background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
              <p style="color: #065f46; font-weight: 600; margin: 0;">Niveau KYC : Tier 1 — Accès complet</p>
            </div>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${getAppUrl()}/dashboard" style="background: linear-gradient(135deg, #059669, #10b981); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Commencer à investir</a>
            </div>
          </div>
        </div>
      </body></html>
    `,
  })
}

export async function sendKycRejectedEmail(to: string, firstName: string, reason?: string) {
  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: 'InvestFutur — Action requise pour votre dossier KYC',
    html: `
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Dossier KYC — Action requise</h2>
            <p style="color: #475569; line-height: 1.6;">Bonjour ${firstName},</p>
            <p style="color: #475569; line-height: 1.6;">Votre dossier KYC n'a pas pu être validé. Vous pouvez le soumettre à nouveau avec des documents mis à jour.</p>
            ${reason ? `<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; padding: 16px; margin: 24px 0;"><p style="color: #991b1b; font-size: 14px; margin: 0;"><strong>Motif :</strong> ${reason}</p></div>` : ''}
            <div style="text-align: center; margin-top: 32px;">
              <a href="${getAppUrl()}/kyc" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Soumettre à nouveau</a>
            </div>
          </div>
        </div>
      </body></html>
    `,
  })
}

// ─── Investment confirmation ───────────────────────────────────────────────────

export async function sendInvestmentConfirmationEmail(
  to: string,
  firstName: string,
  investment: {
    projectName: string
    amount: number
    currency: string
    expectedRoi: number
    maturityDate: Date
  }
) {
  return getResend().emails.send({
    from: getFrom(),
    to,
    subject: `Confirmation d'investissement — ${investment.projectName}`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"></head>
      <body style="font-family: 'DM Sans', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">InvestFutur</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e293b; font-size: 22px; margin: 0 0 16px;">Investissement confirmé ✅</h2>
            <p style="color: #475569; margin: 0 0 24px;">Bonjour ${firstName}, votre investissement a été enregistré avec succès.</p>
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color: #64748b; padding: 8px 0; font-size: 14px;">Projet</td><td style="color: #1e293b; font-weight: 600; text-align: right;">${investment.projectName}</td></tr>
                <tr><td style="color: #64748b; padding: 8px 0; font-size: 14px;">Montant</td><td style="color: #1e293b; font-weight: 600; text-align: right;">${investment.amount.toLocaleString('fr-FR')} ${investment.currency}</td></tr>
                <tr><td style="color: #64748b; padding: 8px 0; font-size: 14px;">ROI estimé</td><td style="color: #16a34a; font-weight: 600; text-align: right;">+${investment.expectedRoi}%</td></tr>
                <tr><td style="color: #64748b; padding: 8px 0; font-size: 14px;">Échéance</td><td style="color: #1e293b; font-weight: 600; text-align: right;">${new Date(investment.maturityDate).toLocaleDateString('fr-FR')}</td></tr>
              </table>
            </div>
            <div style="text-align: center;">
              <a href="${getAppUrl()}/investments" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Voir mon portefeuille
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
