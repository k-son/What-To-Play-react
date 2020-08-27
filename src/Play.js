import React, {Component} from 'react';
import Button from './Button';
import Display from './Display';
import { ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import { ReactComponent as IconChoice} from './icons/choice.svg';
import { ReactComponent as IconDices} from './icons/dices.svg';
import { ReactComponent as IconRefresh} from './icons/refresh.svg';
import './Play.css';
import './Button.css';

class Play extends Component {
  static defaultProps = {
    songs: [  
    'About a girl',
    'Born to be wild',
    'Creep',
    'Jolene',
    'Lake Of Fire',
    'Personal Jesus',
    'Rape Me',
    'Seven Nation Army',
    'The man who sold the world',
    'Where did you sleep last night',
    'Zombie',
    'Bad romance'
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      songs: this.props.songs,
      currentSong: ' ',
      modal: 'hidden'
    };
    this.drawSong = this.drawSong.bind(this);
    this.reloadFullSongList = this.reloadFullSongList.bind(this);
    this.putBackCurrentSong = this.putBackCurrentSong.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
  }

  drawSong() {
    const index = Math.floor(Math.random()*(this.state.songs.length));
    const drawnSong = this.state.songs[index];
    const filteredList = this.state.songs.filter(el => el !== drawnSong);
    this.setState({
      songs: filteredList,
      currentSong: drawnSong
    });
  }

  reloadFullSongList() {
    this.setState({
      songs: this.props.songs,
      currentSong: ' '
    })
  }

  putBackCurrentSong() {
    console.log(this.state.currentSong);
    this.setState({
      songs: this.state.songs.concat(this.state.currentSong),
      currentSong: ' '
    })
    //setTimeout(function() {console.log(this.state.currentSong);}, 2000);
  }

  openModal() {
    this.setState({
      modal: 'visible'
    })
  }

  closeModal() {
    this.setState({
      modal: 'hidden'
    })
  }

  chooseSong(e) {
    const chosenSong = e.target.textContent;
    const filteredList = this.state.songs.filter(el => el !== chosenSong);
    this.setState({
      songs: filteredList,
      currentSong: chosenSong,
      modal: 'hidden'
    })
  }

  render() {
    return(
      <div className="Play">
        <ul className="Play-list">
          {this.state.songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => <li key={item}>{item}</li>
          )}
        </ul>
        <Display song={this.state.currentSong} />
        {this.state.songs.length > 0 ? 
          <Button id="btn-draw" action={this.drawSong} icon={<IconDices />} description="Draw" /> : 
          <Button id="btn-reload" action={this.reloadFullSongList} icon={<IconRefresh />} description="Reload" />
        }
        {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
          <Button id="btn-arrow" action={this.putBackCurrentSong} icon={<IconBackArrow />} description="Put back" /> : 
          null }
        {this.state.songs.length > 0 && <Button id="btn-choice" action={this.openModal} icon={<IconChoice />} description="Choose" />}
        <div className={`Play-modal-${this.state.modal}`}>
          <button type="button" className="Play-modal-closeBtn" onClick={this.closeModal}></button>
          <ul className="Play-modal-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => <li key={item}><button type="button" onClick={this.chooseSong}>{item}</button></li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Play;