export type idType = string;

export class Book {
  static repoName = "books";
  shortDescription: string;
  shortTitle: string;

  constructor(
    public id: idType,
    public title: string | undefined,
    public authors: string[] |string | undefined,
    public imageUrl: string | undefined,
    public description: string | undefined,
    public checkFav = false,
    public isFav = false
  ) {

    this.title = this.title || "No title.";
    this.authors = this.authors || "No author.";
    this.imageUrl = this.imageUrl || "No imageUrl.";
    this.description = this.description || "No description.";

    if(Array.isArray(this.authors)){
      this.authors = this.#formatAuthors(this.authors);
    }

    this.shortDescription = this.#shortText(this.description,400,'<span class="hide"> ...</span>');
    this.shortTitle = this.#shortText( this.title, 30, "...");
  }

  #formatAuthors(authors: string[]): string{
    const str = authors.toString();
    return str.replace(',', ', ');
  }

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
