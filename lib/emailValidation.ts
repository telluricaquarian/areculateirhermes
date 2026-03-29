// ---------------------------------------------------------------------------
// Email validation utilities
// Designed to be extended later with server-side / third-party verification.
// ---------------------------------------------------------------------------

const FORMAT_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

// Common misspellings of popular domains
const TYPO_DOMAINS = new Set([
  'gamil.com', 'gmal.com', 'gnail.com', 'gmali.com', 'gimail.com',
  'gmail.co', 'gmail.cm', 'gmaill.com', 'gmeil.com',
  'yaho.com', 'yahooo.com', 'yhoo.com', 'yaho.co',
  'hotnail.com', 'hotmal.com', 'hotmial.com', 'hotamil.com',
  'outlok.com', 'outllok.com', 'otulook.com',
  'iclod.com', 'iclould.com',
])

// Known disposable / throwaway email providers
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net',
  'tempmail.com', 'temp-mail.org', 'throwam.com', 'throwaway.email',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de',
  'spam4.me', 'trashmail.com', 'trashmail.me', 'trashmail.net',
  'dispostable.com', 'maildrop.cc', 'yopmail.com', 'yopmail.fr',
  'cool.fr.nf', 'jetable.fr.nf', 'nospam.ze.tc', 'nomail.xl.cx',
  'mega.zik.dj', 'speed.1s.fr', 'courriel.fr.nf', 'moncourrier.fr.nf',
  'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org',
  'discard.email', 'spamhereplease.com', 'spamfree24.org',
  'inboxbear.com', 'fakeinbox.com', 'mailnull.com',
  'spamcorptastic.com', 'spamevader.net', 'spamex.com',
  'getairmail.com', 'filzmail.com', 'owlpic.com', 'tempinbox.co.uk',
])

export type EmailValidationStatus =
  | 'valid'
  | 'invalid_format'
  | 'suspicious_domain'
  | 'disposable'

export type EmailValidationResult = {
  status: EmailValidationStatus
  message: string | null
}

export function validateEmailFormat(email: string): boolean {
  return FORMAT_RE.test(email)
}

export function detectSuspiciousEmailDomain(domain: string): 'typo' | 'disposable' | null {
  if (TYPO_DOMAINS.has(domain))       return 'typo'
  if (DISPOSABLE_DOMAINS.has(domain)) return 'disposable'
  return null
}

export function getEmailValidationStatus(raw: string): EmailValidationResult {
  const email = raw.trim().toLowerCase()

  if (!email || !validateEmailFormat(email)) {
    return { status: 'invalid_format', message: 'Please enter a valid email address.' }
  }

  const domain = email.split('@')[1]
  const suspicious = detectSuspiciousEmailDomain(domain)

  if (suspicious === 'typo') {
    return {
      status: 'suspicious_domain',
      message: `Did you mean a different domain? Double-check "${domain}".`,
    }
  }

  if (suspicious === 'disposable') {
    return {
      status: 'disposable',
      message: 'Disposable email addresses are not accepted. Please use a real email.',
    }
  }

  return { status: 'valid', message: null }
}
