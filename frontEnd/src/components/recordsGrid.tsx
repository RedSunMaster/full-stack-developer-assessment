
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import SchoolRecord from '../types/schoolRecord';
import '../index.css';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export const RecordsDataGrid = forwardRef((props, ref) => {
    const [schoolRecords, setSchoolRecords] = useState<SchoolRecord[]>([]);
    const [selectedEditRecord, setSelectedEditRecord] = useState<SchoolRecord | null>(null);
    const [selectedDeleteRecord, setSelectedDeleteRecord] = useState<SchoolRecord | null>(null);

    const [completed, setCompleted] = useState(false);
    const [newTitle, setNewTitle] = useState('');  

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpenEdit = (record: SchoolRecord) => {
      setSelectedEditRecord(record);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
      setSelectedEditRecord(null);
    };

      
    const handleClickOpenDelete = (record: SchoolRecord) => {
      setSelectedDeleteRecord(record);
      setOpenDelete(true);
    };
  
    const handleCloseDelete = () => {
      setOpenDelete(false);
      setSelectedDeleteRecord(null);
    };


    const fetchRecords = () => {
      fetch('http://localhost:7777/api/get-schoolRecords')
        .then(response => response.json())
        .then(json => {
          if (json.length === 0) {
            setSchoolRecords([]);  // Set to an empty array if no records
          } else {
            const formattedData = json.map((record: { completed: boolean }) => ({
              ...record,
              completed: record.completed ? true : false,
            }));
            setSchoolRecords(formattedData);
          }
        })
        .catch(error => {
          console.error(error);
          setSchoolRecords([]);  // Set to an empty array in case of error
        });
    };
    
  
    useEffect(() => {
      fetchRecords();
    }, []);


    useEffect(() => {
      if (selectedEditRecord){
        setCompleted(selectedEditRecord.completed)
        setNewTitle(selectedEditRecord.title)
      } else {
        setCompleted(false)
        setNewTitle('')
      }
    }, [selectedEditRecord]);

    useImperativeHandle(ref, () => ({
      fetchRecords
    }));

    
    const editRecordInDatabase = async (formJson : any, id: string) => {
      try {
        const response = await fetch(`http://localhost:7777/api/update-schoolRecord/${id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formJson),
        });
    
        //Show a toast message for the errors that may occur while processing api requrest
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData['error']);
          return;
        }
        toast.success('Record Edited!');

        fetchRecords()
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error(error);
      }
    }

        
    const deleteRecordInDatabase = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:7777/api/delete-schoolRecord/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    
        //Show a toast message for the errors that may occur while processing api requrest
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData['error']);

          return;
        }
          toast.success('Record Deleted!');

          fetchRecords()
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error(error);
      }
    }
    
  
    const handleEditRecord = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //Extract the title from the form, already in json format ready for api call
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      formJson.completed = completed
      if (selectedEditRecord) {
        editRecordInDatabase(formJson, selectedEditRecord.id);
        handleCloseEdit();
      }

    }

    const handleDeleteRecord = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (selectedDeleteRecord) {
        deleteRecordInDatabase(selectedDeleteRecord.id);
        handleCloseDelete();
      }
    }




  
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
            <Button variant="contained" color="success" onClick={() => handleClickOpenEdit(params.row)}>
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
            <Button variant="contained" color="error" onClick={() => handleClickOpenDelete(params.row)}>
              Delete
            </Button>
          </Box>
        ),
      },
    ];
  

  return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{xs:10, sm:10, md:8, lg:6}}>
              <Paper sx={{ height: 600 }}>
              {schoolRecords.length > 0 ? (
                <DataGrid
                  rows={schoolRecords}
                  columns={columns}
                  autoPageSize
                  sx={{ border: 0 }}
                />
              ) : (
                <Typography variant="h6" align="center">
                  No Records Avaliable
                </Typography>
              )}
              </Paper>
            </Grid>
          </Grid>
        </Box>


        {/* Display Dialog which will allow editing of title and completed attributes */}
        <Dialog open={openEdit} onClose={handleCloseEdit} PaperProps={{
          component: 'form',
          onSubmit: handleEditRecord,
        }}>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogContent>
          {selectedEditRecord && (
            <>
              <TextField
                autoFocus
                required
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={newTitle}
                variant="standard"
                onChange={(e) => setNewTitle(e.target.value)}
              />
            <FormControlLabel
              control={<Checkbox checked={completed} onChange={(e) => setCompleted(e.target.checked)} />}
              name='completed'
              label="Completed"
            />
              <input type="hidden" name="id" value={selectedEditRecord.id} />
              </>
          )}
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" type="submit" color="success" >Submit Edit</Button>
          </DialogActions>
        </Dialog>





        {/* Display Dialog which will allow deletion of record */}
        <Dialog open={openDelete} onClose={handleCloseDelete} PaperProps={{
            component: 'form',
            onSubmit: handleDeleteRecord,
        }}>
            <DialogTitle>Delete Record</DialogTitle>
            <DialogContent>
            {selectedDeleteRecord && (
              <>
              <DialogContentText>
                Title : {selectedDeleteRecord.title}
              </DialogContentText> 
              <DialogContentText>
                Completed? : {selectedDeleteRecord.completed? "true" : "false"}
              </DialogContentText> 
                <input type="hidden" name="id" value={selectedDeleteRecord.id} />
              </>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button variant="contained" type="submit" color="error" >DELETE Record</Button>
            </DialogActions>
        </Dialog>

      </>
    )

});

export default RecordsDataGrid;