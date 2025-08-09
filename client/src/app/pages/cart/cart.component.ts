import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

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
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService],
})
export class CartComponent implements OnInit {
  books: Book[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.cartService.getAllBooks().subscribe({
      next: (res: Res) => {
        this.books = res.data;
      },
    });
  }

  deleteBook(isbn13: string) {
    this.cartService.deleteBook({ isbn13 }).subscribe({
      next: (res) => {
        alert(res.message);
        this.getBooks();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
