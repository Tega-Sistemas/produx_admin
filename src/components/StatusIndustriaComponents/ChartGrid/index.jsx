import React from 'react';
import { Grid2 } from '@mui/material';
import EfficiencyChart from '../EfficiencyChart';
import OEEChart from '../OEEChart';
import ParadaRetrabalhoChart from '../ParadaRetrabalhoChart';
import ProductionChart from '../ProductionChart';
import WorkedMinutesCardComponent from '../WorkedMinutesCard';

const ChartGrid = ({ data }) => {
    return (
        <Grid2
            container
            spacing={2}
            sx={{
                width: '100%',
                flexGrow: 1,
                padding: '8px',
            }}
        >
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <EfficiencyChart data={data} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <OEEChart data={data} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ParadaRetrabalhoChart data={data} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProductionChart data={data} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <WorkedMinutesCardComponent minutes={data.QtdeMinutos} turnMinutes={data.MinutosTurno} />
            </Grid2>
        </Grid2>
    );
};

export default ChartGrid;