import React, {
  useEffect,
  useState,
  DragEvent,
  MouseEvent,
} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  ButtonBase,
  IconButton,
  DialogTitle,
  LinearProgress,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Folder as FolderIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import MediaItem from "../../types/MediaItem";
import { useServerManager } from "../../components/ServerManagerProvider";
import { join } from "path";
import { FolderPlus as AddFolderIcon } from "mdi-material-ui";
import clsx from "clsx";
import { resolveMediaUrl } from "../../utils/PlatformUtils";

type initialContextMenuState = {
  mouseX: number | null;
  mouseY: number | null;
};

const initialState: initialContextMenuState = {
  mouseX: null,
  mouseY: null,
};

export default function Media(props: any) {
  const classes = useStyles();
  //const theme = useTheme();
  const serverManager = useServerManager();
  //const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [structure, setStructure] = useState<MediaItem[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFolderDialogOpen, setNewFolderDialogOpen] =
    useState<boolean>(false);

  const [mediaItemContextMenuPosition, setAssetContextMenuPosition] =
    React.useState(initialState);
  const [mediaItemSelected, setMediaItemSelected] =
    React.useState<MediaItem | null>(null);

  useEffect(() => {
    setLoading(true);
    const currentPath = path || "";
    serverManager
      .loadMedia(currentPath)
      .then((response) => {
        const sorted = response.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setStructure(sorted);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path, serverManager]);

  const resolveAssetIcon = (item: MediaItem) => {
    return (
      <img
        src={resolveAssetPath(item.name)}
        className={classes.mediaItemIcon}
      />
    );
  };

  const resolveAssetPath = (name: string) => {
    let normalizedPath = name;
    if (path) normalizedPath = join(path, name);
    return resolveMediaUrl(normalizedPath);
  };

  const handleClick = (
    event: MouseEvent<HTMLDivElement>,
    mediaItem: MediaItem
  ) => {
    event.preventDefault();
    setMediaItemSelected(mediaItem);
    setAssetContextMenuPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleAssetsContextMenuClose = () => {
    setAssetContextMenuPosition(initialState);
    setMediaItemSelected(null);
  };

  const renderDirectories = () => {
    const directories = structure.filter((item) => item.isDir);
    return directories.map((directory) => {
      return (
        <Grid item key={directory.name}>
          <ButtonBase
            onClick={() => navegateToFolder(directory.name)}
            className={classes.folderButton}
          >
            <FolderIcon className={classes.folderIcon} />
            <Typography className={classes.folderName}>
              {directory.name}
            </Typography>
          </ButtonBase>
        </Grid>
      );
    });
  };

  const renderAssets = () => {
    const assets = structure.filter((item) => !item.isDir);
    return assets.map((asset) => (
      <Grid item key={asset.name}>
        <div
          className={classes.mediaItemContainer}
          onContextMenu={(e) => handleClick(e, asset)}
        >
          {resolveAssetIcon(asset)}
          <Typography className={classes.mediaItemName}>
            {asset.name}
          </Typography>
          <div>
            <span>{asset.extension}</span>
          </div>
        </div>

        <Menu
          keepMounted
          open={mediaItemContextMenuPosition.mouseY !== null}
          onClose={handleAssetsContextMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={
            mediaItemContextMenuPosition.mouseY !== null &&
            mediaItemContextMenuPosition.mouseX !== null
              ? {
                  top: mediaItemContextMenuPosition.mouseY,
                  left: mediaItemContextMenuPosition.mouseX,
                }
              : undefined
          }
        >
          <MenuItem onClick={handleCopyUrlOfAsset}>Copy URL</MenuItem>
        </Menu>
      </Grid>
    ));
  };

  const handleCopyUrlOfAsset = () => {
    if (mediaItemSelected)
      navigator.clipboard.writeText(resolveAssetPath(mediaItemSelected.name));
    handleAssetsContextMenuClose();
  };

  const navegateToFolder = (folder: string) => {
    const currentPath = path || "";
    const newPath = join(currentPath, folder);

    setPath(newPath);
  };

  const createFolder = () => {
    const folderPath = `${path}/${newFolderName}`;
    serverManager.createFolder(folderPath);
    setNewFolderDialogOpen(false);
  };

  const closeNewFolderDialog = () => {
    setNewFolderDialogOpen(false);
    setNewFolderName("");
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    uploadFiles(e.dataTransfer.files);
    e.dataTransfer.clearData();
  };

  const uploadFiles = (files: FileList) => {
    const uploadFilesTask = new Promise((resolve, reject) => {
      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        serverManager.uploadFile(file, path);
      }
    });
  };

  const goUp = () => {
    const newPath = join(path, "../");
    setPath(newPath);
  };

  return (
    <>
      <PageTitle title="Multimedia" subtitle={path}>
        <IconButton onClick={goUp}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={() => setNewFolderDialogOpen(true)}>
          <AddFolderIcon />
        </IconButton>
      </PageTitle>

      <Dialog open={newFolderDialogOpen} fullWidth maxWidth="sm">
        <DialogTitle>Crear nueva carpeta</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre de la carpeta"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value as string)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewFolderDialog}>Cancelar</Button>
          <Button
            onClick={createFolder}
            color="primary"
            variant="contained"
            disableElevation
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress variant="indeterminate" />}

      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={classes.mediaContainer}
      >
        <div>
          <Grid container>{renderDirectories()}</Grid>
        </div>
        <div className={classes.assetsContainer}>
          <Grid container>{renderAssets()}</Grid>
        </div>

        <div
          className={clsx(classes.dragOverlay, {
            [classes.dragOverlayVisible]: dragging,
          })}
        >
          <div className={classes.dragOverlayContent}>
            <div>drop here :)</div>
          </div>
        </div>
      </div>
    </>
  );
}
