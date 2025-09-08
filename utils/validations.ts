/**
 * Valida se um email está no formato correto.
 * @param email O email a ser validado.
 * @returns Verdadeiro se o email for válido, falso caso contrário.
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  // Expressão regular mais robusta para validação de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim().toLowerCase());
};

/**
 * Valida se uma senha atende aos critérios de segurança.
 * Requisitos:
 * - Mínimo de 8 caracteres.
 * - Pelo menos uma letra maiúscula.
 * - Pelo menos uma letra minúscula.
 * - Pelo menos um número.
 * - Pelo menos um caractere especial (opcional, mas recomendado para maior segurança).
 * @param password A senha a ser validada.
 * @returns Verdadeiro se a senha for válida, falso caso contrário.
 */
export const validatePassword = (password: string): boolean => {
  if (!password) return false;

  // Critérios de validação
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
};
