import React, {Component} from 'react';
import Button from './Button';
import Display from './Display';
import Logo from './Logo';
import { ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import { ReactComponent as IconChoice} from './icons/one.svg';
import { ReactComponent as IconDices} from './icons/dices.svg';
import { ReactComponent as IconRefresh} from './icons/refresh.svg';
import './Play.css';

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
    'Bad romance',
    'Love Buzz',
    'Like a virgin'
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
    this.setState({
      songs: this.state.songs.concat(this.state.currentSong),
      currentSong: ' '
    })
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
        <Logo />
        <ul className="Play-list">
          {this.state.songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => <li key={item}><span className="Play-dot">&bull;</span>{item}</li>
          )}
        </ul>
        <Display song={this.state.currentSong} />
        <div className="Play-buttons">
        {this.state.songs.length > 0 ? 
          <Button id="btn-draw" action={this.drawSong} icon={<IconDices />} description="Draw" /> : 
          <Button id="btn-reload" action={this.reloadFullSongList} icon={<IconRefresh />} description="Reload" />
        }
        {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
          <Button id="btn-arrow" action={this.putBackCurrentSong} icon={<IconBackArrow />} description="Put back" /> : 
          null }
        {this.state.songs.length > 0 && <Button id="btn-choice" action={this.openModal} icon={<IconChoice />} description="Choose" />}
        </div>
        <div className={`Play-modal-${this.state.modal}`}>
          <button type="button" className="Play-modal-closeBtn" onClick={this.closeModal}>
            <span className="xBar xBar-1">
              <span className="circle circle-left"></span>
              <span className="circle circle-right"></span>
            </span>
            <span className="xBar xBar-2">
              <span className="circle circle-left"></span>
              <span className="circle circle-right"></span>
            </span>
          </button>
          <ul className="Play-modal-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => 
              <li key={item}>
                <button type="button" onClick={this.chooseSong}>
                  <div className="Play-circle">
                    <div></div>
                  </div>
                  <p>{item}</p>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Play;
