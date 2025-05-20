import React from 'react';
import { CardHeader, CardContent, Typography } from '@mui/material';
import { StyledCard } from '../common/styles';

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
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {data.EquipamentoDescricao}
                    </Typography>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    title={`Data: ${new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}`}
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        wordBreak: 'break-word',
                    }}
                >
                    Data: {new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}
                </Typography>
                {data.ControleSituacao === 'CG' ? (
                    <Typography
                        variant="body2"
                        title={`Qte. Produzida: ${data.QtdeProduzido} / Peças minuto: ${data.QtdeProduzido / data.QtdeMinutos}`}
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        Qte. Produzida: {data.QtdeProduzido} / Peças minuto: {data.QtdeProduzido}
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        title={`Motivo: ${data.MotivoParadaDescricao}`}
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        Motivo: {data.MotivoParadaDescricao}
                    </Typography>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default Card;