export class ConfigurationEntity {
  public id: number;
  public Link: string;
  public UpdateDate?: Date;
  public UserId?: number;
  public CreatedAt: Date;
  public Band: string;

  constructor(
    id: number,
    link: string,
    updateDate: Date,
    userId: number,
    createdAt: Date,
    band: string
  ) {
    this.id = id;
    this.Link = link;
    this.UpdateDate = updateDate;
    this.UserId = userId;
    this.CreatedAt = createdAt;
    this.Band = band;
  }
}
