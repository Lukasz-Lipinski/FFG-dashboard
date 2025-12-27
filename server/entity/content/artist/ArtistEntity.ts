export class ArtistEntity {
  public Id: number;
  public CreatedAt: Date;
  public Name: string;
  // index for gig
  public GigId: number;

  constructor(Id: number, CreatedAt: Date, Name: string, GigId: number) {
    this.Id = Id;
    this.CreatedAt = CreatedAt;
    this.Name = Name;
    this.GigId = GigId;
  }
}
