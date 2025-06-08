export const formatName = (fullName: string | undefined): string => {
    if (fullName === undefined) {
        return '';
    }
    return fullName.split(" ").slice(0, 3).join(" ");
};

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString('pt-BR')
}
