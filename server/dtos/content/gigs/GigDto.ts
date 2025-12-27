export class GigDto {
  Id: number;
  where: {
    city: string;
    club: string;
    address: string;
    country: string;
  };
  // Is related to ArtistEntity by GigId
  who: string[];
  when: Date;
  link: string;
  start: string;
  ticketsLink?: string;

  constructor(
    id: number,
    city: string,
    club: string,
    address: string,
    country: string,
    who: string[],
    when: Date,
    link: string,
    start: string,
    ticketsLink?: string
  ) {
    this.Id = id;
    this.where = {
      city,
      club,
      address,
      country,
    };
    this.who = who;
    this.when = when;
    this.link = link;
    this.ticketsLink = ticketsLink;
    this.start = start;
  }
}
