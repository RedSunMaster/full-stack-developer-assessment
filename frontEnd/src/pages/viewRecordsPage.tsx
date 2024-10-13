import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Navbar } from '../components/navbar';
import { RecordsDataGrid } from '../components/recordsGrid'
import '../index.css'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const ViewRecordsPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const recordsDataGridRef = useRef<{ fetchRecords: () => void }>(null);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };


  //Call API with POST method to the correct route, and with the appropritate JSON body
  //in the form
  //  {
  //    "title": "" 
  //  }
  const addRecordToDatabase = async (formJson : any) => {
    try {
      const response = await fetch('http://localhost:7777/api/add-schoolRecord', {
        method: 'POST',
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
  
      toast.success('Record Added!');
      recordsDataGridRef.current?.fetchRecords(); // Call fetchRecords to refresh the data
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  }
  

  const handleSubmitRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Extract the title from the form, already in json format ready for api call
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    addRecordToDatabase(formJson)
    handleCloseCreate();
  }


  return (
    <>


        <Navbar />

        <h1 className='title'>School Records</h1>



        {/* Assign the Ref to the recordsdatagrid object */}
        <RecordsDataGrid ref={recordsDataGridRef} />

        <Box className="CreateButton" display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Button variant="contained" color="success" onClick={() => handleClickOpenCreate()}>
              Create New Record
            </Button>
        </Box>

        {/* Display Dialog which will allow editing of title and completed attributes */}
        <Dialog 
          open={openCreate} 
          onClose={handleCloseCreate}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmitRecord,
        }}>
            <DialogTitle>Create Record</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please Provide a Title
            </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />

            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button variant="contained" type="submit" color="success">Create</Button>
            </DialogActions>
        </Dialog>

        <ToastContainer/>

    </>
  );
};

export default ViewRecordsPage;
