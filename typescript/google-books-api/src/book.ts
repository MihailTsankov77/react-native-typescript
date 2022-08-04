export class Book {
  shortDescription: string;
  shortTitle: string;

  constructor(
    public id: number,
    public title: string | undefined,
    public authors: string | undefined,
    public imageUrl: string | undefined,
    public description: string | undefined
  ) {

    this.title = this.title || "No title.";
    this.authors = this.authors || "No author.";
    this.imageUrl = this.imageUrl || "No imageUrl.";
    this.description = this.description || "No description.";

    // this.authors = this.#formatAuthors(this.authors);
    this.shortDescription = this.#shortText(this.description,400,'<span class="hide"> ...</span>');
    this.shortTitle = this.#shortText( this.title, 30, "...");
  }

//   #formatAuthors(authors: string) {
//     return authors.replace(",", ", ");
//   }

  #shortText(text: string, symbols: number, end: string) {
    let substring = text.substring(0, symbols);
    if (text.length < symbols)
      return substring == "" ? "No description." : substring;

    for (let i = substring.length - 1; i > 0; i--) {
      if (substring[i] == " ") {
        substring = substring.substring(0, i);
        break;
      }
    }

    return substring + end;
  }
}
