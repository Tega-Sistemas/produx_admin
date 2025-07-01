export const roundToDecimalPlaces = (value, decimalPlaces = 2) => {
    const factor = Math.pow(10, decimalPlaces);
    const rounded = Math.round(value * factor) / factor;
    return parseFloat(rounded.toFixed(decimalPlaces))
};

export const convertCentennialMinutesToHours = (centennialMinutes) => {
    const totalMinutes = Math.floor(centennialMinutes);
    const fractionalMinutes = centennialMinutes - totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60 + Math.round(fractionalMinutes * 60);
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    return `${hours}h ${minutes}min`;
};

export const formatMinutesToHours = (minutes) => {
    const horas = Math.floor(minutes / 60);
    const minutos = Math.round(minutes % 60);
    return `${horas}h ${minutos}min`;
};

export const calculateMinutesDifference = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffInMs = now - start;
    return Math.floor(diffInMs / (1000 * 60));
};

export const formatDateToBrazilianFormat = (date) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');

    if (parsedDate.getHours() || parsedDate.getMinutes()) {
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return `${day}/${month}/${year}`;
};

export const formatDecimalPlaces = (number, places) => {
    const factor = Math.pow(10, places);
    const rounded = Math.round(number * factor) / factor;
    return rounded.toLocaleString('pt-BR', {
        minimumFractionDigits: places,
        maximumFractionDigits: places,
    });
};

export const returnTpCEPP = (tpCEPP) => {
    switch (tpCEPP) {
        case 'P':
            return 'Produção';
        case 'R':
            return 'Reparo';
        case 'A':
            return 'Parada';
        default:
            return '-';
    }
}

