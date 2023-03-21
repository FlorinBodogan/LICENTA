import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    home = {
      h1text: "Un corp sănătos are o greutate normală",
      ptext: "Află mai multe despre aceasta aplicație!",
      btntext: "Despre"
    }
}
