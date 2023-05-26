/* eslint-disable react/prop-types */
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import './content.css'


export default function ViewStation({ station, stationInfo, open, setOpen, departureStationCount, returnStationCount }) {


    const formatDistance = (distance) => {
        const kilometers = distance / 1000
        const roundedKilometers = kilometers.toFixed(2)
        return `${roundedKilometers} km`
    }

    const selectedStationInfo = stationInfo.find((data) => data.Nimi === station)
    const selectedDepartureStationCount = departureStationCount.find((data) => data._id === station)
    const selectedReturnStationCount = returnStationCount.find((data) => data._id === station)
    const formattedDepartureStationDistance = selectedDepartureStationCount&&formatDistance(selectedDepartureStationCount.averageDistance)
    const formattedReturnStationDistance = selectedReturnStationCount&&formatDistance(selectedReturnStationCount.averageDistance)

    return (
        <div  className='dialog-container'>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle style={{ fontWeight:'bold' }} id="draggable-dialog-title">Aseman tiedot</DialogTitle>
                <DialogContent className="dialog-content">
                    {selectedStationInfo &&(
                        <div>
                            <div><strong>Nimi:</strong> {selectedStationInfo.Nimi}</div>
                            <div><strong>Osoite:</strong> {selectedStationInfo.Osoite}</div>
                            <div><strong>Asemalta lähtevien matkojen lkm:</strong> {selectedDepartureStationCount&&selectedDepartureStationCount.count}</div>
                            <div><strong>Asemalle saapuvien matkojen lkm:</strong> {selectedReturnStationCount&&selectedReturnStationCount.count}</div>
                            <div><strong>Asemalta lähtevien matkojen keskimääräinen pituus:</strong> {formattedDepartureStationDistance}</div>
                            <div><strong>Asemalle saapuvien matkojen keskimääräinen pituus:</strong> {formattedReturnStationDistance}</div>
                            <div><strong>Asemalta lähtievien matkojen top5 paluuasemat:</strong> { selectedDepartureStationCount&&selectedDepartureStationCount.topReturnStations.join(', ')}</div>
                            <div><strong>Asemalle saapuvien matkojen top5 lähtöasemat:</strong> {selectedReturnStationCount&&selectedReturnStationCount.topDepartureStations.join(', ')}</div>
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
    )
}