import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    Chip,
    Grid,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    InputAdornment,
    TablePagination
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Refresh as RefreshIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Schedule as ScheduleIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';

// Componente otimizado para tabela com paginação
const PaginatedTable = React.memo(({ items, getStatusIcon, maxItems = 20 }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(maxItems);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const paginatedItems = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return items.slice(startIndex, startIndex + rowsPerPage);
    }, [items, page, rowsPerPage]);

    return (
        <>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>OP</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Revestimento</TableCell>
                            <TableCell align="right">Programado</TableCell>
                            <TableCell align="right">Produzido</TableCell>
                            <TableCell align="right">Pendente</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems.map((item, index) => (
                            <TableRowItem
                                key={`${item.OP}-${item.CodOperacao}-${page}-${index}`}
                                item={item}
                                getStatusIcon={getStatusIcon}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {items.length > maxItems && (
                <TablePagination
                    component="div"
                    count={items.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    labelRowsPerPage="Itens por página:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                    }
                />
            )}
        </>
    );
});

// Componente otimizado para itens da tabela
const TableRowItem = React.memo(({ item, getStatusIcon }) => {
    const pendente = parseInt(item.Programado) - parseInt(item.Produzido);
    const itemPercentage = (parseInt(item.Produzido) / parseInt(item.Programado)) * 100;

    return (
        <TableRow>
            <TableCell>{item.OP}</TableCell>
            <TableCell>
                <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {item.Prod}
                </Typography>
            </TableCell>
            <TableCell>{item.Rev}</TableCell>
            <TableCell align="right">{parseInt(item.Programado).toLocaleString()}</TableCell>
            <TableCell align="right">{parseInt(item.Produzido).toLocaleString()}</TableCell>
            <TableCell align="right">{pendente.toLocaleString()}</TableCell>
            <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    {getStatusIcon(parseInt(item.Programado), parseInt(item.Produzido))}
                    <Typography variant="body2">
                        {itemPercentage.toFixed(1)}%
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
});

// Hook personalizado para debounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default function StatusLoteProducao() {
    const [loteId, setLoteId] = useState(3700);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedSetor, setExpandedSetor] = useState(false);

    // Novos estados para filtros
    const [statusFilter, setStatusFilter] = useState('todos'); // 'todos', 'finalizados', 'nao_finalizados'
    const [setorFilter, setSetorFilter] = useState('');
    const [searchText, setSearchText] = useState('');
    const [showOnlyPending, setShowOnlyPending] = useState(false);
    const [maxItemsPerSetor, setMaxItemsPerSetor] = useState(50); // Limitar itens por setor

    // Debounce na busca de texto
    const debouncedSearchText = useDebounce(searchText, 300);

    // Dados de exemplo baseados no seu JSON
    const exampleData = [
        {
            "CodSetor": "1",
            "Setor": "SETOR CORTE",
            "OP": "41215",
            "CodProd": "3845",
            "Prod": "BASE COMODA SAP Q ENC RET 940X418 (942 X 418)",
            "CodRev": "3",
            "Rev": "BRANCO ACETINADO",
            "CodOperacao": "7",
            "Operacao": "EMBALAR PRODUTOS",
            "Passada": "1",
            "Programado": "1100",
            "Produzido": "0"
        },
        {
            "CodSetor": "1",
            "Setor": "SETOR CORTE",
            "OP": "41215",
            "CodProd": "3845",
            "Prod": "BASE COMODA SAP Q ENC RET 940X418 (942 X 418)",
            "CodRev": "3",
            "Rev": "BRANCO ACETINADO",
            "CodOperacao": "11",
            "Operacao": "CORTE DE CHAPA",
            "Passada": "1",
            "Programado": "1100",
            "Produzido": "0"
        },
        {
            "CodSetor": "1",
            "Setor": "SETOR CORTE",
            "OP": "41216",
            "CodProd": "3844",
            "Prod": "VISTA LAT ORGA/COM SAP 1PT/4GV Q ENC. RETRO 654X08",
            "CodRev": "3",
            "Rev": "BRANCO ACETINADO",
            "CodOperacao": "14",
            "Operacao": "RECORTE",
            "Passada": "1",
            "Programado": "2200",
            "Produzido": "2200"
        },
        {
            "CodSetor": "1",
            "Setor": "SETOR CORTE",
            "OP": "41223",
            "CodProd": "3712",
            "Prod": "PORTA COM SAP (FUR.128) 644X296 (646 X 298)",
            "CodRev": "3",
            "Rev": "BRANCO ACETINADO",
            "CodOperacao": "11",
            "Operacao": "CORTE DE CHAPA",
            "Passada": "1",
            "Programado": "1500",
            "Produzido": "400"
        },
        {
            "CodSetor": "1",
            "Setor": "SETOR CORTE",
            "OP": "41227",
            "CodProd": "722",
            "Prod": "FRENTE GAVETA Q ENCANTO (F.128) 592X158 (594 X 158",
            "CodRev": "3",
            "Rev": "BRANCO ACETINADO",
            "CodOperacao": "11",
            "Operacao": "CORTE DE CHAPA",
            "Passada": "1",
            "Programado": "6000",
            "Produzido": "6000"
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // // Simulando a chamada da API - substitua pela sua implementação real
                // setTimeout(() => {
                //     setData(exampleData);
                //     setLoading(false);
                // }, 1000);

                // Descomente e use sua implementação real:

                const response = await fetch(`/api/Api/data/statusloteproducao?Loteproducaoid=${loteId}`)
                    .then(response => response.json())
                    .then(data => setData(data.LoteProgress))
                    .catch(error => console.error('Erro ao buscar os dados da API:', error))
                    .finally(() => setLoading(false));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                const result = await response.json();
                setData(result);

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [loteId]);

    const handleLoteChange = useCallback((event) => {
        setLoteId(event.target.value);
    }, []);

    const handleRefresh = useCallback(() => {
        setData(null);
        setLoading(true);
        // Trigger useEffect
        setLoteId(prev => prev);
    }, []);

    const getStatusColor = useCallback((programado, produzido) => {
        const percentage = (produzido / programado) * 100;
        if (percentage === 100) return 'success';
        if (percentage > 0) return 'warning';
        return 'error';
    }, []);

    const getStatusIcon = useCallback((programado, produzido) => {
        const percentage = (produzido / programado) * 100;
        if (percentage === 100) return <CheckCircleIcon color="success" />;
        if (percentage > 0) return <ScheduleIcon color="warning" />;
        return <CancelIcon color="error" />;
    }, []);

    const getStatusText = useCallback((programado, produzido) => {
        const percentage = (produzido / programado) * 100;
        if (percentage === 100) return 'Concluído';
        if (percentage > 0) return 'Em Andamento';
        return 'Pendente';
    }, []);

    // Função otimizada para agrupar dados
    const groupDataBySetorAndOperacao = useCallback((data) => {
        if (!data) return {};

        return data.reduce((acc, item) => {
            const setorKey = item.Setor;
            const operacaoKey = item.Operacao;

            if (!acc[setorKey]) {
                acc[setorKey] = {};
            }

            if (!acc[setorKey][operacaoKey]) {
                acc[setorKey][operacaoKey] = [];
            }

            acc[setorKey][operacaoKey].push(item);
            return acc;
        }, {});
    }, []);

    const calculateTotals = useCallback((items) => {
        return items.reduce((acc, item) => ({
            programado: acc.programado + parseInt(item.Programado),
            produzido: acc.produzido + parseInt(item.Produzido)
        }), { programado: 0, produzido: 0 });
    }, []);

    // Dados filtrados e agrupados com useMemo para otimização
    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter(item => {
            const programado = parseInt(item.Programado);
            const produzido = parseInt(item.Produzido);
            const percentage = (produzido / programado) * 100;

            // Filtro por status
            if (statusFilter === 'finalizados' && percentage < 100) return false;
            if (statusFilter === 'nao_finalizados' && percentage >= 100) return false;

            // Filtro por setor
            if (setorFilter && item.Setor !== setorFilter) return false;

            // Filtro por pendentes
            if (showOnlyPending && produzido >= programado) return false;

            // Filtro por texto
            if (debouncedSearchText) {
                const searchLower = debouncedSearchText.toLowerCase();
                return (
                    item.Prod.toLowerCase().includes(searchLower) ||
                    item.OP.toLowerCase().includes(searchLower) ||
                    item.Operacao.toLowerCase().includes(searchLower) ||
                    item.Rev.toLowerCase().includes(searchLower)
                );
            }

            return true;
        });
    }, [data, statusFilter, setorFilter, showOnlyPending, debouncedSearchText]);

    const groupedData = useMemo(() => {
        return groupDataBySetorAndOperacao(filteredData);
    }, [filteredData, groupDataBySetorAndOperacao]);

    // Lista de setores únicos para o filtro
    const setoresUnicos = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(item => item.Setor))].sort();
    }, [data]);

    // Totais gerais
    const totaisGerais = useMemo(() => {
        if (!filteredData) return { total: 0, programado: 0, produzido: 0 };

        return filteredData.reduce((acc, item) => ({
            total: acc.total + 1,
            programado: acc.programado + parseInt(item.Programado),
            produzido: acc.produzido + parseInt(item.Produzido)
        }), { total: 0, programado: 0, produzido: 0 });
    }, [filteredData]);

    // Indicador de performance
    const performanceMetrics = useMemo(() => {
        if (!data) return null;

        const totalItems = data.length;
        const filteredItems = filteredData.length;
        const reductionPercentage = totalItems > 0 ? ((totalItems - filteredItems) / totalItems * 100) : 0;

        return {
            totalItems,
            filteredItems,
            reductionPercentage: reductionPercentage.toFixed(1)
        };
    }, [data, filteredData]);

    // Função para limpar filtros
    const handleClearFilters = useCallback(() => {
        setStatusFilter('todos');
        setSetorFilter('');
        setSearchText('');
        setShowOnlyPending(false);
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Status do Lote de Produção
                </Typography>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>Carregando dados...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Status do Lote de Produção
            </Typography>

            {/* Controles e Filtros */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={2}>
                            <TextField
                                label="ID do Lote"
                                type="number"
                                value={loteId}
                                onChange={handleLoteChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Buscar"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="OP, Produto, Operação..."
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="todos">Todos</MenuItem>
                                    <MenuItem value="finalizados">Finalizados</MenuItem>
                                    <MenuItem value="nao_finalizados">Não Finalizados</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Setor</InputLabel>
                                <Select
                                    value={setorFilter}
                                    onChange={(e) => setSetorFilter(e.target.value)}
                                    label="Setor"
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {setoresUnicos.map(setor => (
                                        <MenuItem key={setor} value={setor}>
                                            {setor}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showOnlyPending}
                                        onChange={(e) => setShowOnlyPending(e.target.checked)}
                                        size="small"
                                    />
                                }
                                label="Só Pendentes"
                            />
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <TextField
                                label="Max/Setor"
                                type="number"
                                value={maxItemsPerSetor}
                                onChange={(e) => setMaxItemsPerSetor(parseInt(e.target.value) || 50)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{ min: 10, max: 200 }}
                            />
                        </Grid>                        <Grid item xs={12} md={0.5}>
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={handleRefresh}
                                disabled={loading}
                                fullWidth
                                size="small"
                            >

                            </Button>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button
                                variant="outlined"
                                onClick={handleClearFilters}
                                disabled={loading}
                                fullWidth
                                size="small"
                            >
                                Limpar Filtros
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Aviso de Performance */}
            {data && data.length > 200 && filteredData.length > 100 && (
                <Card sx={{ mb: 2, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                    <CardContent sx={{ py: 1 }}>
                        <Typography variant="body2">
                            ⚡ Grande volume de dados ({filteredData.length} itens).
                            Use os filtros para melhorar a performance da tela.
                            {performanceMetrics && performanceMetrics.reductionPercentage > 0 &&
                                ` Redução atual: ${performanceMetrics.reductionPercentage}%`
                            }
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Resumo Geral */}
            {filteredData && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Resumo Geral - Lote {loteId}
                            {(statusFilter !== 'todos' || setorFilter || debouncedSearchText || showOnlyPending) && (
                                <Chip
                                    icon={<FilterListIcon />}
                                    label={performanceMetrics ? `Filtrado (${performanceMetrics.reductionPercentage}% redução)` : 'Filtrado'}
                                    size="small"
                                    color="info"
                                    sx={{ ml: 1 }}
                                />
                            )}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                    Itens Exibidos
                                </Typography>
                                <Typography variant="h5">
                                    {totaisGerais.total}
                                </Typography>
                                {data && filteredData.length !== data.length && (
                                    <Typography variant="caption" color="text.secondary">
                                        de {data.length} total
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Programado
                                </Typography>
                                <Typography variant="h5">
                                    {totaisGerais.programado.toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Produzido
                                </Typography>
                                <Typography variant="h5">
                                    {totaisGerais.produzido.toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                    % Concluído
                                </Typography>
                                <Typography variant="h5">
                                    {totaisGerais.programado > 0 ?
                                        ((totaisGerais.produzido / totaisGerais.programado) * 100).toFixed(1) + '%' :
                                        '0%'
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* Agrupamento por Setor */}
            {Object.entries(groupedData).map(([setor, operacoes]) => (
                <Card key={setor} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {setor}
                        </Typography>

                        {/* Agrupamento por Operação */}
                        {Object.entries(operacoes).map(([operacao, items]) => {
                            const totals = calculateTotals(items);
                            const percentage = totals.programado > 0 ? (totals.produzido / totals.programado) * 100 : 0;

                            return (
                                <Accordion key={`${setor}-${operacao}`} sx={{ mb: 1 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {getStatusIcon(totals.programado, totals.produzido)}
                                                        <Typography variant="subtitle1">
                                                            {operacao}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={percentage}
                                                            sx={{ width: 100, height: 8, borderRadius: 4 }}
                                                            color={getStatusColor(totals.programado, totals.produzido)}
                                                        />
                                                        <Typography variant="body2">
                                                            {percentage.toFixed(1)}%
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Chip
                                                        label={getStatusText(totals.programado, totals.produzido)}
                                                        color={getStatusColor(totals.programado, totals.produzido)}
                                                        size="small"
                                                    />
                                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                                        {totals.produzido.toLocaleString()} / {totals.programado.toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <PaginatedTable
                                            items={items}
                                            getStatusIcon={getStatusIcon}
                                            maxItems={maxItemsPerSetor}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}

            {!filteredData.length && !loading && data && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">
                            Nenhum item encontrado com os filtros aplicados
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Tente ajustar os filtros ou realizar uma nova busca
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {!data && !loading && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">
                            Nenhum dado encontrado para o lote {loteId}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}