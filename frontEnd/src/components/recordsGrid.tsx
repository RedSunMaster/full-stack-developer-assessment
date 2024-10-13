
import { useEffect, useState } from 'react';
import SchoolRecord from '../types/schoolRecord';
import '../index.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';


export const RecordsDataGrid = () => {
    const [schoolRecords, setSchoolRecords] = useState<SchoolRecord[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<SchoolRecord | null>(null);
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = (record: SchoolRecord) => {
      setSelectedRecord(record);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedRecord(null);
    };

    useEffect(() => {
        fetch('http://localhost:7777/api/get-schoolRecords')
          .then(response => response.json())
          .then(json => {
            const formattedData = json.map((record: { completed: boolean; }) => ({
              ...record,
              completed: record.completed ? true : false
            }));
            setSchoolRecords(formattedData);
          })
          .catch(error => console.error(error));
      }, []);
      
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'title', headerName: 'Title', flex: 2 },
      { field: 'completed', headerName: 'Completed', flex: 1, type: 'boolean' },
      {
        field: 'edit',
        headerName: '',
        flex: 1,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Button variant="contained" color="success" onClick={() => handleClickOpen(params.row)}>
              Edit
            </Button>
          </Box>
        ),
      },
      {
        field: 'delete',
        headerName: '',
        flex: 1,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Button variant="contained" color="error" onClick={() => handleClickOpen(params.row)}>
              Delete
            </Button>
          </Box>
        ),
      },
    ];
  
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{xs:10, sm:10, md:8, lg:6}}>
            <Paper sx={{ height: 400 }}>
              <DataGrid
                rows={schoolRecords}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>


        {/* Display Dialog which will allow editing of title and completed attributes */}
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Record Details</DialogTitle>
            <DialogContent>
                {/* If record selected for editing, fill the dialog information */}
                {selectedRecord && (
                    <>
                    <DialogContentText>ID: {selectedRecord.id}</DialogContentText>
                    <DialogContentText>Title: {selectedRecord.title}</DialogContentText>
                    <DialogContentText>Completed: {selectedRecord.completed ? 'Yes' : 'No'}</DialogContentText>
                    </>
                )}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
      </>
    )

}

export default RecordsDataGrid;