import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

type BookDetails = {
  title: string;
  isbn13: string;
  price: number;
  image: string;
  authors: string;
  pages: number;
  year: number;
  desc: string;
};
type Res = { success: Boolean; data: BookDetails };

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  providers: [BookService, CartService],
})
export class BookComponent {
  book!: BookDetails;
  isbn13!: string;
  currentUrl!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url.split('/')[1];
    this.activatedRoute.params.subscribe((val) => {
      this.isbn13 = val['isbn13'];
    });
    this.getBook();
  }
  getBook() {
    this.bookService.getBook(this.isbn13).subscribe({
      next: (res: Res) => {
        this.book = res.data;
      },
    });
  }

  addBook(isbn13: string) {
    this.cartService.addBook({ isbn13 }).subscribe({
      next: (res) => {
        alert(res.message);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
