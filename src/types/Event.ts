type Event = {
  id?: number;
  identifier: string;
  name: string;
  subtitle?: string;
  description?: string;
  startDate: Date | null;
  endDate: Date | null;
  organizer?: string,
  coverPath?: string,
  shortCoverPath?: string,
  location?: string,
  statusId: number,
  categoryId: number,
  tagsId?: []
};

export default Event;
