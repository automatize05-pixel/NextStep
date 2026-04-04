import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

// A chave será lida do ficheiro .env. Usamos SHA-256 para garantir que a chave final tenha sempre 32 bytes (256 bits), independentemente do tamanho da string fornecida pelo utilizador.
const getSecretKey = () => process.env.ENCRYPTION_KEY || 'nextstep-temporary-dev-key-secure-prod-must-change';
const keyBuffer = crypto.createHash('sha256').update(getSecretKey()).digest();

/**
 * Encripta uma string (ex: número de telemóvel, dados de cartão, moradas).
 * Retorna o dado encriptado no formato: iv:authTag:encryptedData
 */
export function encryptData(text: string): string {
  if (!text) return text;
  
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (e) {
    console.error('[Security] Encryption failed:', e);
    // Em caso de falha silenciosa, retornamos fallback. A aplicação deve gerir isto.
    return text;
  }
}

/**
 * Desencripta dados armazenados no formato iv:authTag:encryptedData.
 * Se o dado não estiver no formato encriptado, devolve em plain-text (Retrocompatibilidade).
 */
export function decryptData(encryptedData: string): string | null {
  if (!encryptedData || !encryptedData.includes(':')) {
    // Considerado dado não-encriptado (ex: dados antigos na BD antes da Fase 1)
    return encryptedData; 
  }
  
  try {
    const components = encryptedData.split(':');
    if (components.length !== 3) return encryptedData;

    const iv = Buffer.from(components[0], 'hex');
    const authTag = Buffer.from(components[1], 'hex');
    const encryptedText = components[2];
    
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('[Security] Decryption error. Data might be corrupted or key changed:', error);
    return null;
  }
}
