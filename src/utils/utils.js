function formatMinutesToHours(minutes) {
    const horas = Math.floor(minutes / 60);
    const minutos = Math.round(minutes % 60);
    return `${horas}h ${minutos}min`;
}

module.exports = formatMinutesToHours;