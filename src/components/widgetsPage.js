import React, {useState, useEffect} from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import {toast} from 'react-toastify';
import {
  Button,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core';

let allStyles = {
  container: {textAlign: 'center', marginBottom: '30px'},
  form: {minWidth: '120px'},
  button: {margin: '15px'},
  tableContainer: {width: '76%', margin: 'auto'},
};

const Widgetspage = () => {
  const [step, setStep] = useState(1);
  const [singleWidget, setSingleWidget] = useState({});
  const [widgets, setWidgets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(false);

  useEffect(() => {
    setWidgets(JSON.parse(localStorage.getItem('myData') || '[]'));
  }, []);

  const handleClickOpen = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
  };

  const handleDelOpen = (index) => {
    setcurrentIndex(index);
    setOpenDel(true);
  };
  const handleDelClose = () => {
    setOpenDel(false);
  };

  const createWidget = () => {
    localStorage.setItem(
      'myData',
      JSON.stringify([...widgets, {...singleWidget}])
    );
    setWidgets([...widgets, {...singleWidget}]);
    setSingleWidget({});
    handleClose();
    setStep(1);
    toast.success('Widget Added Successfully', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const optionSelected = (e) => {
    const selectedLanguage = e.target.value;
    setSingleWidget({language: selectedLanguage});
  };

  const providedName = (e) => {
    const selectedName = e.target.value;
    setSingleWidget({...singleWidget, name: selectedName});
  };

  const removeWidget = () => {
    let updatedWidgets = [...widgets];
    updatedWidgets = updatedWidgets.filter((w, i) => i !== currentIndex);
    localStorage.setItem('myData', JSON.stringify(updatedWidgets));
    setWidgets(updatedWidgets);
    handleDelClose();
    toast.error('Widget deleted Successfully', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div style={allStyles.container}>
        <h1>Widgets Page</h1>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add New Widget
        </Button>
      </div>
      <Dialog onClose={handleClose} open={openForm}>
        <DialogTitle onClose={handleClose}>Create a New Widget</DialogTitle>
        {step === 1 ? (
          <DialogContent dividers>
            <Typography>Select a language</Typography>
            <FormControl style={allStyles.form}>
              <InputLabel id='languages'>languages</InputLabel>
              <Select
                labelId='Languages'
                onChange={(e) => optionSelected(e)}
                required
              >
                <MenuItem value={'German'}>German</MenuItem>
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'French'}>French</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='contained'
              color='primary'
              style={allStyles.button}
              onClick={() => setStep(2)}
              disabled={singleWidget.language ? false : true}
            >
              Next
            </Button>
          </DialogContent>
        ) : (
          <DialogContent dividers>
            <Typography gutterBottom>Enter Your Name</Typography>
            <TextField
              required
              label='Name'
              onChange={(e) => providedName(e)}
            />
            <Button
              variant='contained'
              color='primary'
              style={allStyles.button}
              onClick={() => createWidget()}
              disabled={singleWidget.name ? false : true}
            >
              Add
            </Button>
          </DialogContent>
        )}
      </Dialog>
      <TableContainer component={Paper} style={allStyles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Names</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {widgets.map((widget, index) => (
            <TableBody key={index}>
              <TableCell scope='row'>{widget.name}</TableCell>
              <TableCell scope='row'>{widget.language}</TableCell>
              <TableCell scope='row'>
                <HighlightOffIcon
                  color='error'
                  onClick={() => handleDelOpen(index)}
                />
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
      <Dialog onClose={handleDelClose} open={openDel}>
        <DialogTitle onClose={handleDelClose}>
          Are you sure you want to delete this widget?
        </DialogTitle>
        <DialogContent dividers>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => removeWidget()}
          >
            Yes
          </Button>
          <Button
            variant='contained'
            color='primary'
            style={allStyles.button}
            onClick={handleDelClose}
          >
            No
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Widgetspage;
