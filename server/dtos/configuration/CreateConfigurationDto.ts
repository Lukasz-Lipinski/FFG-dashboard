export class CreateConfigurationDto {
  Link: string;
  Band: string;
  UserId: number;

  constructor(link: string, band: string, userId: number) {
    this.Link = link;
    this.Band = band;
    this.UserId = userId;
  }
}
