import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './content.css';



export default function DraggableDialog({ station, stationInfo, open, setOpen }) {
  
  console.log(stationInfo);
  console.log(station);

  const selectedStationInfo = stationInfo && stationInfo.find((data) => data.Nimi === station);
  console.log(selectedStationInfo)
  console.log(open)

  
    return (
        <div  className='dialog-container'>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Aseman tiedot</DialogTitle>
          <DialogContent className="dialog-content">
          {selectedStationInfo && (
            <div>
              <div>Nimi: {selectedStationInfo.Nimi}</div>
              <div>Osoite: {selectedStationInfo.Osoite}</div>
            </div>
          )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary"  onClick={() =>  setOpen(false) } >
              Go Back
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }