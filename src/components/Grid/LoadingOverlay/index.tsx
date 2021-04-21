import { GridOverlay } from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';

function GridLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default GridLoadingOverlay;
