import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

type Book = {
  title: string;
  isbn13: string;
  price: number;
  image: string;
  url: string;
};
type Res = { success: Boolean; count: number; data: Book[] };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [BookService, CartService],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  currentUrl!: string;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res: Res) => {
        this.books = res.data;
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

  getBook(isbn13: string) {
    this.router.navigate([`/${this.router.url.split('/')[1]}/${isbn13}`]);
  }
}
