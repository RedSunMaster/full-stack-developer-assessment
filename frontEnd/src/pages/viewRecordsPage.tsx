import { Navbar } from '../components/navbar';
import { RecordsDataGrid } from '../components/recordsGrid'
import '../index.css'

export const ViewRecordsPage = () => {


  return (
    <>
        <Navbar />


        <h1 className='title'>School Records</h1>
        <RecordsDataGrid />
    </>
  );
};

export default ViewRecordsPage;
