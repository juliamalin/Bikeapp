import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './content.css';



export default function DraggableDialog({ station, stationInfo, open, setOpen, departureStationCount, returnStationCount }) {

  const formatDistance = (distance) => {
    const kilometers = distance / 1000
    const roundedKilometers = kilometers.toFixed(2)
    return `${roundedKilometers} km`
  };
  
  console.log(stationInfo);
  console.log(station);

  const selectedStationInfo = stationInfo && stationInfo.find((data) => data.Nimi === station)
  const selectedDepartureStationCount = departureStationCount && departureStationCount.find((data) => data._id === station)
  const selectedReturnStationCount = returnStationCount && returnStationCount.find((data) => data._id === station)
  const formattedDepartureStationDistance = selectedDepartureStationCount&&formatDistance(selectedDepartureStationCount.averageDistance)
  const formattedReturnStationDistance = selectedReturnStationCount&&formatDistance(selectedReturnStationCount.averageDistance)


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
              <div>Asemalta lähtevien matkojen lkm: {selectedDepartureStationCount.count}</div>
              <div>Asemalle saapuvien matkojen lkm: {selectedReturnStationCount.count}</div>
              <div>Asemalta lähtevien matkojen keskimääräinen pituus: {formattedDepartureStationDistance}</div>
              <div>Asemalle saapuvien matkojen keskimääräinen pituus: {formattedReturnStationDistance}</div>
              <div>Asemalta lähtievien matkojen top5 paluuasemat: {selectedDepartureStationCount.topReturnStations.join(', ')}</div>
              <div>Asemalle saapuvien matkojen top5 lähtöasemat: {selectedReturnStationCount.topDepartureStations.join(', ')}</div>
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