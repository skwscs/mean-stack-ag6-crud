import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['firstname', 'lastname', 'email', 'action'];
  dataSource = new BookDataSource(this.api);
  backcolor={
    'Default': '#007bff',
    'Success': '#1e7e34',
    'Danger': '#dc3545',
    'Info': '#17a2b8',
    'Warning':'#ffc107',
    'Active':'#fff'
  }

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }

  deleteBook(id) {
    this.api.deleteBook(id)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }
  getBackgroundColor(firstname){
    return this.backcolor.hasOwnProperty(firstname) ? this.backcolor[firstname]:'white';
  }
}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}
