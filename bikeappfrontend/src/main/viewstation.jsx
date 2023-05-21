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
          <DialogTitle style={{ cursor: 'move', fontWeight:'bold' }} id="draggable-dialog-title">Aseman tiedot</DialogTitle>
          <DialogContent className="dialog-content">
          {selectedStationInfo && (
               <div>
               <div><strong>Nimi:</strong> {selectedStationInfo.Nimi}</div>
               <div><strong>Osoite:</strong> {selectedStationInfo.Osoite}</div>
               <div><strong>Asemalta lähtevien matkojen lkm:</strong> {selectedDepartureStationCount.count}</div>
               <div><strong>Asemalle saapuvien matkojen lkm:</strong> {selectedReturnStationCount.count}</div>
               <div><strong>Asemalta lähtevien matkojen keskimääräinen pituus:</strong> {formattedDepartureStationDistance}</div>
               <div><strong>Asemalle saapuvien matkojen keskimääräinen pituus:</strong> {formattedReturnStationDistance}</div>
               <div><strong>Asemalta lähtievien matkojen top5 paluuasemat:</strong> {selectedDepartureStationCount.topReturnStations.join(', ')}</div>
               <div><strong>Asemalle saapuvien matkojen top5 lähtöasemat:</strong> {selectedReturnStationCount.topDepartureStations.join(', ')}</div>
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