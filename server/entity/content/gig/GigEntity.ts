export class GigEntity {
  public Id: number;
  public City: string;
  public Club: string;
  public Address: string;
  public Country: string;
  public When: Date;
  public Link: string;
  public TicketsLink?: string;
  public Start: string;
  public CreatedAt: Date;
  public Owner: string;

  constructor(
    Id: number,
    City: string,
    Club: string,
    Address: string,
    Country: string,
    When: Date,
    Link: string,
    Start: string,
    CreatedAt: Date,
    Owner: string,
    TicketsLink?: string
  ) {
    this.Id = Id;
    this.City = City;
    this.Club = Club;
    this.Address = Address;
    this.Country = Country;
    this.When = When;
    this.Link = Link;
    this.TicketsLink = TicketsLink;
    this.Start = Start;
    this.CreatedAt = CreatedAt;
    this.Owner = Owner;
  }
}
