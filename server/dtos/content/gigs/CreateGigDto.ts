export class CreateGigDto {
  City: string;
  Club: string;
  Address: string;
  Country: string;
  When: Date;
  Link: string;
  TicketsLink?: string;
  Start: string;

  constructor(
    city: string,
    club: string,
    address: string,
    country: string,
    when: Date,
    link: string,
    start: string,
    ticketsLink?: string
  ) {
    this.City = city;
    this.Club = club;
    this.Address = address;
    this.Country = country;
    this.When = when;
    this.Link = link;
    this.TicketsLink = ticketsLink;
    this.Start = start;
  }
}
