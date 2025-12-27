export class CreateArtistDto {
  CreatedAt: Date;
  Name: string;
  // index for gig
  GigId: number;

  constructor(createdAt: Date, name: string, gigId: number) {
    this.CreatedAt = createdAt;
    this.Name = name;
    this.GigId = gigId;
  }
}
