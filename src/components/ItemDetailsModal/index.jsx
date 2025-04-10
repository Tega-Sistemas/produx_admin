import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    Fade,
    Paper,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { formatDateToBrazilianFormat, formatDecimalPlaces, calculateMinutesDifference, returnTpCEPP } from '../../utils/utils';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: theme.palette.grey[900],
        borderRadius: '12px',
        border: `1px solid ${theme.palette.grey[700]}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: '12px 12px 0 0',
    display: 'flex', // Alterado para flex para alinhar título e ícone
    justifyContent: 'space-between', // Espaço entre título e ícone
    alignItems: 'center', // Centraliza verticalmente
}));

const InfoCard = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(2),
    borderRadius: '8px',
}));

// Componente para cada card
const InfoCardItem = ({ label, value, subvalue }) => (
    <InfoCard elevation={2}>
        <Typography
            variant="subtitle1"
            sx={{
                fontWeight: 'bold',
                color: '#fff',
                mb: 1,
            }}
        >
            {label}
        </Typography>
        <Typography
            variant="body2"
            sx={{
                color: theme => theme.palette.grey[300],
                wordBreak: 'break-word',
            }}
        >
            {value || '-'}
        </Typography>
        {subvalue && (
            <Typography
                variant="body2"
                sx={{
                    color: theme => theme.palette.grey[500],
                    wordBreak: 'break-word',
                }}
            >
                {subvalue}
            </Typography>
        )}
    </InfoCard>
);

const ItemDetailsModal = ({ open, onClose, item }) => {
    if (!item) return null;

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            TransitionComponent={Fade}
            transitionDuration={300}
        >
            <HeaderBox>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff',
                    }}
                >
                    Detalhes do Item
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ color: '#fff' }}
                    aria-label="fechar"
                >
                    <CloseIcon />
                </IconButton>
            </HeaderBox>
            <DialogContent sx={{ padding: 3 }}>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    <InfoCardItem label="Data de Início" value={formatDateToBrazilianFormat(item.CEPPDtInicio)} subvalue={`${calculateMinutesDifference(item.CEPPDtInicio)} minutos`} />
                    <InfoCardItem label="Ordem de Produção" value={item.OrdemProducaoCodReferencial ? item.OrdemProducaoCodReferencial : item.OrdemProducaoId} />
                    <InfoCardItem label="Tipo CEPP" value={returnTpCEPP(item.CEPPTipoCEPP)} />
                    <InfoCardItem label="Quantidade da Ordem" value={formatDecimalPlaces(item.CEPPQtdeOrdem, 0)} />
                    <InfoCardItem label="Quantidade Produzida" value={formatDecimalPlaces(item.CEPPQtdeProduzida, 0)} />
                    <InfoCardItem label="Quantidade por Minuto" value={formatDecimalPlaces(item.CEPPQtdePorMinuto, 2)} />
                    <InfoCardItem label="Empresa" value={item.EmpresaNome} />
                    <InfoCardItem label="Equipamento" value={item.EquipamentoDescricao} />
                    {item.MotivoParadaDescricao ? (<InfoCardItem label="Motivo de Parada" value={item.MotivoParadaDescricao} />) : null}
                    {item.MotivoRetrabalhoDescricao ? (<InfoCardItem label="Motivo de Retrabalho" value={item.MotivoRetrabalhoDescricao} />) : null}
                    {item.OperacoesCEPPDescricao ? (<InfoCardItem label="Operação" value={item.OperacoesCEPPDescricao} />) : null}
                    <InfoCardItem label="Lote de Produção" value={item.stLoteProducaoId} />
                    <InfoCardItem label="Setor" value={item.stSetorDescricao} />
                </Box>
                <Box sx={{ mt: 3, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {item.ProdutoDescricao ? (<InfoCardItem label="Produto" value={item.ProdutoDescricao} subvalue={`Código: ${item.ProdutoCodigo} / Revestimento: ${item.RevestimentoDescricao}`} />) : null}
                </Box>
            </DialogContent>
        </StyledDialog>
    );
};

export default ItemDetailsModal;