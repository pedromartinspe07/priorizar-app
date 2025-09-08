/**
 * Formata um número de minutos para o formato "Hh Mm".
 * Exemplo: 150 minutos -> "2h 30min"
 * @param minutes O número de minutos a ser formatado.
 * @returns A string formatada.
 */
export const formatMinutesToHours = (minutes: number): string => {
  if (minutes < 0) {
    return '0m';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedString = '';
  if (hours > 0) {
    formattedString += `${hours}h`;
    if (remainingMinutes > 0) {
      formattedString += ` ${remainingMinutes}min`;
    }
  } else {
    formattedString += `${remainingMinutes}min`;
  }
  return formattedString;
};

/**
 * Capitaliza a primeira letra de cada palavra em uma string.
 * Exemplo: "tempo de tela" -> "Tempo De Tela"
 * @param str A string a ser capitalizada.
 * @returns A string capitalizada.
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Retorna uma saudação dinâmica baseada na hora do dia.
 * @returns Uma saudação (Ex: "Bom dia", "Boa tarde", "Boa noite").
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Bom dia';
  } else if (hour >= 12 && hour < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
};
