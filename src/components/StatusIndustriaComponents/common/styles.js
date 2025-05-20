import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const StyledCard = styled('Card')(({ theme, statuscolor }) => ({
    backgroundColor: statuscolor,
    width: '100%',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    marginBottom: theme.spacing(0.5),
    '& .MuiCardHeader-root': {
        backgroundColor: statuscolor,
        color: theme.palette.getContrastText(statuscolor),
        padding: theme.spacing(1.5),
    },
    '& .MuiCardContent-root': {
        flexGrow: 1,
        padding: theme.spacing(2),
        color: theme.palette.getContrastText(statuscolor),
    },
    cursor: 'pointer',
}));

export const WorkedMinutesCard = styled('Card')(({ theme }) => ({
    backgroundColor: '#212121',
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    color: '#ffffff',
}));

export const useStyles = makeStyles((theme) => ({
    cardsContainer: {
        width: '100%',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
        overflowX: 'hidden',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    modalContent: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        borderRadius: theme.shape.borderRadius,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    chartContainer: {
        width: '100%',
        flexGrow: 1,
    },
}));

export const getStatusColor = (theme) => (status) => {
    switch (status) {
        case 'CY':
            return theme.palette.color_pallet.warning;
        case 'CR':
            return theme.palette.color_pallet.danger;
        case 'CG':
            return theme.palette.color_pallet.success;
        default:
            return theme.palette.color_pallet.info;
    }
};

export const baseChartConfig = {
    backgroundColor: 'transparent',
    textStyle: {
        color: '#ffffff',
        fontFamily: 'Roboto, sans-serif',
    },
    title: {
        textStyle: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '500',
        },
        left: 'center',
        top: 10,
    },
    tooltip: {
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
        textStyle: {
            color: '#ffffff',
            fontSize: 12,
        },
        borderColor: '#ffffff',
        borderWidth: 1,
        confine: true,
        extraCssText: 'z-index: 1005; border-radius: 4px; padding: 8px;',
        formatter: (params) => {
            const value = params.value || params.data?.value || params.data;
            return `${params.seriesName || params.name}: ${parseFloat(value).toFixed(2)}`;
        },
    },
    animation: true,
    animationDuration: 1000,
};