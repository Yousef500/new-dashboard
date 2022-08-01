import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const MapsDialog = ({ open, onClose, lat, lng }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        language: "ar",
    });

    return (
        open && (
            <Dialog open={open} onClose={onClose} maxWidth={"xl"}>
                <DialogTitle>موقع المقبرة</DialogTitle>

                {!isLoaded ? (
                    <CircularProgress size={200} />
                ) : (
                    <DialogContent>
                        <GoogleMap
                            zoom={10}
                            center={{ lat, lng }}
                            mapContainerStyle={{ height: 500, width: 1000 }}
                        >
                            <Marker position={{ lat, lng }} />
                        </GoogleMap>
                    </DialogContent>
                )}
            </Dialog>
        )
    );
};

export default MapsDialog;
