import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, of, switchMap, tap, first, NEVER } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private subject1 = new BehaviorSubject<number>(1);
    private subject2 = new BehaviorSubject<number>(2);
    private subject3 = new BehaviorSubject<number>(3);

    ngOnInit(): void {
        let obs = of(0).pipe(
            switchMap(_ => this.subject1.pipe(tap(nr => console.log("subject " + nr)))),
            switchMap(_ => this.subject2.pipe(tap(nr => console.log("subject " + nr)))),
            first(),
            switchMap(_ => this.subject3.pipe(tap(nr => console.log("subject " + nr)))),
        );

        obs.subscribe({
            next: _ => console.log('next\n-----------'),
            error: err => console.error(err, '\n-----------'),
            complete: () => console.log('complete\n-----------')
        });
    }

    public trigger1() { this.subject1.next(1); }
    public trigger2() { this.subject2.next(2); }
    public trigger3() { this.subject3.next(3); }
} 
