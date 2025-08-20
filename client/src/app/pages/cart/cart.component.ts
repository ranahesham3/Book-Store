import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

type BookDetails = {
  details: {
    title: string;
    isbn13: string;
    image: string;
    price: number;
    authors: string;
    pages: number;
    year: number;
    desc: string;
  };
  price: number;
  count: number;
};
type Res = {
  success: Boolean;
  data: BookDetails[];
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService],
})
export class CartComponent implements OnInit {
  books: BookDetails[] = [];

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

  decreseQuantity(isbn13: string, quantity: number, index: number) {
    if (quantity === 1) return;
    this.cartService.updateBook({ isbn13, quantity: quantity - 1 }).subscribe({
      next: (res) => {
        this.books[index].count -= 1;
        this.books[index].price =
          this.books[index].count * this.books[index].details.price;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  increaseQuantity(isbn13: string, quantity: number, index: number) {
    this.cartService.updateBook({ isbn13, quantity: quantity + 1 }).subscribe({
      next: (res) => {
        this.books[index].count += 1;
        this.books[index].price =
          this.books[index].count * this.books[index].details.price;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
