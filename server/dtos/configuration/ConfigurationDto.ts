export class ConfigurationDto {
  public Id: number;
  public Band: string;
  public Link: string;

  constructor(band: string, link: string, id: number) {
    this.Band = band;
    this.Link = link;
    this.Id = id;
  }
}
