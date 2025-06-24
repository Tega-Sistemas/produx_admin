import { CardHeader, CardContent, Typography, Stack } from '@mui/material';
import { StyledCard } from '../common/styles';

const typographyStyles = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-word',
};

const Card = ({ data, getStatusColor, onClick }) => {
    const statusColor = getStatusColor(data.ControleSituacao);

    return (
        <StyledCard statuscolor={statusColor} onClick={onClick}>
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        noWrap
                        title={data.EquipamentoDescricao}
                        style={{ ...typographyStyles }}
                    >
                        {data.EquipamentoDescricao}
                    </Typography>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    style={{ ...typographyStyles }}
                >
                    Início: <b>{new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}</b>
                </Typography>
                {data.ControleSituacao === 'CG' ? (
                    <Stack direction="column">
                        <Typography
                            variant="body2"
                            style={{ ...typographyStyles }}
                        >
                            Programado: <b>{data.OrdemProducaoQtde || 0}</b> / Produção Atual: <b>{data.QtdeProduzido || 0}</b>
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{ ...typographyStyles }}
                        >
                            Total Prod. OP: <b>{data.QtdeProduzidoTotOrdem || 0}</b> / Peças por Minuto: <b>{data.QtdeMinuto || 0}</b>
                        </Typography>
                    </Stack>
                ) : (
                    <Typography
                        variant="body2"
                        style={{ ...typographyStyles }}
                    >
                        Motivo: <b>{data.MotivoParadaDescricao}</b>
                    </Typography>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default Card;