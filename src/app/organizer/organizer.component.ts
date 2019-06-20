import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: `translateX(0)`})),
      transition('void =>*', [
        style({transform:'translateX(25px)'}),
        animate(2000)
      ]),
      transition('*=>void', [
        animate(100)
      ])
    ])
    
  ]
})
export class OrganizerComponent implements OnInit {

  currentCompetitors: any;
  currentPlayer: any;
  playerCount: number = 0;


  constructor(private chatService: ChatService) { }


  ngOnInit() {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
      this.chatService.setCurrentCompetitors(this.currentCompetitors);
    }); 
    
  }

  startCompetition() {
    this.chatService.getCompetitors().subscribe(response => { 
      this.currentCompetitors = response;
    });
  }

  nextPlayer() {
    let clearArray = [];
    this.chatService.clearCurrentScores(clearArray);
    this.currentPlayer = this.currentCompetitors[this.playerCount];
    this.chatService.sendPlayer(this.currentPlayer);
    this.playerCount++;
    this.chatService.setCurrentPlayer(this.currentPlayer, this.playerCount);
    
  }

  

}
