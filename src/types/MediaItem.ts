type MediaItem = {
  name: string;
  /**
   * Extension if the item is a file
   */
  extension: string;
  modificationTime: Date;
  /**
   * Indicate if the items is a directory
   */
  isDir: boolean;
};

export default MediaItem;
